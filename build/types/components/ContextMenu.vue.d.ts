/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue } from "vue-property-decorator";
export default class ContextMenu extends Vue {
    private isShow;
    /**
     * 指定した絶対座標にコンテキストメニューを表示します
     * @param x x座標
     * @param y y座標
     */
    show(x: number, y: number): void;
    close(): void;
}
