import { Vue } from "vue-property-decorator";
/**
 * アイテムを折り返し表示するためのグリッドレイアウトを提供します．
 */
export default class ItemWrapGrid extends Vue {
    private columnCount;
    /**
     * 表示するアイテム
     */
    readonly items: unknown[];
    /**
     * wrapする条件
     */
    readonly breakWidths: any[];
    private mounted;
    private beforeDestroy;
    private onResize;
}
