<template>
    <v-dialog v-model="isShow" overlay-color="transpalent" ref="menu" max-width="200">
        <v-card>
            <slot />
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ContextMenu extends Vue
{
    private isShow = false;

    /**
     * 指定した絶対座標にコンテキストメニューを表示します
     * @param x x座標
     * @param y y座標
     */
    public show(x: number, y: number)
    {
        this.isShow = true;
        this.$nextTick(() =>
        {
            const menu = document.querySelector(".v-dialog");
            if (!menu) return;
            (menu as HTMLElement).style.position = "fixed";
            (menu as HTMLElement).style.left = (x - 20).toString() + "px";
            (menu as HTMLElement).style.top = (y - 20).toString() + "px";
        });
    }

    public close()
    {
        this.isShow = false;
    }
}
</script>
<style>
</style>
