import { Vue } from "vue-property-decorator";
/**
 * 時刻の表示を提供します．
 */
export default class extends Vue {
    readonly date: Date;
    private h;
    private m;
    private s;
    private d;
    private intervalId;
    private mounted;
    private beforeDestroy;
}
