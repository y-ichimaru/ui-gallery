/**
 * @summary 文字列を16進数に変換する処理をまとめたクラス
 */
export default class StringToHexEncoderUtility
{
    /**
     * ニックネームからPeer ID を生成
     * @param  name ニックネーム
     * @returns Peer ID
     */
    static generatePeerId(name: string): string
    {
        const id = this.encodeStringToHex(name);
        // 名前かぶりを防ぐため識別子を追加
        return `${id}_${this.getRamdomString(3)}`;
    }

    /**
     * Peer ID を名前にデコード
     * @param  peerId
     * @returns 名前
     */
    static decodePeerId(peerId: string): string
    {
        const decode = this.decodeStringFromHex(peerId);
        if (typeof (decode) === "string")
        {
            const split = decode.split("_");
            return (split.length > 0) ? split[0] : "";
        }
        return "";
    }

    /**
     * ランダムな文字を生成
     * @param  length 文字の長さ
     * @returns  ランダムな文字列
     */
    static getRamdomString(length: number): string
    {
        // 生成する文字列に含める文字セット
        const c = "abcdefghijklmnopqrstuvwxyz0123456789";
        const cl = c.length;
        let r = "";
        for (let i = 0; i < length; i++)
        {
            r += c[Math.floor(Math.random() * cl)];
        }
        return r;
    }

    /**
     * 文字列を16進数にエンコード
     * @param  text 変化する文字列
     * @returns  変換した文字列
     */
    static decodeStringFromHex(text: string): string | null
    {
        const bytes = this.hexStringToBytes(text);
        const str = this.utf8BytesToString(bytes);
        return str;
    }

    /**
     * 16進数の文字列を文字列にデコード
     * @param  text 変化する文字列
     * @returns  変換した文字列
     */
    static encodeStringToHex(text: string): string
    {
        const bytes = this.stringToUtf8Bytes(text);
        const hexStr = this.bytesToHexString(bytes);
        return hexStr;
    }

    /**
     * 文字列をUTF8のバイト配列に変換
     * @param  text 変化する文字列
     * @returns {Array<Number>} 変換した文字列
     */
    static stringToUtf8Bytes(text: string): number[]
    {
        const result: number[] = [];
        if (text == null)
        {
            return result;
        }

        for (let i = 0; i < text.length; i++)
        {
            const c = text.charCodeAt(i);
            if (c <= 0x7f)
            {
                result.push(c);
            }
            else if (c <= 0x07ff)
            {
                result.push(((c >> 6) & 0x1F) | 0xC0);
                result.push((c & 0x3F) | 0x80);
            }
            else
            {
                result.push(((c >> 12) & 0x0F) | 0xE0);
                result.push(((c >> 6) & 0x3F) | 0x80);
                result.push((c & 0x3F) | 0x80);
            }
        }
        return result;
    }

    /**
     * UTF8のバイト配列を文字列に変換
     * @param arr UTF8のバイト配列
     * @returns  変換された文字列
     */
    static utf8BytesToString(arr: number[]): string | null
    {
        if (arr === null)
        {
            return null;
        }

        let result = "";
        let i = arr.shift();
        while (i)
        {
            if (i <= 0x7f)
            {
                result += String.fromCharCode(i);
            }
            else if (i <= 0xdf)
            {
                let c = ((i & 0x1f) << 6);
                c += (arr.shift() as number) & 0x3f;
                result += String.fromCharCode(c);
            }
            else if (i <= 0xe0)
            {
                let c = (((arr.shift() as number) & 0x1f) << 6) | 0x0800;
                c += (arr.shift() as number) & 0x3f;
                result += String.fromCharCode(c);
            }
            else
            {
                let c = ((i & 0x0f) << 12);
                c += ((arr.shift() as number) & 0x3f) << 6;
                c += (arr.shift() as number) & 0x3f;
                result += String.fromCharCode(c);
            }
            i = arr.shift();
        }
        return result;
    }

    /**
     * バイト配列を16進文字列に変換
     * @param  hexStr バイト配列
     * @returns 16進数文字列
     */
    static hexStringToBytes(hexStr: any): number[]
    {
        const result = [];
        for (let i = 0; i < hexStr.length; i += 2)
        {
            result.push(this.hexToByte(hexStr.substr(i, 2)));
        }
        return result;
    }

    /**
     * 16進文字列をバイト値に変換
     * @param  hexStr 16進文字列
     * @return  バイト値
     */
    static hexToByte(hexStr: any): number
    {
        return parseInt(hexStr, 16);
    }

    /**
     * バイト配列を16進文字列に変換
     * @param bytes バイト配列
     * @returns  16進数文字列
     */
    static bytesToHexString(bytes: Array<number>): string
    {
        var result = "";
        for (var i = 0; i < bytes.length; i++)
        {
            result += this.byteToHex(bytes[i]);
        }
        return result;
    }

    /**
     * バイト配列を16進文字列に変換
     * @param  byteNum バイト値
     * @returns  16進数文字列
     */
    static byteToHex(byteNum: number): string
    {
        var digits = (byteNum).toString(16);
        if (byteNum < 16) return "0" + digits;
        return digits;
    }
}
