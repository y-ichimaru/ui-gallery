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
    readonly r: number;
    /**
    * RGBAのうちGの値（0~255）
    */
    readonly g: number;
    /**
    * RGBAのうちBの値（0~255）
    */
    readonly b: number;
    /**
     * RGBAのうちAの値（0~255）
     */
    readonly a: number;
    /**
     * cssの文字列
     */
    readonly rgba: string;
    constructor(r: any, g?: number, b?: number, a?: number);
    /**
     * 16進数文字列へ変換
     */
    toHexString(): string;
}
