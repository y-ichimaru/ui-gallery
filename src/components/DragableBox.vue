<template>
    <div>
        <!-- ビデオボックスの固定を切り替えるイベントの発火判定に使うボックス -->
        <!-- ここにビデオボックスをドロップするとビデオが固定される -->
        <div
            class="dropable-box"
            :class="(!isFixed&&dragableBox&&dragableBox.isOverlapedTriggerBox)?'elevation-4':''"
            ref="dropVideoBox"
            style="margin-top:0px;"
            :style="{
                right:right,
                top:top,
                left:left,
                bottom:bottom,
                position:fixed?'fixed':'absolute',
                background:(dragableBox&&dragableBox.isOverlapedTriggerBox)?'rgba(127,127,127,0.7)':'rgba(127,127,127,0.3)',
                height:height + 'px',
                width:width + 'px',
                display:'none'
            }"
        ></div>
        <!-- ビデオラッパー -->
        <div
            style="z-index: 201;border:0;"
            :style="{
                position:fixed?'fixed':'absolute',
                transition: isFixed ? 'right .6s' : ''
            }"
            ref="videoBox"
        >
            <!-- 上に伸びるエリア -->
            <div
                :style="{
                    height:isHeaderOpend?`${openedHeaderHeight}px`:`${20+Number(closedHeaderHeight)}px`,
                    padding:'0px 4px 4px 4px',
                    background:headerColor
                }"
                style="transition: all 0.5s;margin-bottom: 0px;border: 0px;border-radius: 0px;border-top-right-radius: 3px;border-top-left-radius: 3px;cursor: move;user-select: none;"
                class="mt-0"
                :class="isDragging?'elevation-8':'elevation-2'"
            >
                <div
                    style="height:22px;position: relative;font-size: 10px;cursor: move;user-select: none;"
                    @mousedown.self="onBeginMove"
                    @touchstart.self="onBeginMove"
                >
                    <p
                        class="color-gray margin-none"
                        style="margin-left:3px;"
                        :style="{position:fixed?'fixed':'absolute'}"
                    >ドラッグで移動します</p>
                    <!-- <a
                        class="pointer"
                        style="margin-left:auto;width:100%;"
                        @click="isHeaderOpend=!isHeaderOpend;$emit('headerChanged',isHeaderOpend)"
                    ><i
                            style="font-size:10px;font-weight: 900;"
                            :class="isHeaderOpend?'fa fa-angle-down':'fa fa-angle-up'"
                        ></i>
                        {{isHeaderOpend?"最小化":"最大化"}}
                    </a>-->
                </div>
                <!-- <div :style="`height:calc(100% - ${closedHeaderHeight}px);`">
                    <slot name="header"></slot>
                </div>-->
            </div>
            <div
                :class="isDragging?'elevation-8':'elevation-2'"
                :style="{
                    width: `${width}px`,
                    height :`${height}px`,
                    margin:0,
                    border: '0px',
                    cursor: 'move',
                    userSelect: 'none'
                }"
                @mousedown="onBeginMove"
                @touchstart="onBeginMove"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue, Component, Prop } from "vue-property-decorator";
import DragableBox from "../core/UI/DragableBox";

@Component
export default class extends Vue
{
    @Prop({ default: true }) readonly fixed!: boolean;
    @Prop({ default: "" }) readonly top!: string;
    @Prop({ default: "" }) readonly right!: string;
    @Prop({ default: "" }) readonly bottom!: string;
    @Prop({ default: "" }) readonly left!: string;
    @Prop({ default: "248" }) readonly width!: string;
    @Prop({ default: "168" }) readonly height!: string;
    @Prop({ default: "0" }) readonly closedHeaderHeight!: string;
    @Prop({ default: "300" }) readonly openedHeaderHeight!: string;
    @Prop({ default: "rgb(215, 215, 215)" }) readonly headerColor!: string;

    private dragableBox?: DragableBox = undefined;
    private isFixed = true;
    private isDragging = false;

    private onBeginMove(e: MouseEvent)
    {
        this.isFixed = false;
        this.isDragging = true;
        if (this.dragableBox) this.dragableBox.beginMove(e);
    }

    // ビデオを画面右下に固定
    private applyVideoFixed()
    {
        const element = this.$refs.videoBox as HTMLElement | undefined;
        if (element)
        {
            this.isFixed = true;
            const style = element.style;
            style.bottom = this.bottom;
            style.left = this.left;
            style.top = this.top;
            style.right = this.right;
        }
    }

    private getRect(): ClientRect | undefined
    {
        const element = this.$refs.videoBox as HTMLElement | undefined;
        if (element)
        {
            return element.getBoundingClientRect();
        }
        return undefined;
    }

    private onMouseUp()
    {
        this.isDragging = false;
    }

    private created()
    {
        // マウスクリックをやめたとき
        document.addEventListener("mouseup", this.onMouseUp, true);
    }

    private mounted()
    {
        this.applyVideoFixed();
        const video = this.$refs.videoBox as HTMLElement | undefined;
        const box = this.$refs.dropVideoBox as HTMLElement | undefined;
        if (video && box)
        {
            this.dragableBox = new DragableBox(video, box, this.applyVideoFixed.bind(this));
        }
    }

    private beforeDestroy()
    {
        document.removeEventListener("mouseup", this.onMouseUp, true);
    }
}
</script>
<style scoped>
/* ビデオボックスを固定するかどうかを切り替えるボックス */
.dropable-box {
    z-index: 200;
}
</style>
