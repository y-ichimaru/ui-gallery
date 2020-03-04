import { Vue } from "vue-property-decorator";
/**
 * @summary 接続設定ページのUIを提供します.
 */
export default class NetworkTester extends Vue {
    readonly isEnabled: boolean;
    /**
     * @returns ネットワーク速度を取得します.
     */
    private getNetworkSpeed;
    /**
     * @returns ネットワーク速度を取得します.
     */
    private getMessage;
    /**
     * @returns ネットワーク速度を取得します.
     */
    private getMessage2;
}
