import { MultiCastDelegate } from "../Core/Delegate";
import { DateTime } from "luxon";
/**
 * @summary WebSocketにより送信するデータを表します。
 */
export declare class WebSocketData<T> {
    content?: T;
    type?: number | string;
    date?: DateTime;
    constructor(init?: Partial<WebSocketData<any>>);
}
/**
 * @summary WebSocketによるデータの転送を提供するシングルトンオブジェクトです。
 */
export declare class WebSocketProvider {
    /**
     * @summary データを受け取ったとき
     */
    _onDataRecieved: MultiCastDelegate<(data: WebSocketData<any>) => void>;
    /**
     * WebSocketの接続
     */
    private connection?;
    /**
     * @summary 接続中かどうか
     */
    private _isConnecting;
    /**
     * @summary 接続中かどうか
     */
    readonly isConnecting: boolean;
    /**
     * @summary データを受信したとき.
     */
    readonly onDataRecieved: MultiCastDelegate<(data: WebSocketData<any>) => void>;
    /**
     * @summary WebSoket Serverに接続します。
     */
    connect(url: string): Promise<void>;
    /**
     * @summary WebSoket Serverへの接続を切断します。
     */
    disconnect(): Promise<void>;
    /**
     * @summary データを送信します
     * @param data 送信するデータ
     */
    send(data: WebSocketData<any>): void;
}