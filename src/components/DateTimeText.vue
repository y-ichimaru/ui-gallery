<template>
    <div v-html="displayHtml"></div>
</template>
<script lang="ts">
/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue, Prop, Component } from "vue-property-decorator";

const DAYS = [
    "(日)",
    "(月)",
    "(火)",
    "(水)",
    "(木)",
    "(金)",
    "(土)"
];

/**
 * @summary 日付と時間をフォーマットし表示するコンポーネントを提供します.
 */
@Component
export default class DateTimeText extends Vue
{
    @Prop({ default: undefined }) text?: string;

    private get displayHtml(): string
    {
        const date = this.text ? new Date(this.text) : new Date();
        let dateStr = `${date.getFullYear()}<small>年</small>${date.getMonth() + 1}<small>月</small>${date.getDate()}<small>日</small>`;
        dateStr += `${DAYS[date.getDay()]} ${date.getHours()}<small>時</small>${date.getMinutes()}<small>分</small>`;
        return dateStr;
    }
}
</script>
