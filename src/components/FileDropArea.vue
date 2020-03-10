<template>
    <div
        class="strech drop-area relative"
        :class="isDragOverring?'drop-area drag-over':''"
        style="min-width:400px;"
        @dragover.prevent="onDragOver"
        @drop.prevent="drop"
        @dragleave="onDragLeave"
    >
        <div class="absolute-center">
            <v-icon
                :class="isDragOverring?'upload-icon':''"
                style="font-size:72px;margin-top:-20px;"
                color="primary"
            >mdi-cloud-upload-outline</v-icon>
            <div class="mt-4" style="font-size:20px;">{{message}}</div>
            <v-btn class="mt-6" color="primary">またはファイルを選択する</v-btn>
        </div>
    </div>
</template>
<script lang="ts">
/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue, Prop, Component } from "vue-property-decorator";

/**
 * ファイルをドロップして受け取るエリアを提供します．
 */
@Component
export default class FileDropArea extends Vue
{
    @Prop({ default: "ファイルをドロップしてください" }) readonly message!: string;
    private isDragOverring = false;
    private onDragOver()
    {
        this.isDragOverring = true;
    }

    private drop(e: DragEvent)
    {
        e.preventDefault();
        this.isDragOverring = false;
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
        this.isDragOverring = false;
    }
}
</script>
<style scoped lang="scss">
.drop-area {
    border: 2px dashed rgba(127, 127, 127, 0.4);
    -webkit-border-radius: 4px;
    border-radius: 4px;
    padding: 48px;
    text-align: center;
    font: 20pt bold arial;
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
