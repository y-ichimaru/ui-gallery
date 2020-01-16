<template>
    <div>
        <v-btn class="ma-1" color="red">Okada</v-btn>
        <v-btn class="ma-1" color="deep-orange">Okada</v-btn>
        <v-btn class="ma-1" color="orange">Okada</v-btn>
        <v-btn class="ma-1" color="amber">Okada</v-btn>
        <v-btn class="ma-1" color="yellow">Okada</v-btn>
        <v-btn class="ma-1" color="lime">Okada</v-btn>
        <v-btn class="ma-1" color="light-green">Okada</v-btn>
        <v-btn class="ma-1" color="green">Okada</v-btn>
        <v-btn class="ma-1" color="teal">Okada</v-btn>
        <v-btn class="ma-1" color="light-blue">Okada</v-btn>
        <v-btn class="ma-1" color="blue">Okada</v-btn>
        <v-btn class="ma-1" color="indigo">Okada</v-btn>
        <v-btn class="ma-1" color="deep-purple">Okada</v-btn>
        <v-btn class="ma-1" color="purple">Okada</v-btn>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
/**
 * aaaaaaaaaaaaaaaaaaa
 */
@Component
export default class HelloWorld extends Vue
{
    /**
     * 表示するメッセージだよ
     */
    @Prop({default: Date}) private msg!: string;
    created()
    {
        /**
         * eventttttttttttttttttttt
         * @type {string}
         */
        this.$emit("onHello", {});
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
