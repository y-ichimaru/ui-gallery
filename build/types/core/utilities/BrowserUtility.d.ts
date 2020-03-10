/**
 * @packageDocumentation
 * @module Core
 * @preferred
 */
/**
 * @summary ブラウザの種別
 */
export declare enum BrowserType {
    None = 0,
    Chrome = 1,
    InternetExplorer = 2,
    Edge = 4,
    Safari = 8,
    FireFox = 16,
    Opera = 32,
    Windows = 64,
    Android = 128,
    ios = 256,
    macOS = 512,
    iPad = 1024,
    Mobile = 384,
    Desktop = 576
}
/**
 * @summary ブラウザ情報全般を提供するシングルトンオブジェクトです.
 */
export declare class BrowserUtility {
    private static type?;
    /**
     * ブラウザの種別を取得します
     */
    static getBrowserType(): BrowserType;
    /**
     * 指定したブラウザタイプのビットフラグが立っているかを検証します.
     * @param type
     */
    static hasFlag(type: BrowserType): boolean;
    /**
     * エージェントをTypeに適応します.
     */
    private static applyType;
}
