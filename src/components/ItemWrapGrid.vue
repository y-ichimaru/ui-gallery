<template>
    <div class="item-wrap-grid" @resize="onResize">
        <template v-for="(item,key) in items" class="item">
            <div :style="{width:`calc(100% / ${columnCount})`}" class="item" :key="key">
                <slot name="item" :item="item"></slot>
            </div>
        </template>
    </div>
</template>
<script lang="ts">
import {Vue, Prop, Component} from "vue-property-decorator";

/**
 * アイテムを折り返し表示するためのグリッドレイアウトを提供します．
 */
@Component
export default class ItemWrapGrid extends Vue
{
    private columnCount = 0;
    /**
     * 表示するアイテム
     */
    @Prop({default: []}) readonly items!: unknown[];

    /**
     * wrapする条件
     */
    @Prop({
        default: () => [
            {
                width: 1280,
                columnCount: 4
            },
            {
                width: 780,
                columnCount: 3
            },
            {
                width: 580,
                columnCount: 2
            },
            {
                width: 0,
                columnCount: 1
            }
        ]
    }) readonly breakWidths!: any[];

    private mounted()
    {
        window.addEventListener("resize", this.onResize);
        this.onResize();
    }

    private beforeDestroy()
    {
        window.removeEventListener("resize", this.onResize);
    }

    private onResize()
    {
        const width = this.$el.getBoundingClientRect().width;
        for (const item of this.breakWidths)
        {
            if (item.width < width)
            {
                this.columnCount = item.columnCount;
                return;
            }
        }
    }
}
</script>
<style scoped>
.item-wrap-grid {
    display: flex;
    flex-wrap: wrap;
}
.item {
    transition: all 0.5s;
}
</style>
