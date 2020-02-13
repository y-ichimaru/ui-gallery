import { MultiCastDelegate } from "../Core/Delegate";
import { RtcMediaStreamWrapper } from "./DeviceStreamManager";
export declare class PeerStream extends MediaStream {
    peerId: string;
}
/**
 * @summary ビデオチャットの接続を提供します.
 */
export declare class VideoChatConnection {
    private _memberCount;
    private _peerId;
    private _nickName;
    private _apiKey;
    private _skywayPeer?;
    private _skywayRoom?;
    private _bufferStream?;
    private _displayStreamList;
    private _isConnecting;
    private _onDisplayStreamListChanged;
    private _roomKey;
    private metadata;
    /**
     * @summary 表示用Stream配列の状態が変化したとき
     */
    readonly onDisplayStreamListChanged: MultiCastDelegate<(displayStreamList: any) => void>;
    /**
     * @summary APIキー
     */
    readonly apiKey: string;
    /**
     * @summary Peer Id
     */
    readonly peerId: string;
    /**
     * @summary ニックネーム
     */
    readonly nickName: string;
    /**
     * @summary 表示用ストリームのリスト
     */
    readonly displayStreamList: PeerStream[];
    /**
     * @summary 現在参加しているメンバー数
     */
    readonly memberCount: number;
    /**
     * @summary 接続中かどうか
     */
    readonly isConnecting: boolean;
    /**
     * @summary streamが存在するかどうか
     */
    readonly hasStream: boolean;
    /**
     * @summary Stream
     */
    readonly streamWrapper: RtcMediaStreamWrapper | undefined;
    /**
     * @summary ルームのキー
     */
    readonly roomKey: string;
    /**
     * @summary コンストラクタ
     * @param apiKey APIキー
     * @param key ルームに接続するための一意のキー
     */
    constructor(apiKey: string, key: string);
    /**
     * @summary ルームへ接続
     * @param stream 送信するストリーム
     * @param nickName ニックネーム
     */
    connect(stream: RtcMediaStreamWrapper | undefined, nickName: string): Promise<void>;
    /**
     * @summary ルームのストリームを置換します.
     * @param stream 置換するストリーム
     */
    setPeerStream(streamWrapper: RtcMediaStreamWrapper): void;
    /**
     * @summary リロードします. ニックネームを変更する際は指定してください.
     * @param nickName ニックネーム
     */
    reload(nickName?: string): Promise<void>;
    /**
     *  @summary 通信を終了します.
     */
    disconnect(): Promise<void>;
    /**
     * @summary SkyWayルームへ入室します.
     * @returns {SFURoom|MeshRoom}
     */
    private joinRoom;
    /**
     * @summary リモートストリームから離脱したPeerを削除
     * @param peerId 削除するPeerID
     */
    private removeFromDisplayStreamList;
}
