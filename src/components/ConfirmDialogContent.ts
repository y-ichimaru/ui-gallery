/**
 * @summary ダイアログに表示するためのコンテントを表します.
 */
export class ConfirmDialogContent
{
    text: string = "";
    title: string = "";
    okText: string = "OK";
    cancelText: string = "キャンセル";

    /**
     * @summary コンストラクタ
     * @param 初期値
     */
    constructor(content: Partial<ConfirmDialogContent>)
    {
        Object.assign(this, content);
    }
}
