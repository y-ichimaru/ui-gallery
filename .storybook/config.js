import {configure, addDecorator, addParameters} from '@storybook/vue';
import {withKnobs} from '@storybook/addon-knobs';
import {withInfo} from 'storybook-addon-vue-info';
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import ThemeSelecterContainer from "../stories/ThemeSelecterContainer.vue";
import "../src/style.scss";
import colors from "vuetify/lib/util/colors";
import ja from "vuetify/src/locale/ja";

Vue.use(Vuetify, {
    iconfont: "mdi"
});
import "../src/core/logger";

import {themes} from '@storybook/theming';

// init font
(() =>
{
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    styleElement.innerHTML = ".v-application{font-family: 'nunito', '游ゴシック体', '游ゴシック', YuGothic, 'Yu Gothic M', sans-serif;font-weight: 500!important;} .v-card__subtitle, .v-card__text {font-weight: 500;}";
})();

addDecorator(() => ({
    vuetify: new Vuetify({
        theme: {
            options: {
                customProperties: true
            },
        },
        lang: {
            locales: {ja},
            current: "ja"
        },
        icons: {
            iconfont: "mdi"
        }
    }),
    components: {ThemeSelecterContainer},
    template: `
    <v-app>
        <ThemeSelecterContainer>
            <div class="pa-4 scroll" style="height:100vh;">
                <story/>
            </div>
        </ThemeSelecterContainer>
    </v-app>
    `
}));

addParameters({
    options: {
        /**
         * show addon panel as a vertical panel on the right
         * @type {Boolean} 
         */
        addonPanelInRight: true,
    },
});


// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
addDecorator(withInfo);
addDecorator(withKnobs);