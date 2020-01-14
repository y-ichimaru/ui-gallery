import {configure, addDecorator, addParameters} from '@storybook/vue';
import {withKnobs} from '@storybook/addon-knobs';
import {withInfo} from 'storybook-addon-vue-info';
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import ThemeSelecterContainer from "../src/stories/ThemeSelecterContainer.vue";

Vue.use(Vuetify, {
    iconfont: "mdi"
});

import {themes} from '@storybook/theming';

addDecorator(() => ({
    vuetify: new Vuetify(),
    components: {ThemeSelecterContainer},
    template: `
    <v-app>
        <ThemeSelecterContainer>
            <div class="pa-8">
                <story/>
            </div>
        </ThemeSelecterContainer>
    </v-app>`
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
configure(require.context('../src/stories', true, /\.stories\.js$/), module);
addDecorator(withInfo);
addDecorator(withKnobs);