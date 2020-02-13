<template>
    <div>
        <v-card
            class="mx-auto pa-3 strech d-flex flex-column"
            style="border-radius:0;border-right: 1px solid rgba(128, 128, 128, 0.14);"
            elevation="0"
        >
            <div class="strech d-flex flex-wrap justify-center align-center">
                <div style="width:128px;">
                    <div style="font-size:10px;">ネットワーク速度</div>
                    <div>
                        <div class="d-flex align-baseline">
                            <div
                                class
                                style="font-size:28px;height:fit-content;"
                            >{{getNetworkSpeed()}}</div>
                            <div style="font-size:18px;margin-left:2px;height:fit-content;">Mbps</div>
                        </div>
                        <div style="color:#b4b4b4;font-size:12px;" v-html="getMessage2()"></div>
                    </div>
                </div>
                <div class="ml-1">
                    <v-icon style="font-size:56px;">mdi-wifi</v-icon>
                    <div
                        :style="{color:true?'var(--v-secondary-base)':''}"
                        style="font-size:18px;height:22px;"
                        class="ml-2"
                    >{{getMessage()}}</div>
                </div>
            </div>
        </v-card>
    </div>
</template>
<script lang="ts">
import {Vue, Prop, Component, Watch} from "vue-property-decorator";
import {BrowserUtility, BrowserType} from "../libs/utilities/BrowserUtility";
import RoomConnectionPage from "@/components/Managements/Rooms/RoomConnectionPage.vue";
/**
 * @summary 接続設定ページのUIを提供します.
 */
@Component({components: {}})
export default class NetworkTester extends Vue
{
    @Prop({default: false}) readonly isEnabled!: boolean;

    /**
     * @returns ネットワーク速度を取得します.
     */
    private getNetworkSpeed(): number | undefined
    {
        if (BrowserUtility.hasFlag(BrowserType.Chrome))
        {
            return (navigator as any).connection.downlink as number;
        }
        return undefined;
    }

    /**
     * @returns ネットワーク速度を取得します.
     */
    private getMessage(): string | undefined
    {
        if (BrowserUtility.hasFlag(BrowserType.Chrome))
        {
            const speed = (navigator as any).connection.downlink as number;
            if (speed <= 3) return "低速";
            if (speed < 10) return "中速";
            else return "高速";
        }
        return "";
    }

    /**
     * @returns ネットワーク速度を取得します.
     */
    private getMessage2(): string | undefined
    {
        if (BrowserUtility.hasFlag(BrowserType.Chrome))
        {
            const speed = (navigator as any).connection.downlink as number;
            if (speed <= 3) return "十分な速度が出です<br>高画質で接続可能です";
            if (speed < 10) return "十分な速度が出です<br>高画質で接続可能です";
            else return "十分な速度です<br>高画質で接続可能です";
        }
        return "";
    }
}
</script>
