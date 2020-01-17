import {BrowserUtility, BrowserType} from "../utilities/BrowserUtility";
import {IDisposeable} from "../Core/IDisposable";

declare var CanvasCaptureMediaStreamTrack: any;

/**
 * @summary 仮想のビデオStreamを提供します.
 */
export class VirtualVideoStreamGenerator
{
    private static _stream: MediaStream | undefined = undefined;

    public static getVirtualVideoStream(): MediaStream
    {
        if (this._stream === undefined)
        {
            const canvasElement = document.createElement("canvas") as HTMLCanvasElement;
            const imageElement = document.getElementById("novideoImage") as HTMLImageElement;
            canvasElement.width = imageElement.naturalWidth;
            canvasElement.height = imageElement.naturalHeight;
            const context = canvasElement.getContext("2d");
            const canvasStream = (canvasElement as any).captureStream(30) as MediaStream;

            if (context)
            {
                setInterval(() =>
                {
                    context.drawImage(imageElement, 0, 0, imageElement.naturalWidth, imageElement.naturalHeight);
                }, 1000);
            }
            this._stream = canvasStream;
            return canvasStream;
        }
        return this._stream!;
    }
}

/**
 * @summary WebRtcで使用するStreamのラッパーを提供します.
 */
export class RtcMediaStreamWrapper
{
    // #region private fields
    // カメラが有効かどうか
    private _isVideoEnabled: boolean = false;
    // オーディオが有効かどうか
    private _isAudioEnabled: boolean = false;
    // オーディオエフェクトを適用したStream
    protected stream: MediaStream;
    // ソースStream
    protected srcStream: MediaStream;
    // ソースのStreamのID
    private _id: string = "";
    // オーディオコンテキスト
    protected _audioContexts: AudioContext[] = [];
    // #endregion

    // #region public propoerty
    /**
     * 適用しているMediaStream
     */
    public get mediaStream(): MediaStream
    {
        return this.stream;
    }

    /**
     * ID
     */
    public get id(): string
    {
        return this._id;
    }

    /**
     * カメラが有効かどうか
     */
    public get isVideoEnabled(): boolean
    {
        return this._isVideoEnabled;
    }
    public set isVideoEnabled(isEnable: boolean)
    {
        const tracks = this.stream.getVideoTracks();
        if (tracks !== undefined)
        {
            tracks.forEach(track => (track.enabled = isEnable));
        }
        this._isVideoEnabled = isEnable;
    }

    /**
     * オーディオが有効かどうか
     */
    public get isAudioEnabled(): boolean
    {
        return this._isAudioEnabled;
    }
    public set isAudioEnabled(isEnable: boolean)
    {
        const tracks = this.stream.getAudioTracks();
        if (tracks !== undefined)
        {
            tracks.forEach(track => (track.enabled = isEnable));
        }
        this._isAudioEnabled = isEnable;
    }
    // #endregion

    // #region public methods
    /**
     * コンストラクタ
     * @param stream 適用するstream
     * @param isGenerateVirtualAudioTrack オーディオトラックが存在しない場合に仮想のオーディオトラックを挿入するかどうか
     * @param isGenerateVirtualVideoTrack ビデオトラックが存在しない場合に仮想のビデオトラック（Novideo画像）を挿入するかどうか
     */
    public constructor(stream: MediaStream, isGenerateVirtualAudioTrack = false, isGenerateVirtualVideoTrack = false)
    {
        if (!stream)
        {
            throw Error("MediaStreamが無効です。");
        }
        const [aTrack] = stream.getAudioTracks();
        const [vTrack] = stream.getVideoTracks();
        this._isAudioEnabled = aTrack ? aTrack.enabled : false;
        this._isVideoEnabled = vTrack ? vTrack.enabled : false;

        this.srcStream = stream;
        this._id = stream.id;

        if (BrowserUtility.hasFlag(BrowserType.iPad))
        {
            this.stream = this.applyEffect(stream, isGenerateVirtualAudioTrack, isGenerateVirtualVideoTrack, false);
        }
        else
        {
            this.stream = this.applyEffect(stream, isGenerateVirtualAudioTrack, isGenerateVirtualVideoTrack, true);
        }
    }
    // #endregion

    // #region private methods
    /**
     * @summary StreamをWebRtcへ送信する前の前処理を適用します.
     * @param stream 適用するStream
     * @return 結果のStream
     */
    private applyEffect(
        stream: MediaStream,
        isGenerateVirtualAudioTrack: boolean,
        isGenerateVirtualVideoTrack: boolean,
        isApplyAudioEffect: boolean = true): MediaStream
    {
        const _AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
        const audioContext = new _AudioContext() as AudioContext;
        this._audioContexts.push(audioContext);

        if (!stream.active)
        {
            const tracks: MediaStreamTrack[] = [];
            if (isGenerateVirtualAudioTrack)
            {
                // 仮想のオーディオトラックを作成
                const virtualAudioStream = audioContext.createMediaStreamDestination();
                const [aTrack] = virtualAudioStream.stream.getAudioTracks();
                tracks.push(aTrack);
            }
            if (isGenerateVirtualVideoTrack)
            {
                const virtualStream = VirtualVideoStreamGenerator.getVirtualVideoStream();
                const [vTrack] = virtualStream.getVideoTracks();
                tracks.push(vTrack);
            }
            return new MediaStream(tracks);
        }

        if (!this._isAudioEnabled)
        {
            // video:off audio:off
            if (!this._isVideoEnabled)
            {
                // 仮想のオーディオトラックを作成
                const tracks: MediaStreamTrack[] = [];
                if (isGenerateVirtualAudioTrack)
                {
                    const virtualAudioStream = audioContext.createMediaStreamDestination();
                    const [aTrack] = virtualAudioStream.stream.getAudioTracks();
                    tracks.push(aTrack);
                }
                if (isGenerateVirtualVideoTrack)
                {
                    const virtualStream = VirtualVideoStreamGenerator.getVirtualVideoStream();
                    const [vTrack] = virtualStream.getVideoTracks();
                    tracks.push(vTrack);
                }

                return new MediaStream(tracks);
            }
            // video :on audio:off
            else
            {
                const [vTrack] = stream.getVideoTracks();
                const tracks: MediaStreamTrack[] = [];
                if (isGenerateVirtualAudioTrack)
                {
                    // 仮想のオーディオトラックを作成
                    const virtualAudioStream = audioContext.createMediaStreamDestination();
                    const [aTrack] = virtualAudioStream.stream.getAudioTracks();
                    tracks.push(aTrack);
                }
                tracks.push(vTrack);

                return new MediaStream(tracks);
            }
        }
        else
        {
            // video:off audio:on
            if (!this._isVideoEnabled)
            {
                const tracks: MediaStreamTrack[] = [];

                if (isApplyAudioEffect)
                {
                    const aTrack = this.applyAudioFilter(stream);
                    tracks.push(aTrack);
                }
                else
                {
                    const [aTrack] = stream.getAudioTracks();
                    tracks.push(aTrack);
                }

                if (isGenerateVirtualVideoTrack)
                {
                    const virtualStream = VirtualVideoStreamGenerator.getVirtualVideoStream();
                    const [vTrack] = virtualStream.getVideoTracks();
                    tracks.push(vTrack);
                }
                return new MediaStream(tracks);
            }
            // video:on audio:on
            else
            {
                const tracks: MediaStreamTrack[] = [];
                if (isApplyAudioEffect)
                {
                    const aTrack = this.applyAudioFilter(stream);
                    tracks.push(aTrack);
                }
                else
                {
                    const [aTrack] = stream.getAudioTracks();
                    tracks.push(aTrack);
                }

                const [vTrack] = stream.getVideoTracks();
                tracks.push(vTrack);
                return new MediaStream(tracks);
            }
        }
    }

    /**
     * Streamにノイズキャンセルフィルタを適用させます．
     * @param stream 適用させるStream
     * @returns 結果のStream
     */
    private applyAudioFilter(stream: MediaStream): MediaStreamTrack
    {
        const _AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
        const audioContext = new _AudioContext() as AudioContext;
        this._audioContexts.push(audioContext);

        const biquadFilter = audioContext.createBiquadFilter();
        biquadFilter.type = "lowpass";
        biquadFilter.frequency.value = 8192;

        const biquadFilter2 = audioContext.createBiquadFilter();
        biquadFilter2.type = "highpass";
        biquadFilter2.frequency.value = 50;

        const mediaStreamSource = audioContext.createMediaStreamSource(stream);
        const dstStreamNode = audioContext.createMediaStreamDestination();

        mediaStreamSource.connect(biquadFilter);
        biquadFilter.connect(biquadFilter2);
        biquadFilter2.connect(dstStreamNode);
        const [aTrack] = dstStreamNode.stream.getAudioTracks();
        return aTrack;
    }
    // #endregion
}

/**
 * @summary デバイスから取得したストリームを表すクラス
 */
export class DeviceMediaStreamWrapper extends RtcMediaStreamWrapper implements IDisposeable
{
    // #region private fields
    /**
     * リソースが解放済みかどうか
     */
    private _isDisposed: boolean = false;
    // #endregion

    // #region public property
    /**
     * リソースが解放済みかどうか
     */
    public get isDisposed(): boolean
    {
        return this._isDisposed;
    }
    // #endregion

    // #region public methods
    /**
     * コンストラクタ
     * @param stream 適用するStream
     */
    public constructor(stream: MediaStream, isGeberateVirtualAudioTrack = false, isGenerateVirtualVideoTrack = false)
    {
        super(stream, isGeberateVirtualAudioTrack, isGenerateVirtualVideoTrack);
    }

    /**
     * リソースの破棄
     */
    public dispose(): void
    {
        if (!this._isDisposed)
        {
            if (this.stream)
            {
                this.stream.getTracks().forEach(track =>
                {
                    // キャンバスではなかったらトラックを停止
                    if (BrowserUtility.hasFlag(BrowserType.FireFox))
                    {
                        track.stop();
                    }
                    else
                    {
                        if (!(track instanceof CanvasCaptureMediaStreamTrack))
                        {
                            track.stop();
                        }
                    }
                });
            }
            this.srcStream.getTracks().forEach(track => track.stop());
            for (let ctx of this._audioContexts)
            {
                if (ctx)
                {
                    ctx.close();
                }
            }
            this._isDisposed = true;
        }
    }
    // #endregion
}

/**
 * @summary デバイス情報
 */
export class DeviceInfo
{
    public id: string = "";
    public name: string = "";
}

/**
 * @summary デバイス情報を格納するリスト
 */
export class DeviceList
{
    audioDeviceList: DeviceInfo[] = [];
    videoDeviceList: DeviceInfo[] = [];
    outputDeviceList: DeviceInfo[] = [];
    isAllowed: boolean = false;
}

/**
 * @summary デバイスストリームを管理する静的クラス
 */
export class DeviceStreamManager
{
    // デバイスストリームのリスト
    private static deviceStreamList: DeviceMediaStreamWrapper[] = [];

    /**
     * @summary 全てのデバイスを停止しリソースを破棄
     */
    public static disposeAll(): void
    {
        const list = this.deviceStreamList;
        for (let key in list)
        {
            list[key].dispose();
            delete list[key];
        }
        this.deviceStreamList.length = 0;
    }

    /**
     * @summary 指定したデバイスストリームのリソースを破棄し管理から外す
     * @param stream 削除するストリーム
     */
    public static disposeAt(streamWrapper: DeviceMediaStreamWrapper): void
    {
        if (!streamWrapper)
        {
            return;
        }

        const list = this.deviceStreamList;
        for (let key in list)
        {
            if (list[key].id === streamWrapper.id)
            {
                list[key].dispose();
                list.splice(Number(key), 1);
            }
        }
    }

    /**
     * @summary スクリーンシェア用のデバイスストリームを取得
     */
    public static async getScreenShareStream(): Promise<DeviceMediaStreamWrapper | undefined>
    {
        try
        {
            const stream: MediaStream = await (navigator.mediaDevices as any)
                .getDisplayMedia({
                    video: {
                        width: 1280,
                        height: 720,
                        frameRate: 16
                    }
                });
            let deviceStream: DeviceMediaStreamWrapper | undefined;
            if (stream)
            {
                deviceStream = new DeviceMediaStreamWrapper(stream, false, false);
                this.deviceStreamList.push(deviceStream);
            }
            return deviceStream;
        }
        catch (ex)
        {
            logger.error(ex, ex.message);
        }
        return undefined;
    }

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
    public static async getDeviceStream(
        isVideoEnabled: boolean = true,
        isAudioEnebled: boolean = true,
        videoDeviceId?: string,
        audioDeviceId?: string,
        width: number = 1280,
        height: number = 720,
        facingMode?: string,
        quality: number = 1,
        frameRate: number = 30
    ): Promise<DeviceMediaStreamWrapper | undefined>
    {
        logger.log(`request media device audio:${isAudioEnebled} AudioDeviceid:${audioDeviceId} video:${isVideoEnabled} VideoDeviceId:${videoDeviceId} ${width * quality}*${height * quality} frame:${frameRate}`);
        const stream =
            await navigator.mediaDevices.getUserMedia({
                audio: isAudioEnebled ? {
                    deviceId: audioDeviceId ? {exact: audioDeviceId} : undefined,
                    audioGainControl: true,
                    echoCancellation: true,
                    noiseSuppression: true,
                    echoCancellationType: "system"
                } as any : false,
                video: isVideoEnabled ? {
                    deviceId: videoDeviceId ? {exact: videoDeviceId} : undefined,
                    width: width * quality,
                    height: height * quality,
                    frameRate: frameRate,
                    facingMode: facingMode ? {exact: facingMode} : undefined
                } : false
            });
        let deviceStream: DeviceMediaStreamWrapper | undefined;
        if (stream)
        {
            deviceStream = new DeviceMediaStreamWrapper(stream);
            this.deviceStreamList.push(deviceStream);
        }
        return deviceStream;
    }

    /**
     * @summary デバイスリストを取得
     * @returns デバイスリスト
     */
    public static async getDeviceList(): Promise<DeviceList>
    {
        const deviceList = new DeviceList();
        const deviceInfos = await navigator.mediaDevices.enumerateDevices();

        for (let item of deviceInfos)
        {
            if (item.kind === "audioinput")
            {
                deviceList.audioDeviceList.push({
                    id: item.deviceId,
                    name: item.label
                });
            }
            else if (item.kind === "audiooutput")
            {
                deviceList.outputDeviceList.push({
                    id: item.deviceId,
                    name: item.label
                });
            }
            else if (item.kind === "videoinput")
            {
                deviceList.videoDeviceList.push(
                    {
                        id: item.deviceId,
                        name: item.label
                    }
                );
            }
        }
        if (deviceList.audioDeviceList.length !== 0 && deviceList.videoDeviceList.length !== 0)
        {
            deviceList.isAllowed = true;
        }
        return deviceList;
    }
}
