import { Vue } from "vue-property-decorator";
/**
 * @summary ダイアログを実装するための基本機能を提供します.
 */
export default class DialogBase<T, TResult> extends Vue {
    context?: any;
    private resolve?;
    private isShow;
    /**
     * @summary ダイアログを開きます.
     * @param context 編集する内容
     * @returns 追加する内容
     */
    showAsync(context?: T): Promise<TResult | undefined>;
    /**
     * @summary ダイアログを閉じて編集済みの内容を返却します.
     */
    close(result?: TResult): void;
}
