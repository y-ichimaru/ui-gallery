import {MultiCastDelegate} from "../Core/Delegate";
import {DateTime} from "luxon";

/**
 * @summary WebSocketにより送信するデータを表します。
 */
export class WebSocketData<T>
{
    content?: T;
    type?: number | string;
    date?: DateTime;
    constructor(init?: Partial<WebSocketData<any>>)
    {
        Object.assign(this, init);
    }
}

/**
 * @summary WebSocketによるデータの転送を提供するシングルトンオブジェクトです。
 */
export class WebSocketProvider
{
    // #regin private fields
    /**
     * @summary データを受け取ったとき
     */
    public _onDataRecieved: MultiCastDelegate<(data: WebSocketData<any>) => void> = new MultiCastDelegate<(data: WebSocketData<any>) => void>();

    /**
     * WebSocketの接続
     */
    private connection?: WebSocket = undefined;

    /**
     * @summary 接続中かどうか
     */
    private _isConnecting: boolean = false;
    // #endregion

    // #region public getters
    /**
     * @summary 接続中かどうか
     */
    public get isConnecting(): boolean
    {
        return this._isConnecting;
    }
    // #endregion

    // #region public methods
    /**
     * @summary データを受信したとき.
     */
    public get onDataRecieved(): MultiCastDelegate<(data: WebSocketData<any>) => void>
    {
        return this._onDataRecieved;
    }

    /**
     * @summary WebSoket Serverに接続します。
     */
    public connect(url: string): Promise<void>
    {
        const connection = this.connection = new WebSocket(url);
        if (!connection) throw new Error("接続に失敗しました。");

        connection.onmessage = e =>
        {
            const data = e.data;
        };
        connection.onerror = (e) => logger.error(e);
        this._isConnecting = true;

        return new Promise(resolve =>
        {
            connection.onopen = () => resolve();
        });
    }

    /**
     * @summary WebSoket Serverへの接続を切断します。
     */
    public disconnect(): Promise<void>
    {
        return new Promise(resolve =>
        {
            if (!this.connection || !this._isConnecting) throw new Error("未接続です。");

            this._onDataRecieved.dispose();
            this.connection.onclose = e => resolve();
            this.connection.close();
        });
    }

    /**
     * @summary データを送信します
     * @param data 送信するデータ
     */
    public send(data: WebSocketData<any>): void
    {
        const dataStr = typeof (data) === "string" ? data : JSON.stringify(data);
        if (!this.connection)
        {
            throw new Error("未接続です。");
        }
        this.connection.send(dataStr);
    }
    // #endregion

    // #region private methods
    // endregion
}
