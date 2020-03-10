/**
 * @packageDocumentation
 * @module Core
 * @preferred
 */

/**
 * @summary 様々な色空間の色を表現するクラス
 */
export class Color
{
    // #region private fields
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;
    private _a: number = 255;
    public hex: string = "#000000";
    // #endregion

    // #region gettres
    /**
    * RGBAのうちRの値（0~255）
    */
    get r(): number
    {
        return this._r;
    }

    /**
    * RGBAのうちGの値（0~255）
    */
    get g(): number
    {
        return this._g;
    }

    /**
    * RGBAのうちBの値（0~255）
    */
    get b(): number
    {
        return this._b;
    }

    /**
     * RGBAのうちAの値（0~255）
     */
    get a(): number
    {
        return this._r;
    }

    /**
     * cssの文字列
     */
    get rgba(): string
    {
        return `rgba(${this._r},${this._g},${this._b},${this.a / 255})`;
    }
    // #endregon

    // #region public methods
    // constructor(hex: string, alpha?: number)
    // constructor(hsv: number[], alpha?: number);
    // constructor(r: number, g: number, b: number);
    // constructor(r: number, g: number, b: number, a: number);
    constructor(r: any, g?: number, b?: number, a?: number)
    {
        if (r instanceof Array)
        {

        }
        else if (typeof (r) === "string")
        {
            if (r.length !== 7)
            {
                throw new Error("不正なカラーコードです。");
            }
            this._r = parseInt(r.slice(1, 3), 16) & 255;
            this._g = parseInt(r.slice(3, 5), 16) & 255;
            this._b = parseInt(r.slice(5, 7), 16) & 255;
            this._a = g || 255;
        }
        else if (g && b)
        {
            this._r = r;
            this._g = g;
            this._b = b;
            this._a = a || 255;
        }
        this.hex = this.toHexString();
    }

    /**
     * 16進数文字列へ変換
     */
    public toHexString()
    {
        return `#${this._r.toString(16)}${this._g.toString(16)}${this._b.toString(16)}`;
    }
    // #endregion
}
