<template>
    <span>
        <span v-if="d!='00'">{{d}}</span><span
            class="tani"
            v-if="d!='00'"
        >日</span>
        <span>{{h}}</span><span class="tani"><small>時間</small></span>
        <span>{{m}}</span><span class="tani"><small>分</small></span>
        <span>{{s}}</span><span class="tani"><small>秒</small></span>
    </span>
</template>

<script>
export default {
    name: "elapsed-time-clock",
    props: {
        /**
         * [date 表示するDateオブジェクト]
         * @type {Date}
         */
        date: {
            type: Date,
            require: true,
            default: () => new Date()
        }
    },
    data()
    {
        return {
            h: 0,
            m: 0,
            s: 0,
            d: 0,
            intervalId: 0
        };
    },
    mounted()
    {
        const from = this.date;
        this.intervalId = setInterval(() =>
        {
            const to = new Date();
            const ms = (to.getTime() - from.getTime()) / 1000;
            const daySec = ms % (60 * 60 * 24);

            this.d = Math.floor(ms / (60 * 60 * 24));
            this.h = Math.floor(daySec / (60 * 60));
            this.m = Math.floor((daySec / 60) % 60);
            this.s = Math.floor(daySec % 60);

            if (this.d < 10)
            {
                this.d = "0" + this.d;
            }
            if (this.h < 10)
            {
                this.h = "0" + this.h;
            }
            if (this.m < 10)
            {
                this.m = "0" + this.m;
            }
            if (this.s < 10)
            {
                this.s = "0" + this.s;
            }
        }, 1000);
    },
    beforeDestroy()
    {
        clearInterval(this.intervalId);
    }
};
</script>
