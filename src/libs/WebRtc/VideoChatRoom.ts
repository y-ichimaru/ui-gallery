import Peer, { PeerCredential, SfuRoom, MeshRoom } from "skyway-js";

import * as CONFIG from "./WebRtcConfig";
import { MultiCastDelegate } from "../Core/Delegate";
import { RtcMediaStreamWrapper } from "./DeviceStreamManager";
import StringToHexEncoderUtility from "../utilities/StringToHexEncoderUtility";

export class PeerStream extends MediaStream
{
    peerId: string = "";
}

(window as any).AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;

/**
 * @summary ビデオチャットの接続を提供します.
 */
export class VideoChatConnection
{
    // #region private field
    // メンバー数
    private _memberCount: number = 0;
    // Peer Id
    private _peerId: string = "";
    // ニックネーム
    private _nickName: string = "";
    // apiKey
    private _apiKey: string = "";
    // Skyway Peer
    private _skywayPeer?: Peer = undefined;
    // Skyway Room
    private _skywayRoom?: SfuRoom = undefined;
    // バッファストリーム
    private _bufferStream?: RtcMediaStreamWrapper = undefined;
    // 表示用のストリームリスト
    private _displayStreamList: PeerStream[] = [];
    // 画面共有を送信中かどうか
    private _isConnecting: boolean = false;
    // 表示用のストリームが変化したときのイベント
    private _onDisplayStreamListChanged: MultiCastDelegate<(displayStreamList: any) => void>
        = new MultiCastDelegate<(displayStreamList: any) => void>();
    // 誰かが入室した際の音
    // private enterRoomSound: HTMLAudioElement;
    // 誰かが退室した際の音
    // private leaveRoomSound: HTMLAudioElement;
    // ルームのキー
    private _roomKey: string = "";
    private metadata = {
        message: "aaaaaaaa",
        isAudioEnabled: false
    }
    // #endregion

    // #region getters
    /**
     * @summary 表示用Stream配列の状態が変化したとき
     */
    public get onDisplayStreamListChanged():
        MultiCastDelegate<(displayStreamList: any) => void>
    {
        return this._onDisplayStreamListChanged;
    }

    /**
     * @summary APIキー
     */
    public get apiKey(): string
    {
        return this._apiKey;
    }

    /**
     * @summary Peer Id
     */
    public get peerId(): string
    {
        return this._peerId;
    }

    /**
     * @summary ニックネーム
     */
    public get nickName(): string
    {
        return this._nickName;
    }

    /**
     * @summary 表示用ストリームのリスト
     */
    public get displayStreamList(): PeerStream[]
    {
        return this._displayStreamList;
    }

    /**
     * @summary 現在参加しているメンバー数
     */
    public get memberCount(): number
    {
        return this._memberCount;
    }

    /**
     * @summary 接続中かどうか
     */
    public get isConnecting(): boolean
    {
        return this._isConnecting;
    }

    /**
     * @summary streamが存在するかどうか
     */
    public get hasStream(): boolean
    {
        if (this._bufferStream)
        {
            return true;
        }
        return false;
    }

    /**
     * @summary Stream
     */
    public get streamWrapper(): RtcMediaStreamWrapper | undefined
    {
        return this._bufferStream;
    }

    /**
     * @summary ルームのキー
     */
    public get roomKey(): string
    {
        return this._roomKey;
    }
    // #endregion

    // #region public methods
    /**
     * @summary コンストラクタ
     * @param apiKey APIキー
     * @param key ルームに接続するための一意のキー
     */
    public constructor(apiKey: string, key: string)
    {
        this._apiKey = apiKey;
        this._roomKey = key;
        // this.enterRoomSound = document.getElementById("enterRoomSound") as HTMLAudioElement;
        // this.leaveRoomSound = document.getElementById("leaveRoomSound") as HTMLAudioElement;
    }

    /**
     * @summary ルームへ接続
     * @param stream 送信するストリーム
     * @param nickName ニックネーム
     */
    public connect(stream: RtcMediaStreamWrapper | undefined, nickName: string): Promise<void>
    {
        if (this._isConnecting)
        {
            throw Error("既に接続中です。");
        }

        return new Promise((resolve, reject) =>
        {
            this._isConnecting = true;
            this._bufferStream = stream;
            this._nickName = nickName;

            const id = StringToHexEncoderUtility.generatePeerId(nickName);
            this._peerId = id;
            const peer = this._skywayPeer = new Peer(id, {
                key: this.apiKey,
                debug: 0,
                turn: true,
                config: {
                    iceTransportPolicy: "relay"
                }
            });
            // Peerへ接続したとき
            peer.on("open", () =>
            {
                // ルームへ入室
                this._skywayRoom = this.joinRoom();
                resolve();
            });

            // Peerへの接続失敗時
            peer.on("error", err =>
            {
                logger.error(["Skyway connection error.", err]);
                reject(new Error("接続に失敗しました"));
            });
        });
    }

    /**
     * @summary ルームのストリームを置換します.
     * @param stream 置換するストリーム
     */
    public setPeerStream(streamWrapper: RtcMediaStreamWrapper): void
    {
        this._bufferStream = streamWrapper;
        if (this._skywayRoom !== undefined)
        {
            this._skywayRoom.replaceStream(streamWrapper.mediaStream);
        }
    }

    /**
     * @summary リロードします. ニックネームを変更する際は指定してください.
     * @param nickName ニックネーム
     */
    public async reload(nickName?: string): Promise<void>
    {
        if (this._isConnecting)
        {
            logger.log("disconnect");
            await this.disconnect();
            this.connect(this._bufferStream, nickName === undefined ? this._nickName : nickName);
        }
    }

    /**
     *  @summary 通信を終了します.
     */
    public disconnect(): Promise<void>
    {
        return new Promise(resolve =>
        {
            const room = this._skywayRoom;
            if (room !== undefined)
            {
                room.close();
                this._skywayRoom = undefined;
            }
            this._isConnecting = false;
            for (let item of this._displayStreamList)
            {
                item.getAudioTracks().forEach(x => x.stop());
                item.getVideoTracks().forEach(x => x.stop());
            }
            this._displayStreamList = [];
            this._onDisplayStreamListChanged.invoke(this._displayStreamList);

            const peer = this._skywayPeer;
            if (peer !== undefined)
            {
                peer.destroy();
                this._skywayPeer = undefined;
                resolve();
            }
        });
    }
    // #endregion

    // #region private methods
    /**
     * @summary SkyWayルームへ入室します.
     * @returns {SFURoom|MeshRoom}
     */
    private joinRoom(): SfuRoom | undefined
    {
        if (this._skywayPeer === undefined)
        {
            return undefined;
        }
        logger.log(`WebRTC通信モード：${CONFIG.VIDEO_CHAT_PEER_MODE}`);

        let room = this._skywayPeer.joinRoom(
            "room_" + this._roomKey,
            {
                mode: CONFIG.VIDEO_CHAT_PEER_MODE,
                stream: this._bufferStream ? this._bufferStream.mediaStream : undefined,
                videoCodec: CONFIG.VIDEO_CODEC
            }
        ) as SfuRoom;

        // let isEnterPlaying = false;
        // this.enterRoomSound.onended = () => (isEnterPlaying = false);
        // 新たにストリームを受け取ったときのイベント
        room.on("stream", (stream: PeerStream) =>
        {
            if (!stream || !stream.active)
            {
                return;
            }
            this._displayStreamList.push(stream);
            this._onDisplayStreamListChanged.invoke(this._displayStreamList);
            this._memberCount++;
            // if (!isEnterPlaying)
            // {
            //     this.enterRoomSound.play();
            // }
        });

        // let isLeavePlaying = false;
        // this.leaveRoomSound.onended = () => (isLeavePlaying = false);
        // 相手の接続終了時の後処理
        room.on("peerLeave", peerId =>
        {
            this._memberCount--;
            this.removeFromDisplayStreamList(peerId);
            // if (!isLeavePlaying)
            // {
            //     this.leaveRoomSound.play();
            // }
        });

        return room;
    }

    /**
     * @summary リモートストリームから離脱したPeerを削除
     * @param peerId 削除するPeerID
     */
    private removeFromDisplayStreamList(peerId: string): void
    {
        const streams = this._displayStreamList;
        for (let key in streams)
        {
            /** 離脱したPeerIdのストリームを削除 */
            if (streams[key].peerId === peerId)
            {
                streams.splice(Number(key), 1);
            }
        }
        this._onDisplayStreamListChanged.invoke(this._displayStreamList);
    }
    // #endregion
}
