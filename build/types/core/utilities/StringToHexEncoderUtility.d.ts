/**
 * @packageDocumentation
 * @module Core
 * @preferred
 */
/**
 * @summary 文字列を16進数に変換する処理をまとめたクラス
 */
export default class StringToHexEncoderUtility {
    /**
     * ニックネームからPeer ID を生成
     * @param  name ニックネーム
     * @returns Peer ID
     */
    static generatePeerId(name: string): string;
    /**
     * Peer ID を名前にデコード
     * @param  peerId
     * @returns 名前
     */
    static decodePeerId(peerId: string): string;
    /**
     * ランダムな文字を生成
     * @param  length 文字の長さ
     * @returns  ランダムな文字列
     */
    static getRamdomString(length: number): string;
    /**
     * 文字列を16進数にエンコード
     * @param  text 変化する文字列
     * @returns  変換した文字列
     */
    static decodeStringFromHex(text: string): string | null;
    /**
     * 16進数の文字列を文字列にデコード
     * @param  text 変化する文字列
     * @returns  変換した文字列
     */
    static encodeStringToHex(text: string): string;
    /**
     * 文字列をUTF8のバイト配列に変換
     * @param  text 変化する文字列
     * @returns {Array<Number>} 変換した文字列
     */
    static stringToUtf8Bytes(text: string): number[];
    /**
     * UTF8のバイト配列を文字列に変換
     * @param arr UTF8のバイト配列
     * @returns  変換された文字列
     */
    static utf8BytesToString(arr: number[]): string | null;
    /**
     * バイト配列を16進文字列に変換
     * @param  hexStr バイト配列
     * @returns 16進数文字列
     */
    static hexStringToBytes(hexStr: any): number[];
    /**
     * 16進文字列をバイト値に変換
     * @param  hexStr 16進文字列
     * @return  バイト値
     */
    static hexToByte(hexStr: any): number;
    /**
     * バイト配列を16進文字列に変換
     * @param bytes バイト配列
     * @returns  16進数文字列
     */
    static bytesToHexString(bytes: Array<number>): string;
    /**
     * バイト配列を16進文字列に変換
     * @param  byteNum バイト値
     * @returns  16進数文字列
     */
    static byteToHex(byteNum: number): string;
}
