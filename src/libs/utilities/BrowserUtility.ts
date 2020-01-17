/**
 * @summary ブラウザの種別
 */
export enum BrowserType
{
    None = 0,

    // ブラウザ
    Chrome = 1 << 0,
    InternetExplorer = 1 << 1,
    Edge = 1 << 2,
    Safari = 1 << 3,
    FireFox = 1 << 4,
    Opera = 1 << 5,

    // OS
    Windows = 1 << 6,
    Android = 1 << 7,
    ios = 1 << 8,
    macOS = 1 << 9,
    iPad = 1 << 10,

    Mobile = Android | ios,
    Desktop = Windows | macOS
}

/**
 * @summary ブラウザ情報全般を提供するシングルトンオブジェクトです.
 */
export class BrowserUtility
{
    private static type?: BrowserType = undefined;

    /**
     * ブラウザの種別を取得します
     */
    public static getBrowserType(): BrowserType
    {
        // 初回のみ計算する
        if (this.type === undefined)
        {
            this.applyType();
        }
        return this.type!;
    }

    /**
     * 指定したブラウザタイプのビットフラグが立っているかを検証します.
     * @param type
     */
    public static hasFlag(type: BrowserType): boolean
    {
        // 初回のみ計算する
        if (this.type === undefined)
        {
            this.applyType();
        }
        return this.type ? (this.type & type) !== 0 : false;
    }

    /**
     * エージェントをTypeに適応します.
     */
    private static applyType(): void
    {
        let browserType = BrowserType.None;
        const agent = navigator.userAgent;
        // ブラウザ判定
        if (agent.indexOf("Edge") > 0)
        {
            browserType = browserType | BrowserType.Edge;
        }
        else if (agent.indexOf("Firefox") > 0)
        {
            browserType = browserType | BrowserType.FireFox;
        }
        else if (agent.indexOf("Chrome") > 0)
        {
            browserType = browserType | BrowserType.Chrome;
        }
        else if (agent.indexOf("Safari") > 0)
        {
            browserType = browserType | BrowserType.Safari;
            if (typeof document.ontouchstart !== "undefined")
            {
                browserType = browserType | BrowserType.ios;
            }
        }

        // iosでChrome
        if (navigator.userAgent.match(/crios/i))
        {
            browserType = browserType | BrowserType.Chrome;
            browserType = browserType & ~BrowserType.Safari;
        }

        if (agent.indexOf("iPhone") > 0)
        {
            browserType = browserType | BrowserType.ios;
        }
        else if (agent.indexOf("iPad") > 0)
        {
            browserType = browserType | BrowserType.iPad;
            browserType = browserType | BrowserType.ios;
        }
        else if (agent.indexOf("Mac") > 0)
        {
            browserType = browserType | BrowserType.iPad;
            browserType = browserType | BrowserType.ios;
        }

        if (agent.indexOf("Android") > 0)
        {
            browserType = browserType | BrowserType.Android;
        }
        this.type = browserType;
    }
}
