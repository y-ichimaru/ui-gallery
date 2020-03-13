<template>
    <div
        v-ripple
        class="strech drop-area d-flex flex-column justify-center align-center"
        :class="isDraggingOver?'drop-area drag-over':''"
        style
        @dragover.prevent="onDragOver"
        @drop.prevent="drop"
        @dragleave="onDragLeave"
    >
        <v-icon
            :class="isDraggingOver?'upload-icon':''"
            style="font-size:64px;margin-top:-20px;"
            color="primary"
        >mdi-cloud-upload-outline</v-icon>
        <div class="mt-2" style="font-size:20px;">{{message}}</div>
    </div>
</template>
<script lang="ts">
/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue, Component, Prop } from "vue-property-decorator";

/**
 * ファイルをドロップして受け取るエリアを提供します．
 */
@Component
export default class FileDropAreaCompact extends Vue
{
    @Prop({ default: "ファイルをドロップしてください" }) readonly message!: string;

    private isDraggingOver = false;
    private onDragOver()
    {
        this.isDraggingOver = true;
    }

    private drop(e: DragEvent)
    {
        e.preventDefault();
        this.isDraggingOver = false;
        if (!e.dataTransfer) return;
        const file = e.dataTransfer.files[0];
        if (!file || file.type.indexOf("image/") < 0) return;
        /**
         * 画像ファイルがドロップされたとき
         * @type {File}
         */
        this.$emit("Drop", file);
    }

    private onDragLeave()
    {
        this.isDraggingOver = false;
    }
}
</script>
<style scoped lang="scss">
.drop-area {
    border: 2px dashed rgba(127, 127, 127, 0.4);
    -webkit-border-radius: 4px;
    border-radius: 4px;
    text-align: center;
    font: 20pt bold arial;
}

.drop-area:hover {
    background: rgba(127, 127, 127, 0.2);
}

.drag-over {
    border: 2px solid rgb(156, 50, 255);
}

.upload-icon {
    animation: vertical 0.4s ease-in-out infinite alternate;
}
@keyframes vertical {
    0% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0px);
    }
}
</style>
