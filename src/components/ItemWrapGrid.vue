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
    private columnCount = 4;
    /**
     * 表示するアイテム
     */
    @Prop({default: []}) readonly items!: unknown[];

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
        if (width <= 520)
        {
            this.columnCount = 1;
        }
        else if (width <= 780)
        {
            this.columnCount = 2;
        }
        else if (width <= 1280)
        {
            this.columnCount = 3;
        }
        else
        {
            this.columnCount = 4;
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
