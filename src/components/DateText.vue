<template>
    <div class="d-flex align-baseline">
        <div>{{date.getFullYear()}}</div>
        <small>年</small>
        <div>{{date.getMonth()+1}}</div>
        <small>月</small>
        <div>{{date.getDate()}}</div>
        <small>日</small>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

/**
 * @summary 日付をフォーマットして表示します.
 */
@Component
export default class DateText extends Vue
{
    // #region props
    @Prop({ default: () => new Date() }) readonly date!: Date;
    // #endregion
}
</script>
