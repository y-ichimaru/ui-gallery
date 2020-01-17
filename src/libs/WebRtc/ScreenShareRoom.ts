import Peer, {PeerCredential, MeshRoom, RoomStream} from "skyway-js";

import * as CONFIG from "./WebRtcConfig";
import {MultiCastDelegate} from "../Core/Delegate";
import {RtcMediaStreamWrapper, DeviceStreamManager} from "./DeviceStreamManager";
import {IDisposeable} from "../Core/IDisposable";
import {PeerStream} from "./VideoChatRoom";

/**
 * @summary 画面共有の基底クラス
 */
class ScreenShareBase
{
    protected skywayPeer?: Peer = undefined;
    protected skywayRoom?: MeshRoom = undefined;
    protected apiKey: string = "";
    protected _localStream?: RtcMediaStreamWrapper = undefined;
    protected roomName: string = "";
    public peerId: string = "";

    /**
     * 現在の送信用ストリーム
     */
    public get localStream(): RtcMediaStreamWrapper | undefined
    {
        return this._localStream;
    }

    /**
     * @param {String} apiKey skywayのAPIキー
     * @param {String} roomName 任意のルーム名
     */
    public constructor(apiKey: string, roomName: string)
    {
        if (!apiKey || apiKey === "")
        {
            throw new Error();
        }

        this.apiKey = apiKey;
        this._localStream = undefined;
        this.roomName = roomName;
    }

    /**
     * 画面共有を終了する
     */
    public disconnect(): void
    {
        if (this.skywayRoom)
        {
            this.skywayRoom.close();
            this.skywayRoom = undefined;
        }
        if (this.skywayPeer)
        {
            this.skywayPeer.destroy();
            this.skywayPeer = undefined;
        }
        this._localStream = undefined;
    }
}

/**
 * @summary 複数での画面共有送信用の接続
 */
class ScreenShareTransmitter extends ScreenShareBase
{
    /**
     * 画面共有を開始する
     */
    public connect(stream: RtcMediaStreamWrapper): Promise<boolean>
    {
        return new Promise<boolean>(
            resolve =>
            {
                this.skywayPeer = new Peer({
                    key: this.apiKey,
                    debug: 0
                });
                // Peerへ接続したとき
                this.skywayPeer.on("open", async id =>
                {
                    try
                    {
                        this._localStream = stream;
                        this.peerId = id;

                        (stream as any).oninactive = () =>
                        {
                            this.disconnect();
                        };

                        // SkyWayルームに入室し共有画面をセット
                        this.skywayRoom = this.skywayPeer!.joinRoom(
                            `room_${this.roomName}_screenshare`,
                            {
                                mode: CONFIG.VIDEO_CHAT_PEER_MODE,
                                stream: stream.mediaStream,
                                videoCodec: CONFIG.VIDEO_CODEC
                            }
                        ) as MeshRoom;
                        this.peerId = this.skywayPeer!.id;
                        resolve(true);
                    }
                    catch (ex)
                    {
                        logger.error(ex);
                    }
                    resolve(false);
                });
            }
        );
    }
}

/**
 * @summary 画面共有の接続を表すクラス
 */
class ScreenShareServer extends ScreenShareBase implements IDisposeable
{
    isDisposed: boolean = false;

    /**
     * ストリームを受け取ったときのイベントハンドラ
     */
    public onRecieveStreamHandler: MultiCastDelegate<(stream: RoomStream) => void>
        = new MultiCastDelegate<(stream: RoomStream) => void>();

    /**
     * ストリームを離脱したときのイベントハンドラ
     */
    public onLeftStremHandler: MultiCastDelegate<(peerId: string) => void>
        = new MultiCastDelegate<(peerId: string) => void>();

    /**
     * 画面共有中のStreamをremoteStreamListに格納するためのPeerへ接続
     * @param onRecieveStream (stream) ストリームを新たに受け取ったときのコールバック
     * @param onLeave (peerId) ルームからピアが離脱したときのコールバック
     * @param isTransmit 画面を送信するかどうか
     */
    public connect(stream?: RtcMediaStreamWrapper): Promise<void>
    {
        return new Promise(resolve =>
        {
            this.skywayPeer = new Peer({
                key: this.apiKey,
                debug: 0
            });
            // Peerへ接続したとき
            this.skywayPeer.on("open", async (id: string) =>
            {
                this.peerId = id;
                if (stream)
                {
                    this._localStream = stream;
                }
                // SkyWayルームに入室し共有画面をセット
                this.skywayRoom = this.skywayPeer!.joinRoom(
                    `room_${this.roomName}_screenshare`,
                    {
                        mode: CONFIG.SCREEN_SHARE_PEER_MODE,
                        stream: stream && stream.mediaStream,
                        videoCodec: CONFIG.VIDEO_CODEC,
                        videoReceiveEnabled: !!stream
                    }
                ) as MeshRoom;
                logger.log(this.skywayRoom);
                /** 新たにストリームを受け取ったときのイベント */
                this.skywayRoom.on("stream", stream =>
                {
                    this.onRecieveStreamHandler.invoke(stream);
                });

                /** 相手の接続終了時の後処理 */
                this.skywayRoom.on("peerLeave", peerId =>
                {
                    this.onLeftStremHandler.invoke(peerId);
                });
                resolve();
            });
        });
    }

    /**
     * 画面共有を終了する
     */
    public dispose(): void
    {
        if (!this.isDisposed)
        {
            this.isDisposed = true;
            super.disconnect();
            this.onRecieveStreamHandler.dispose();
            this.onLeftStremHandler.dispose();
        }
    }
}

/**
 * @summary 画面共有の接続をルームとして管理
 */
export class ScreenShareRoom
{
    // #region private fields
    // 画面共有受信用
    private _screenShareServer?: ScreenShareServer = undefined;
    // 画面共有送信用
    private _screenShareTransmitter?: ScreenShareTransmitter = undefined;
    // apiKey
    private _apiKey: string = "";
    // ルーム名
    private _roomName: string = "";
    // 現在の画面共有の数
    private _screenShareCount: number = 0;
    // 送信が有効かどうか
    private _isTransmitStreamEnabled: boolean = false;
    // 表示用のストリームリスト
    private _displayStreamList: MediaStream[] = [];
    // 画面共有を送信中かどうか
    private _isConnecting: boolean = false;
    // 表示用のストリームが変化したときのイベント
    private _onDisplayStreamListChanged: MultiCastDelegate<(displayStreamList: []) => void>
        = new MultiCastDelegate<(displayStreamList: []) => void>();
    // #endregion

    // #region getters
    /**
     * 表示用Stream配列の状態が変化したとき
     */
    public get onDisplayStreamListChanged():
        MultiCastDelegate<(displayStreamList: []) => void>
    {
        return this._onDisplayStreamListChanged;
    }

    /**
     * APIキー
     */
    public get apiKey(): string
    {
        return this._apiKey;
    }

    /**
     * ルーム名
     */
    public get roomName(): string
    {
        return this._roomName;
    }

    /**
     * 現在の画面共有数
     */
    public get screenShareCount(): number
    {
        return this._screenShareCount;
    }

    /**
     * ストリームが有効かどうか
     */
    public get isTransmitStreamEnabled(): boolean
    {
        return this._isTransmitStreamEnabled;
    }
    public set isTransmitStreamEnabled(isEnable: boolean)
    {
        let isChange = false;
        const transmitter = this._screenShareTransmitter;
        if (transmitter && transmitter.localStream)
        {
            transmitter.localStream.isVideoEnabled = isEnable;
            this._isTransmitStreamEnabled = isEnable;
        }
        else
        {
            this._isTransmitStreamEnabled = false;
        }
    }

    /**
     * 画面共有中かどうか
     */
    public get isConnecting(): boolean
    {
        return this._isConnecting;
    }

    /**
     * Streamを持っているかどうか
     */
    public get hasStream(): boolean
    {
        if (this._screenShareTransmitter)
        {
            return !!this._screenShareTransmitter.localStream;
        }
        return false;
    }

    /**
     * Stream
     */
    public get stream(): RtcMediaStreamWrapper | undefined
    {
        if (this._screenShareServer && this._screenShareServer.localStream)
        {
            return this._screenShareServer.localStream;
        }
        return undefined;
    }

    /**
     * 表示用のストリームリスト
     */
    public get displayStreamList(): MediaStream[]
    {
        return this._displayStreamList;
    }
    // #endregion

    // #region public methods
    /**
     * コンストラクタ
     * @param apiKey APIキー
     * @param roomName ルーム名
     */
    public constructor(apiKey: string, roomName: string)
    {
        this._apiKey = apiKey;
        this._roomName = roomName;
        this._screenShareServer = new ScreenShareServer(apiKey, roomName);

        // Streamが離脱したとき
        this._screenShareServer.onLeftStremHandler.add((peerId: string | undefined) =>
        {
            // 画面から削除
            this.removeFromDisplayStreamList(peerId);
            this._onDisplayStreamListChanged.invoke(this._displayStreamList);
        });

        // Streamを受け取ったとき
        this._screenShareServer.onRecieveStreamHandler.add((stream: PeerStream) =>
        {
            if (this._screenShareTransmitter && stream.peerId === this._screenShareTransmitter.peerId)
            {
                return;
            }
            this._displayStreamList.push(stream);
            this._onDisplayStreamListChanged.invoke(this._displayStreamList);
        });
    }

    /**
     * 接続開始
     */
    public async connect(): Promise<void>
    {
        if (this._isConnecting)
        {
            throw Error("すでに接続中です。");
        }

        if (this._screenShareServer)
        {
            try
            {
                await this._screenShareServer.connect();
                logger.log("connect screen share");
                this._isConnecting = true;
            }
            catch (ex)
            {
                logger.error(ex);
            }
        }
    }

    public async beginScreenShare(stream: RtcMediaStreamWrapper): Promise<boolean>
    {
        const isSuccess = await this.addScreenShare(stream);
        if (!isSuccess) return false;
        this._isTransmitStreamEnabled = true;
        this._displayStreamList.push(stream.mediaStream);
        this._onDisplayStreamListChanged.invoke(this._displayStreamList);
        return true;
    }

    public endScreenShare()
    {
        if (this._screenShareTransmitter)
        {
            this._screenShareTransmitter.disconnect();
        }
        this.removeFromDisplayStreamList("");
        this._onDisplayStreamListChanged.invoke(this._displayStreamList);
        this._isTransmitStreamEnabled = false;
    }

    /**
     * 画面共有を開始
     * @returns 可能画面共有数が上限に達していたため失敗したかどうか
     */
    public async addScreenShare(streamWrapper: RtcMediaStreamWrapper): Promise<boolean>
    {
        // 画面共有開始
        if (this._screenShareCount < CONFIG.MAX_SCREEN_SHARE_COUNT)
        {
            const transmitter = new ScreenShareTransmitter(this.apiKey, this._roomName);
            const isSuccess = await transmitter.connect(streamWrapper);
            if (!isSuccess) return false;
            this._screenShareTransmitter = transmitter;
            (streamWrapper.mediaStream as any).oninactive = () =>
            {
                transmitter.disconnect();
                this._isTransmitStreamEnabled = false;
                this.removeFromDisplayStreamList("");
                this._onDisplayStreamListChanged.invoke(this._displayStreamList);
            };
            return true;
        }
        // 可能画面共有数が上限に達していた
        return false;
    }

    /**
     * 全ての画面共有を終了する
     */
    public dispose(): void
    {
        const transmitter = this._screenShareTransmitter;
        if (transmitter)
        {
            transmitter.disconnect();
        }
        this._screenShareTransmitter = undefined;

        if (this._screenShareServer !== undefined)
        {
            this._screenShareServer.dispose();
        }

        this._displayStreamList = [];
        this._isConnecting = false;
        this._isTransmitStreamEnabled = false;
        this.onDisplayStreamListChanged.dispose();
    }
    // #endregion

    // #region private methods
    /**
     * 表示用ストリームリストからストリームを削除
     * @param peerId 削除するストリームのPeerId
     */
    private removeFromDisplayStreamList(peerId?: string)
    {
        const streamList = this._displayStreamList;
        for (let key in streamList)
        {
            logger.log([peerId, streamList[key]]);
            if (peerId === ((streamList[key] as any).peerId ? (streamList[key] as any).peerId : ""))
            {
                this._displayStreamList.splice(Number(key), 1);
                return;
            }
        }
    }
    // #endregion
}
