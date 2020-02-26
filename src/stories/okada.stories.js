import {linkTo} from "@storybook/addon-links";
import {storiesOf} from "@storybook/vue";
import {withInfo} from "storybook-addon-vue-info";
import {action} from "@storybook/addon-actions";

import ItemWrapGrid from "../components/ItemWrapGrid.vue";
import ContextMenu from "../components/ContextMenu.vue";
import FileDropArea from "../components/FileDropArea.vue";
import FileDropAreaCompact from "../components/FileDropAreaCompact.vue";
import NetworkTester from "../components/NetworkTester.vue";
import AudioOutputTester from "../components/AudioOutputTester.vue";
import AudioTester from "../components/AudioTester.vue";
import SplitView from "../components/SplitView.vue";

import ColorPalette from "../components/ColorPalette.vue";
import DragableBox from "../components/DragableBox.vue";

import ColorPaletteFlyout from "../components/ColorPaletteFlyout.vue";

import {DeviceStreamManager, DeviceMediaStreamWrapper} from "../libs/WebRtc/DeviceStreamManager";

import axios from "axios";

storiesOf("岡田シリーズ", module)
    .add("ItemWrapGrid", () => ({
        components: {ItemWrapGrid},
        template: `
        <ItemWrapGrid :items="gridItems">
            <template v-slot:item="{item}">
                <div class="pa-1" >
                    <v-card class="pa-3 strech">
                        <v-card-title class="text-truncate">
                            {{item.title}}
                        </v-card-title>
                        <div class="ml-4">Release Date : {{item.release_date}}</div>
                        <v-card-text class="scroll-y" style="height:160px">
                            {{item.description}}
                        </v-card-text>
                    </v-card>
                </div>
            </template>
        </ItemWrapGrid>
        `,
        data()
        {
            return {
                gridItems: []
            };
        },
        async created()
        {
            this.gridItems = (await axios.get("https://ghibliapi.herokuapp.com/films/")).data;
        },
        methods: {action: action("button-clicked")}
    }), {
        info: {
            summary: "アイテムを折り返し表示するためのグリッドレイアウトを提供します．要素の幅に応じて列の数が変わります．"
        }
    });

storiesOf("岡田シリーズ", module)
    .add("ContextMenu", () => ({
        components: {ContextMenu},
        template: `
        <div>
            <div>
                <div>// if show</div>
                <div>menu.show(x, y);</div>
                <div>// if close</div>
                <div>menu.close();</div>
            </div>
            <v-btn class="mt-4" color="primary" @click.stop="show">クリックしてね</v-btn>
            <ContextMenu ref="menu">
                <v-list>
                    <v-list-item-group>
                        <v-list-item>
                            <v-list-item-title>コピー</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>貼り付け</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>削除</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </ContextMenu>
        </div>
        `,
        data()
        {
            return {
            };
        },
        methods: {
            action: action("button-clicked"),
            show(e)
            {
                const menu = this.$refs.menu;
                if (!menu) return;
                menu.show(e.x, e.y);
            }
        }
    }), {
        info: {
            summary: "右クリック等で表示するメニューを提供します．"
        }
    });

storiesOf("岡田シリーズ", module)
    .add("FileDropArea", () => ({
        components: {FileDropArea, FileDropAreaCompact},
        template: `
        <div>
            <FileDropArea style="height:380px;"/>
            <FileDropAreaCompact class="mt-8" message="画像を選択" style="width:200px;height:300px;" />
        </div>
    `,
        methods: {
            action: action("button-clicked")
        }
    }), {
        info: {
            summary: "ドロップしたファイルを受け取るエリアを提供します．"
        }
    });

storiesOf("岡田シリーズ", module)
    .add("WebRtcTester", () => ({
        components: {AudioOutputTester, AudioTester, NetworkTester},
        template: `
        <div style="display:flex;width:680px;">
            <NetworkTester/>
            <AudioOutputTester/>
            <AudioTester :isAudioEnabled="true" :stream="stream"/>
        </div>
        `,
        data()
        {
            return {
                stream: null
            };
        },
        methods: {
            action: action("button-clicked"),
            async created()
            {
                const stream = await DeviceStreamManager.getDeviceStream(false, true);
                this.stream = stream.mediaStream;
            }
        }
    }), {
        info: {
            summary: "WebRTCのデバイステストツールを提供します．"
        }
    });

storiesOf("岡田シリーズ", module)
    .add("SplitView", () => ({
        components: {SplitView},
        template: `
        <div style="display:flex;height:680px;background:rgba(0,0,0,0.2)">
            <SplitView class="strech">
                <template v-slot:slot1>
                    fwafawefawefawfwe
                </template>
                <template v-slot:slot2>
                    sgegsergserserg
                </template>
            </SplitView>
        </div>
        `
    }), {
        info: {
            summary: "リサイズ可能な分割ビューを提供します．"
        }
    });

storiesOf("岡田シリーズ", module)
    .add("DragableBox", () => ({
        components: {DragableBox},
        template: `
        <DragableBox >
            <div class="strech" style="background:rgb(72,72,72);">
                <video
                    autoplay
                    playsinline
                    muted="muted"
                    style="object-fit: cover;"
                    v-if="stream"
                    class="strech"
                    :srcObject.prop="stream"
                ></video>
            </div>
        </DragableBox>
        `,
        data()
        {
            return {stream: null};
        },
        async created()
        {
            try
            {
                const stream = await DeviceStreamManager.getDeviceStream();
                this.stream = stream.mediaStream;
            }
            catch
            {

            }
        }
    }), {
        info: {
            summary: "ドラッグで移動可能なボックスを提供します．"
        }
    });

storiesOf("岡田シリーズ", module)
    .add("ColorPalette", () => ({
        components: {ColorPalette, ColorPaletteFlyout},
        template: `
        <div >
            <!-- パレット -->
            <ColorPalette v-model="selected1"/>

            <!-- フライアウト -->
            <div class="mt-10 mb-3">カスタマイズも可能です</div>
            <ColorPaletteFlyout v-model="selected2">
                <template v-slot:activator="{ on }">
                    <v-btn
                        elevation="1"
                        :color="selected2"
                        dark
                        :style="{minWidth:buttonWidth+'px',width:buttonWidth+'px'}"
                        v-on="on"
                    >クリックしてね</v-btn>
                </template>
            </ColorPaletteFlyout >
        </div>
        `,
        data()
        {
            return {selected1: null, selected2: null};
        }
    }), {
        info: {
            summary: "色を選択するためのパレットを提供します．"
        }
    });
