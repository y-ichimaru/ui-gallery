<template>
    <div
        class="split-view"
        :style="{
            gridTemplateColumns:!isVertical?`${splitWidth}px ${handleSize}px 1fr`:'',
            gridTemplateRows:isVertical?`${splitWidth}px ${handleSize}px 1fr`:'',
        }"
        ref="container"
    >
        <!-- @slot 分割する際の最初のスロット -->
        <slot name="slot1" />
        <div
            :style="isVertical?'cursor: ns-resize':'cursor: ew-resize'"
            @mousedown="startDrag"
            class="handle"
        ></div>
        <!-- @slot 分割する際のもう一方のスロット -->
        <slot name="slot2" />
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from "vue-property-decorator";

/**
 * リサイズ可能な分割ビューを提供します．
 */
@Component({ components: {} })
export default class SplitView extends Vue
{
    private isDragging = false;
    private splitWidth = 0;

    /**
     * デフォルトの分割長さ
     */
    @Prop({ default: 180 }) readonly defaultSplitWidth!: number;

    /**
     * 縦か横か
     */
    @Prop({ default: false }) readonly isVertical!: boolean;

    /**
     * 最小長さ
     */
    @Prop({ default: 0 }) readonly minWidth!: number;

    /**
     * 最大長さ
     */
    @Prop({ default: Number.MAX_SAFE_INTEGER }) readonly maxWidth!: number;

    /**
     * ハンドルのサイズ
     */
    @Prop({ default: 4 }) readonly handleSize!: number;

    private created()
    {
        this.splitWidth = this.defaultSplitWidth;
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("mouseup", this.onMouseUp);
    }

    private beforeDestroy()
    {
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("mouseup", this.onMouseUp);
    }

    /**
     * ドラッグを開始します.
     */
    private startDrag()
    {
        this.isDragging = true;
    }

    /**
     * マウスが動いたとき.
     * @description 分割するサイズを変更します．
     */
    private onMouseMove(e: MouseEvent)
    {
        if (this.isDragging)
        {
            const container = this.$refs.container as HTMLElement | undefined;
            if (!container) return;
            const rect = container.getBoundingClientRect();

            if (this.isVertical)
            {
                this.splitWidth += e.movementY;
                this.splitWidth = Math.max(this.minWidth, Math.min(this.splitWidth, Math.min(this.maxWidth, rect.height - this.handleSize)));
            }
            else
            {
                this.splitWidth += e.movementX;
                this.splitWidth = Math.max(this.minWidth, Math.min(this.splitWidth, Math.min(this.maxWidth, rect.width - this.handleSize)));
            }
        }
    }

    /**
     * マウスがクリックをやめたとき．
     * @description ドラッグフラグを解除します．
     */
    private onMouseUp()
    {
        this.isDragging = false;
    }
}
</script>
<style lang="scss" scoped>
.split-view {
    display: grid;
    overflow: hidden;
}

.handle {
    background: rgba(123, 123, 123, 0.53);
    cursor: ew-resize;
    user-select: none;
}

.handle:hover {
    background: rgba(60, 60, 60, 0.53);
}
</style>
