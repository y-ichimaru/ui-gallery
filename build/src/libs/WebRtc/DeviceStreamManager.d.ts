import { IDisposeable } from "../Core/IDisposable";
/**
 * @summary 仮想のビデオStreamを提供します.
 */
export declare class VirtualVideoStreamGenerator {
    private static _stream;
    static getVirtualVideoStream(): MediaStream;
}
/**
 * @summary WebRtcで使用するStreamのラッパーを提供します.
 */
export declare class RtcMediaStreamWrapper {
    private _isVideoEnabled;
    private _isAudioEnabled;
    protected stream: MediaStream;
    protected srcStream: MediaStream;
    private _id;
    protected _audioContexts: AudioContext[];
    /**
     * 適用しているMediaStream
     */
    readonly mediaStream: MediaStream;
    /**
     * ID
     */
    readonly id: string;
    /**
     * カメラが有効かどうか
     */
    isVideoEnabled: boolean;
    /**
     * オーディオが有効かどうか
     */
    isAudioEnabled: boolean;
    /**
     * コンストラクタ
     * @param stream 適用するstream
     * @param isGenerateVirtualAudioTrack オーディオトラックが存在しない場合に仮想のオーディオトラックを挿入するかどうか
     * @param isGenerateVirtualVideoTrack ビデオトラックが存在しない場合に仮想のビデオトラック（Novideo画像）を挿入するかどうか
     */
    constructor(stream: MediaStream, isGenerateVirtualAudioTrack?: boolean, isGenerateVirtualVideoTrack?: boolean);
    /**
     * @summary StreamをWebRtcへ送信する前の前処理を適用します.
     * @param stream 適用するStream
     * @return 結果のStream
     */
    private applyEffect;
    /**
     * Streamにノイズキャンセルフィルタを適用させます．
     * @param stream 適用させるStream
     * @returns 結果のStream
     */
    private applyAudioFilter;
}
/**
 * @summary デバイスから取得したストリームを表すクラス
 */
export declare class DeviceMediaStreamWrapper extends RtcMediaStreamWrapper implements IDisposeable {
    /**
     * リソースが解放済みかどうか
     */
    private _isDisposed;
    /**
     * リソースが解放済みかどうか
     */
    readonly isDisposed: boolean;
    /**
     * コンストラクタ
     * @param stream 適用するStream
     */
    constructor(stream: MediaStream, isGeberateVirtualAudioTrack?: boolean, isGenerateVirtualVideoTrack?: boolean);
    /**
     * リソースの破棄
     */
    dispose(): void;
}
/**
 * @summary デバイス情報
 */
export declare class DeviceInfo {
    id: string;
    name: string;
}
/**
 * @summary デバイス情報を格納するリスト
 */
export declare class DeviceList {
    audioDeviceList: DeviceInfo[];
    videoDeviceList: DeviceInfo[];
    outputDeviceList: DeviceInfo[];
    isAllowed: boolean;
}
/**
 * @summary デバイスストリームを管理する静的クラス
 */
export declare class DeviceStreamManager {
    private static deviceStreamList;
    /**
     * @summary 全てのデバイスを停止しリソースを破棄
     */
    static disposeAll(): void;
    /**
     * @summary 指定したデバイスストリームのリソースを破棄し管理から外す
     * @param stream 削除するストリーム
     */
    static disposeAt(streamWrapper: DeviceMediaStreamWrapper): void;
    /**
     * @summary スクリーンシェア用のデバイスストリームを取得
     */
    static getScreenShareStream(): Promise<DeviceMediaStreamWrapper | undefined>;
    /**
     * @summary カメラのデバイスストリームを取得
     * @param width 横幅
     * @param height 高さ
     * @param isVideoEnabled カメラを利用するか
     * @param videoDeviceId カメラのデバイスId
     * @param isAudioEnebled マイクを使用するか
     * @param audioDeviceId マイクのデバイスId
     * @param facingMode user->フロントカメラ enviroment->バックカメラ 主にモバイルで使用
     */
    static getDeviceStream(isVideoEnabled?: boolean, isAudioEnebled?: boolean, videoDeviceId?: string, audioDeviceId?: string, width?: number, height?: number, facingMode?: string, quality?: number, frameRate?: number): Promise<DeviceMediaStreamWrapper | undefined>;
    /**
     * @summary デバイスリストを取得
     * @returns デバイスリスト
     */
    static getDeviceList(): Promise<DeviceList>;
}
