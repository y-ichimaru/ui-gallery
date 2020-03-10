/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue } from "vue-property-decorator";
export default class extends Vue {
    readonly fixed: boolean;
    readonly top: string;
    readonly right: string;
    readonly bottom: string;
    readonly left: string;
    readonly width: string;
    readonly height: string;
    readonly closedHeaderHeight: string;
    readonly openedHeaderHeight: string;
    readonly headerColor: string;
    private dragableBox?;
    private isFixed;
    private isDragging;
    private onBeginMove;
    private applyVideoFixed;
    private getRect;
    private onMouseUp;
    private created;
    private mounted;
    private beforeDestroy;
}
