<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

/**
 * @summary ダイアログを実装するための基本機能を提供します.
 */
@Component
export default class DialogBase<T, TResult> extends Vue
{
    public context?: any = {};
    private resolve?: (value?: TResult | PromiseLike<TResult | undefined> | undefined) => void = undefined;
    private isShow = false;

    /**
     * @summary ダイアログを開きます.
     * @param context 編集する内容
     * @returns 追加する内容
     */
    public showAsync(context?: T): Promise<TResult | undefined>
    {
        this.isShow = true;
        this.context = context;
        return new Promise<TResult | undefined>(resolve =>
        {
            this.resolve = resolve;
        });
    }

    /**
     * @summary ダイアログを閉じて編集済みの内容を返却します.
     */
    public close(result?: TResult)
    {
        this.isShow = false;
        this.resolve!(result);
    }
}
</script>
