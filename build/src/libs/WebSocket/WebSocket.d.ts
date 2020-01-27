import { MultiCastDelegate } from "@/libs/Core/Delegate";
/**
 * @summary WebSocketにより送信するデータを表します。
 */
declare class WebSocketData {
    content?: object;
    type?: WebSocketMessageType;
    date?: Date;
    constructor(init?: Partial<WebSocketData>);
}
/**
 * @summary WebSocketによるデータの転送を提供するシングルトンオブジェクトです。
 */
export declare class WebSocketProvider {
    /**
     * @summary データを受け取ったとき
     */
    static _onDataRecieved: MultiCastDelegate<(data: any) => void>;
    /**
     * WebSocketの接続
     */
    private static connection;
    /**
     * @summary 接続中かどうか
     */
    private static _isConnecting;
    /**
     * @summary 接続中かどうか
     */
    static readonly isConnecting: boolean;
    /**
     * @summary データを受信したとき.
     */
    static readonly onDataRecieved: MultiCastDelegate<(data: WebSocketData) => void>;
    /**
     * @summary WebSoket Serverに接続します。
     */
    static connect(): Promise<void>;
    /**
     * @summary WebSoket Serverへの接続を切断します。
     */
    static disconnect(): Promise<void>;
    /**
     * @summary データを送信します
     * @param data 送信するデータ
     */
    static send(data: any): void;
}
/**
 * @summary 各種機能ごとのメッセージのタイプ
 */
export declare enum WebSocketMessageType {
    Chat = 0,
    Profile = 1,
    ShutRoom = 2
}
/**
 * @summary 指定したタイプのメッセージの送受信を提供します。
 */
export declare class WebSocketManager {
    /**
     * 指定したタイプのメッセージを受信したとき
     */
    private _onDataRecieved;
    /**
     * @summary 送受信するメッセージのタイプ
     */
    private messageType;
    readonly onDataRecieved: MultiCastDelegate<(data: object) => void>;
    /**
     * コンストラクタ
     * @param messageType 送受信するメッセージのタイプ
     */
    constructor(messageType: WebSocketMessageType);
    /**
     * メッセージを送信します。
     * @param data 送信するデータ
     */
    send(data: object): void;
}
export {};
