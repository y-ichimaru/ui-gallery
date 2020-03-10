/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue } from "vue-property-decorator";
/**
 * ファイルをドロップして受け取るエリアを提供します．
 */
export default class VolumeIndicator extends Vue {
    readonly stream: MediaStream;
    isEnabled: boolean;
    indicatorCount: number;
    height: number;
    span: number;
    color: string;
    emptyColor: string;
    private intervalId;
    private audioContext?;
    isEnabledChanged(value: boolean): void;
    streamChanged(value: MediaStream): void;
    begin(): void;
    kill(): void;
    createAnalyzer(stream: MediaStream): any;
    mounted(): void;
    beforeDestroy(): void;
}
