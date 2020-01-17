function max(value1: number, value2: number)
{
    return value1 < value2 ? value2 : value1;
}

function min(value1: number, value2: number)
{
    return value1 < value2 ? value1 : value2;
}

/**
 * エレメントにD&Dを適応するクラス
 */
export default class DragableBox
{
    // ドラッグ中かどうか
    private isMoving: boolean = false;

    // エレメント座標
    private videoViewX: number = 0;
    private videoViewY: number = 0;

    // ドラッグを開始したマウス座標とエレメント座標とのオフセット
    private offsetX: number = 0;
    private offsetY: number = 0;

    // ビデオを右下に固定するかどうか
    private isVideoBoxFixed: Boolean = true;

    // エレメント
    private dragableBoxElement: HTMLElement;
    private triggerBoxElement: HTMLElement;
    private onDragableBoxElementFixed: Function;

    private _isOverlapedTriggerBox = false;

    public get isOverlapedTriggerBox(): boolean
    {
        return this._isOverlapedTriggerBox;
    }

    /**
     * @param {HTMLElement} dragableBoxElement
     * @param {HTMLElement} triggerBoxElement
     * @param {Function} onDragableBoxElementFixed
     */
    constructor(dragableBoxElement: HTMLElement, triggerBoxElement: HTMLElement, onDragableBoxElementFixed: Function)
    {
        if (!dragableBoxElement || !triggerBoxElement || !onDragableBoxElementFixed)
        {
            throw new Error("引数が不正です。");
        }

        // エレメント
        this.dragableBoxElement = dragableBoxElement;
        this.triggerBoxElement = triggerBoxElement;
        // dragableBoxElementが固定されたとき
        this.onDragableBoxElementFixed = onDragableBoxElementFixed;

        // ドラッグ中かどうか
        this.isMoving = false;
        // エレメント座標
        this.videoViewX = 0;
        this.videoViewY = 0;
        // ドラッグを開始したマウス座標とエレメント座標とのオフセット
        this.offsetX = 0;
        this.offsetY = 0;
        // ビデオを右下に固定するかどうか
        this.isVideoBoxFixed = true;
        this.onDragableBoxElementFixed();

        // マウスクリックをやめたとき
        document.addEventListener("mouseup", this.onEndMove.bind(this), true);
        document.addEventListener("touchend", this.onEndMove.bind(this), true);

        // ウィンドウをリサイズしたとき
        window.addEventListener("resize", () =>
        {
            // locaition
            const rect = this.dragableBoxElement.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            // ビデオボックスを右下に固定していたら
            if (this.isVideoBoxFixed)
            {
                this.onDragableBoxElementFixed();
            }
            else
            {
                // 自身のビデオボックスが画面からはみ出さないようにする
                // Y軸が画面外に出ていなかったら移動
                this.videoViewX = min(max(this.videoViewX, 0), window.innerWidth - width);
                this.dragableBoxElement.style.left = `${this.videoViewX}px`;
                // X軸が画面外に出ていなかったら移動
                this.videoViewY = min(max(this.videoViewY, 0), window.innerHeight - height);
                this.dragableBoxElement.style.top = `${this.videoViewY}px`;
            }
        });

        // マウスを動かしたとき
        document.addEventListener("mousemove", this.onMove.bind(this), true);
        document.addEventListener("touchmove", this.onMove.bind(this), {passive: false});
    }

    /**
     * 自身のビデオボックスが移動開始したとき
     */
    public beginMove(e: any): void
    {
        this.isMoving = true;
        this.isVideoBoxFixed = false;

        this.triggerBoxElement.style.display = "";
        const rect = this.dragableBoxElement.getBoundingClientRect();
        // ドラッグを開始したマウス座標とエレメント座標とのオフセット
        this.offsetX = (e.clientX || e.changedTouches[0].clientX) - rect.left;
        this.offsetY = (e.clientY || e.changedTouches[0].clientY) - rect.top;

        this.dragableBoxElement.style.bottom = "";
        this.dragableBoxElement.style.right = "";
        this.onMove(e);
    }

    /**
    * 自身のビデオボックスが移動終了したとき
    */
    public onEndMove(e: any): void
    {
        if (this.isMoving)
        {
            // locaition
            const rect = this.dragableBoxElement.getBoundingClientRect();
            this.isMoving = false;
            if (this.isCollisionEnter(rect, this.triggerBoxElement.getBoundingClientRect()))
            {
                this.isVideoBoxFixed = true;
                this.onDragableBoxElementFixed();
            }
            this.triggerBoxElement.style.display = "none";
        }
    }

    /**
     * 自身のビデオボックスが移動したとき
     */
    public onMove(e: any): void
    {
        if (this.isMoving)
        {
            e.preventDefault();

            // location
            const rect = this.dragableBoxElement.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            // ドラッグを開始したマウス座標とエレメント座標とのオフセット
            const x = (e.clientX || e.changedTouches[0].clientX) - this.offsetX;
            const y = (e.clientY || e.changedTouches[0].clientY) - this.offsetY;

            // Y軸が画面外に出ていなかったら移動
            this.videoViewX = min(max(x, 0), window.innerWidth - width);
            // X軸が画面外に出ていなかったら移動
            this.videoViewY = min(max(y, 0), window.innerHeight - height);

            this.dragableBoxElement.style.top = `${this.videoViewY}px`;
            this.dragableBoxElement.style.left = `${this.videoViewX}px`;

            // triggerのコリジョン
            this._isOverlapedTriggerBox = this.isCollisionEnter(rect, this.triggerBoxElement.getBoundingClientRect());
        }
    }

    /**
     *
     * @param {ClientRect} rect1
     * @param {ClientRect} rect2
     */
    private isCollisionEnter(rect1: ClientRect, rect2: ClientRect): boolean
    {
        if (
            // 横の判定
            Math.abs(rect1.left - rect2.left) < rect1.width / 2 + rect2.width / 2 &&
            Math.abs(rect1.top - rect2.top) < rect1.height / 2 + rect2.height / 2 // 縦の判定
        )
        {
            return true;
        }
        return false;
    }
}
