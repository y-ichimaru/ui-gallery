<template>
    <div class="pa-8">
        <div class="d-flex">
            <div class="pt-2" style="font-size:28px">Theme</div>
            <v-spacer />
            <v-switch style="width:80px;" v-model="isDark" :label="isDark?'Dark':'Light'" />
        </div>
        <v-divider class="mb-8" />
        <slot />
    </div>
</template>
<script lang="ts">
/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import Vue from "vue";
/**
 * ストーリーに表示するVuetifyのテーマを選択させる
 */
export default Vue.extend({
    data()
    {
        return {
            isDark: false
        };
    },
    watch: {
        isDark(e)
        {
            this.$vuetify.theme.dark = this.isDark;
        }
    }
});
</script>
<style>
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css");
</style>
