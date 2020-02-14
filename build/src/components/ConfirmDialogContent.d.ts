/**
 * @summary ダイアログに表示するためのコンテントを表します.
 */
export declare class ConfirmDialogContent {
    text: string;
    title: string;
    okText: string;
    cancelText: string;
    /**
     * @summary コンストラクタ
     * @param 初期値
     */
    constructor(content: Partial<ConfirmDialogContent>);
}
