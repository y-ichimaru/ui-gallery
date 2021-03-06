/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue } from "vue-property-decorator";
/**
 * ファイルをドロップして受け取るエリアを提供します．
 */
export default class FileDropArea extends Vue {
    readonly message: string;
    private isDragOverring;
    private onDragOver;
    private drop;
    private onDragLeave;
}
