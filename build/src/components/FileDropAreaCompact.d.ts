import { Vue } from "vue-property-decorator";
/**
 * ファイルをドロップして受け取るエリアを提供します．
 */
export default class FileDropAreaCompact extends Vue {
    readonly message: string;
    private isDragOverring;
    private onDragOver;
    private drop;
    private onDragLeave;
}
