/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue } from "vue-property-decorator";
/**
 * @summary 接続設定ページのUIを提供します.
 */
export default class AudioTester extends Vue {
    /**
     * オーディオが有効かどうか
     */
    readonly isAudioEnabled: boolean;
    /**
     * ストリーム
     */
    readonly stream: MediaStream;
}
