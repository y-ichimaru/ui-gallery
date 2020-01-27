import {linkTo} from "@storybook/addon-links";
import {storiesOf} from "@storybook/vue";
import {withInfo} from "storybook-addon-vue-info";
import {action} from "@storybook/addon-actions";

import ItemWrapGrid from "../components/ItemWrapGrid.vue";
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
