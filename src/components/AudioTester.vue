<template>
    <div>
        <v-card
            class="mx-auto pa-3 strech d-flex flex-column"
            style="border-radius:0;"
            elevation="0"
        >
            <div class="strech d-flex flex-wrap justify-center align-center">
                <div style="width:134px;">
                    <div style="font-size:10px;">マイクの認識状況</div>
                    <div>
                        <VolumeIndicator
                            indicatorCount="15"
                            :isEnabled="isAudioEnabled"
                            style="width:100px;height:24px;"
                            v-if="stream"
                            color="#6d5db3"
                            class="mt-3"
                            emptyColor="rgb(220,220,220)"
                            :stream="stream"
                        />
                        <div style="color:#b4b4b4;font-size:12px;">
                            ボタンを押すと
                            <br />音声テストが流れます
                        </div>
                    </div>
                </div>
                <div class="ml-1 mt-2">
                    <v-icon
                        style="font-size:52px;"
                    >{{isAudioEnabled? "mdi-microphone":"mdi-microphone-off"}}</v-icon>
                    <div style="font-size:22px;height:22px;" class="d-flex">
                        <v-icon style="font-size:24px;">{{isAudioEnabled?"mdi-check":"mdi-close"}}</v-icon>
                        <div style="font-size:18px;height:22px;" class>{{isAudioEnabled?"ON":"OFF"}}</div>
                    </div>
                </div>
            </div>
        </v-card>
    </div>
</template>
<script lang="ts">
import {Vue, Prop, Component, Watch} from "vue-property-decorator";
import VolumeIndicator from "./VolumeIndicator.vue";
/**
 * @summary 接続設定ページのUIを提供します.
 */
@Component({components: {VolumeIndicator}})
export default class AudioTester extends Vue
{
    /**
     * オーディオが有効かどうか
     */
    @Prop({default: false}) readonly isAudioEnabled!: boolean;

    /**
     * ストリーム
     */
    @Prop({default: () => new MediaStream()}) readonly stream!: MediaStream;
}
</script>
