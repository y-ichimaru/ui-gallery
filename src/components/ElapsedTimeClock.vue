<template>
    <span>
        <span v-if="d!='00'">{{d}}</span>
        <span class="tani" v-if="d!='00'">日</span>
        <span>{{h}}</span>
        <span class="tani">
            <small>時間</small>
        </span>
        <span>{{m}}</span>
        <span class="tani">
            <small>分</small>
        </span>
        <span>{{s}}</span>
        <span class="tani">
            <small>秒</small>
        </span>
    </span>
</template>

<script  lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

/**
 * 時刻の表示を提供します．
 */
@Component
export default class extends Vue
{
    @Prop({ default: () => new Date() }) readonly date!: Date;

    private h = "0";
    private m = "0";
    private s = "0";
    private d = "0";
    private intervalId = 0;

    private mounted()
    {
        const from = this.date;
        this.intervalId = setInterval(() =>
        {
            const to = new Date();
            const ms = (to.getTime() - from.getTime()) / 1000;
            const daySec = ms % (60 * 60 * 24);

            const d = Math.floor(ms / (60 * 60 * 24));
            const h = Math.floor(daySec / (60 * 60));
            const m = Math.floor((daySec / 60) % 60);
            const s = Math.floor(daySec % 60);

            if (d < 10)
            {
                this.d = "0" + this.d;
            }
            if (h < 10)
            {
                this.h = "0" + this.h;
            }
            if (m < 10)
            {
                this.m = "0" + this.m;
            }
            if (s < 10)
            {
                this.s = "0" + this.s;
            }
        }, 1000) as any as number;
    }

    private beforeDestroy()
    {
        clearInterval(this.intervalId);
    }
};
</script>
