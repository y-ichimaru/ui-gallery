import { Vue } from "vue-property-decorator";
/**
 * @summary 接続設定ページのUIを提供します.
 */
export default class AudioOutputTester extends Vue {
    /**
     * オーディオが有効かどうか
     */
    readonly isEnabled: boolean;
    /**
     * @description テスト用音声ファイルへのパス
     */
    readonly src: string;
    /**
     * @summary オーディオの再生テストを実行します.
     */
    private playAudioTest;
}
