/**
 * エレメントにD&Dを適応するクラス
 */
export default class DragableBox {
    private isMoving;
    private videoViewX;
    private videoViewY;
    private offsetX;
    private offsetY;
    private isVideoBoxFixed;
    private dragableBoxElement;
    private triggerBoxElement;
    private onDragableBoxElementFixed;
    private _isOverlapedTriggerBox;
    get isOverlapedTriggerBox(): boolean;
    /**
     * @param {HTMLElement} dragableBoxElement
     * @param {HTMLElement} triggerBoxElement
     * @param {Function} onDragableBoxElementFixed
     */
    constructor(dragableBoxElement: HTMLElement, triggerBoxElement: HTMLElement, onDragableBoxElementFixed: Function);
    /**
     * 自身のビデオボックスが移動開始したとき
     */
    beginMove(e: any): void;
    /**
    * 自身のビデオボックスが移動終了したとき
    */
    onEndMove(e: any): void;
    /**
     * 自身のビデオボックスが移動したとき
     */
    onMove(e: any): void;
    /**
     *
     * @param {ClientRect} rect1
     * @param {ClientRect} rect2
     */
    private isCollisionEnter;
}
