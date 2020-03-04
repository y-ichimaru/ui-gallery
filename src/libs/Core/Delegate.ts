import { IDisposeable } from "./IDisposable";

/**
 * @summary マルチキャストデリゲートを実現します。
 */
export class MultiCastDelegate<TFuncType extends Function> implements IDisposeable
{
    private _isDisposed: boolean = false;
    // 関数の配列
    private callees: TFuncType[] = [];

    /**
     * @summary リソースが破棄済みかどうか
     */
    public get isDisposed(): boolean
    {
        return this._isDisposed;
    }

    /**
     * @summary コンストラクタ
     */
    public constructor()
    {
        this.callees = [];
    }

    /**
     * @summary 全ての関数を呼び出します。
     * @param params ハンドルする引数
     */
    public invoke(params: any): void
    {
        for (let i = 0; i < this.callees.length; i++)
        {
            let callee = this.callees[i];
            if (callee)
            {
                callee(params);
            }
        }
    }

    /**
     * @summary 関数が既に登録されているかどうかを返します。
     * @description 関数が既に登録されてい場合はtrue、それ以外の場合はfalseを返します。
     * @param callee 検証する関数
     * @returns  関数が既に登録されているかどうか
     */
    public contains(callee: TFuncType): boolean
    {
        if (!callee)
        {
            return false;
        }

        return this.callees.indexOf(callee) >= 0;
    }

    /**
     * @summary 関数を登録します。
     * @param callee 登録する関数
     * @returns 指定した関数を登録済の自身を表すインスタンス
     */
    public add(callee: TFuncType): MultiCastDelegate<TFuncType>
    {
        if (!callee)
        {
            return this;
        }

        if (!this.contains(callee))
        {
            this.callees.push(callee);
        }

        return this;
    }

    /**
     * @summary 関数を破棄します。
     * @param callee 削除する関数
     * @returns 指定した関数を削除済の自身を表すインスタンス
     */
    public remove(callee: TFuncType): MultiCastDelegate<TFuncType>
    {
        if (!callee)
        {
            return this;
        }

        var index = this.callees.indexOf(callee);
        if (index >= 0)
        {
            this.callees.splice(index, 1);
        }

        return this;
    }

    /**
     * @summary すべてのリソースを破棄します。
     */
    public dispose(): void
    {
        this.callees = [];
    }
}
