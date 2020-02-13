<template>
    <div>
        <v-card
            class="mx-auto pa-3 strech d-flex flex-column"
            style="border-radius:0;border-right: 1px solid rgba(128, 128, 128, 0.14);"
            elevation="0"
        >
            <div class="strech d-flex flex-wrap justify-center align-center">
                <div style="width:128px;">
                    <div style="font-size:10px;">スピーカー認識状況</div>
                    <div>
                        <v-btn
                            large
                            color="info"
                            class="mt-3 mb-3"
                            light
                            style="color:#6d6d6d;height:24px;font-size:12px;width:100px;"
                            x-small
                            @click="playAudioTest"
                        >音声テスト</v-btn>
                        <div style="color:#b4b4b4;font-size:12px;">
                            ボタンを押すと
                            <br />音声テストが流れます
                        </div>
                    </div>
                </div>
                <div class="ml-1">
                    <div>
                        <v-icon style="font-size:56px;">mdi-volume-medium</v-icon>
                    </div>
                    <div
                        :style="{color:isEnabled?'var(--v-secondary-base)':''}"
                        style="font-size:22px;height:22px;"
                        class="d-flex"
                    >
                        <v-icon style="font-size:24px;">mdi-check</v-icon>
                        <div style="font-size:18px;height:22px;" class>{{isEnabled?"OK":"NONE"}}</div>
                    </div>
                </div>
            </div>
        </v-card>
    </div>
</template>
<script lang="ts">
import {Vue, Prop, Component, Watch} from "vue-property-decorator";
/**
 * @summary 接続設定ページのUIを提供します.
 */
@Component({components: {}})
export default class AudioOutputTester extends Vue
{
    /**
     * オーディオが有効かどうか
     */
    @Prop({default: false}) readonly isEnabled!: boolean;

    /**
     * @description テスト用音声ファイルへのパス
     */
    @Prop({default: ""}) readonly src!: string;

    /**
     * @summary オーディオの再生テストを実行します.
     */
    private async playAudioTest(): Promise<void>
    {
        try
        {
            const path = "./speaker_check.mp3";
            const audio = new Audio(path);
            await audio.play();
        }
        catch
        {
            logger.error("オーディオテストに失敗しました．ファイルパスを確認してください．");
        }
    }
}
</script>
