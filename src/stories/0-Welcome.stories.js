import {linkTo} from "@storybook/addon-links";
import {storiesOf} from "@storybook/vue";
import {withInfo} from "storybook-addon-vue-info";
import {action} from "@storybook/addon-actions";

import {Okada} from "../index.ts";

storiesOf("岡田シリーズ", module)
    .add("岡田のボタン", () => ({
        components: {Okada},
        template: `
        <Okada/>
        `,
        methods: {action: action("button-clicked")}
    }), {
        info: {
            summary: "岡田の作ったボタンです。Vuetifyでできています。"
        }
    });
