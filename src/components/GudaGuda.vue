<template>
    <div>GudoGudo nann dayo {{gud}}</div>
</template>
<script lang="ts">
import Vue from "vue";
import {GudeGude} from "gude-gude";
export default Vue.extend({
    data()
    {
        return {gud: 967};
    },
    mounted()
    {
        const g = new GudeGude();
        this.gud = g.getPieeeeeeeeeeeen();
    }
});
</script>
