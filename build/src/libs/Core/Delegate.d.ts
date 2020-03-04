import { IDisposeable } from "./IDisposable";
/**
 * @summary マルチキャストデリゲートを実現します。
 */
export declare class MultiCastDelegate<TFuncType extends Function> implements IDisposeable {
    private _isDisposed;
    private callees;
    /**
     * @summary リソースが破棄済みかどうか
     */
    get isDisposed(): boolean;
    /**
     * @summary コンストラクタ
     */
    constructor();
    /**
     * @summary 全ての関数を呼び出します。
     * @param params ハンドルする引数
     */
    invoke(params: any): void;
    /**
     * @summary 関数が既に登録されているかどうかを返します。
     * @description 関数が既に登録されてい場合はtrue、それ以外の場合はfalseを返します。
     * @param callee 検証する関数
     * @returns  関数が既に登録されているかどうか
     */
    contains(callee: TFuncType): boolean;
    /**
     * @summary 関数を登録します。
     * @param callee 登録する関数
     * @returns 指定した関数を登録済の自身を表すインスタンス
     */
    add(callee: TFuncType): MultiCastDelegate<TFuncType>;
    /**
     * @summary 関数を破棄します。
     * @param callee 削除する関数
     * @returns 指定した関数を削除済の自身を表すインスタンス
     */
    remove(callee: TFuncType): MultiCastDelegate<TFuncType>;
    /**
     * @summary すべてのリソースを破棄します。
     */
    dispose(): void;
}
