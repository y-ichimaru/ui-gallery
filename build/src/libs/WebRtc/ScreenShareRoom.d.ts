import { MultiCastDelegate } from "../Core/Delegate";
import { RtcMediaStreamWrapper } from "./DeviceStreamManager";
/**
 * @summary 画面共有の接続をルームとして管理
 */
export declare class ScreenShareRoom {
    private _screenShareServer?;
    private _screenShareTransmitter?;
    private _apiKey;
    private _roomName;
    private _screenShareCount;
    private _isTransmitStreamEnabled;
    private _displayStreamList;
    private _isConnecting;
    private _onDisplayStreamListChanged;
    /**
     * 表示用Stream配列の状態が変化したとき
     */
    get onDisplayStreamListChanged(): MultiCastDelegate<(displayStreamList: []) => void>;
    /**
     * APIキー
     */
    get apiKey(): string;
    /**
     * ルーム名
     */
    get roomName(): string;
    /**
     * 現在の画面共有数
     */
    get screenShareCount(): number;
    /**
     * ストリームが有効かどうか
     */
    get isTransmitStreamEnabled(): boolean;
    set isTransmitStreamEnabled(isEnable: boolean);
    /**
     * 画面共有中かどうか
     */
    get isConnecting(): boolean;
    /**
     * Streamを持っているかどうか
     */
    get hasStream(): boolean;
    /**
     * Stream
     */
    get stream(): RtcMediaStreamWrapper | undefined;
    /**
     * 表示用のストリームリスト
     */
    get displayStreamList(): MediaStream[];
    /**
     * コンストラクタ
     * @param apiKey APIキー
     * @param roomName ルーム名
     */
    constructor(apiKey: string, roomName: string);
    /**
     * 接続開始
     */
    connect(): Promise<void>;
    beginScreenShare(stream: RtcMediaStreamWrapper): Promise<boolean>;
    endScreenShare(): void;
    /**
     * 画面共有を開始
     * @returns 可能画面共有数が上限に達していたため失敗したかどうか
     */
    addScreenShare(streamWrapper: RtcMediaStreamWrapper): Promise<boolean>;
    /**
     * 全ての画面共有を終了する
     */
    dispose(): void;
    /**
     * 表示用ストリームリストからストリームを削除
     * @param peerId 削除するストリームのPeerId
     */
    private removeFromDisplayStreamList;
}
