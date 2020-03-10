/**
 * @packageDocumentation
 * @module Core
 * @preferred
 */
/**
 * @summary 様々な色空間の色を表現するクラス
 */
export declare class Color {
    private _r;
    private _g;
    private _b;
    private _a;
    hex: string;
    /**
    * RGBAのうちRの値（0~255）
    */
    get r(): number;
    /**
    * RGBAのうちGの値（0~255）
    */
    get g(): number;
    /**
    * RGBAのうちBの値（0~255）
    */
    get b(): number;
    /**
     * RGBAのうちAの値（0~255）
     */
    get a(): number;
    /**
     * cssの文字列
     */
    get rgba(): string;
    constructor(r: any, g?: number, b?: number, a?: number);
    /**
     * 16進数文字列へ変換
     */
    toHexString(): string;
}
