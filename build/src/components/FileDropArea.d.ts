import { Vue } from "vue-property-decorator";
/**
 * ファイルをドロップして受け取るエリアを提供します．
 */
export default class FileDropArea extends Vue {
    private isDragOverring;
    private onDragOver;
    private drop;
    private onDragLeave;
}
