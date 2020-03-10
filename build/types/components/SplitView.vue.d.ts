/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue } from "vue-property-decorator";
/**
 * リサイズ可能な分割ビューを提供します．
 */
export default class SplitView extends Vue {
    private isDragging;
    private splitWidth;
    /**
     * デフォルトの分割長さ
     */
    readonly defaultSplitWidth: number;
    /**
     * 縦か横か
     */
    readonly isVertical: boolean;
    /**
     * 最小長さ
     */
    readonly minWidth: number;
    /**
     * 最大長さ
     */
    readonly maxWidth: number;
    /**
     * ハンドルのサイズ
     */
    readonly handleSize: number;
    private created;
    private beforeDestroy;
    /**
     * ドラッグを開始します.
     */
    private startDrag;
    /**
     * マウスが動いたとき.
     * @description 分割するサイズを変更します．
     */
    private onMouseMove;
    /**
     * マウスがクリックをやめたとき．
     * @description ドラッグフラグを解除します．
     */
    private onMouseUp;
}
