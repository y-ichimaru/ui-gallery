import {MultiCastDelegate} from "@/libs/Core/Delegate";

/**
 * @summary WebSocketサーバーのURL
 */
const WEB_SOCKET_URL = "ws://user:password@localhost:443?key=test&pass=passssss";

/**
 * @summary WebSocketにより送信するデータを表します。
 */
class WebSocketData
{
    content?: object;
    type?: WebSocketMessageType;
    date?: Date;
    constructor(init?: Partial<WebSocketData>)
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
    public static _onDataRecieved: MultiCastDelegate<(data: any) => void> = new MultiCastDelegate<(data: any) => void>();

    /**
     * WebSocketの接続
     */
    private static connection: WebSocket | null;

    /**
     * @summary 接続中かどうか
     */
    private static _isConnecting: boolean = false;
    // #endregion

    // #region public getters
    /**
     * @summary 接続中かどうか
     */
    public static get isConnecting(): boolean
    {
        return this._isConnecting;
    }
    // #endregion

    // #region public methods
    /**
     * @summary データを受信したとき.
     */
    public static get onDataRecieved(): MultiCastDelegate<(data: WebSocketData) => void>
    {
        return this._onDataRecieved;
    }

    /**
     * @summary WebSoket Serverに接続します。
     */
    public static connect(): Promise<void>
    {
        const connection = this.connection = new WebSocket(WEB_SOCKET_URL);
        if (!connection) throw new Error("接続に失敗しました。");

        connection.onmessage = e =>
        {
            const data = e.data;
            logger.log(data);
            // this._onDataRecieved.invoke(JSON.parse(data));
        };
        connection.onerror = e => logger.error(e);
        this._isConnecting = true;

        setInterval(() => this.send(1), 1000);

        return new Promise(resolve =>
        {
            connection.onopen = () => resolve();
        });
    }

    /**
     * @summary WebSoket Serverへの接続を切断します。
     */
    public static disconnect(): Promise<void>
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
    public static send(data: any): void
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

/**
 * @summary 各種機能ごとのメッセージのタイプ
 */
export enum WebSocketMessageType
{
    Chat,
    Profile,
    ShutRoom,
}

/**
 * @summary 指定したタイプのメッセージの送受信を提供します。
 */
export class WebSocketManager
{
    // #region private fields
    /**
     * 指定したタイプのメッセージを受信したとき
     */
    private _onDataRecieved: MultiCastDelegate<(data: object) => void> = new MultiCastDelegate<(data: object) => void>();

    /**
     * @summary 送受信するメッセージのタイプ
     */
    private messageType: WebSocketMessageType;
    // #endregion

    // #region public getters
    public get onDataRecieved(): MultiCastDelegate<(data: object) => void>
    {
        return this._onDataRecieved;
    }
    // #endregion

    // #region public methods
    /**
     * コンストラクタ
     * @param messageType 送受信するメッセージのタイプ
     */
    public constructor(messageType: WebSocketMessageType)
    {
        this.messageType = messageType;

        // メッセージを受信した際
        WebSocketProvider.onDataRecieved.add((data: any) =>
        {
            if (!data)
            {
                console.warn("recieved invalid data in websocket");
                return;
            }

            if (data.type === messageType)
            {
                this.onDataRecieved.invoke(data);
            }
        });
    }

    /**
     * メッセージを送信します。
     * @param data 送信するデータ
     */
    public send(data: object)
    {
        WebSocketProvider.send(new WebSocketData({
            content: data,
            type: this.messageType,
            date: new Date()
        }));
    }
    // #endregion
}

// WebSocketProvider.connect();
