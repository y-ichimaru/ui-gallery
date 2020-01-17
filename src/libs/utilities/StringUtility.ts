
/**
 * @summary URLからGETパラメータを取得
 * @param key 取得したいパラメーターのキー
 * @param url 任意のURLを（未指定の場合は現在のURL）
 */
export function getUrlParameter(key: string, url?: string): string
{
    // パラメーターを配列で取得する。
    const text = url || location.search;
    let str = text.split("?");
    if (str.length < 2)
    {
        return "";
    }

    let params = str[1].split("&");
    for (let i = 0; i < params.length; i++)
    {
        let keyVal = params[i].split("=");
        if (keyVal[0] === key && keyVal.length === 2)
        {
            return decodeURIComponent(keyVal[1]);
        }
    }
    return "";
}
