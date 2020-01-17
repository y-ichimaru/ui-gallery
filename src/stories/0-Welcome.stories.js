import {linkTo} from "@storybook/addon-links";
import {storiesOf} from "@storybook/vue";
import {withInfo} from "storybook-addon-vue-info";
import {action} from "@storybook/addon-actions";

storiesOf("岡田シリーズ", module)
    .add("岡田のボタン", () => ({
        components: {},
        template: `
        <v-btn>aaaa</v-btn>
        `,
        methods: {action: action("button-clicked")}
    }), {
        info: {
            summary: "岡田の作ったボタンです。Vuetifyでできています。"
        }
    });
