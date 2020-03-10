
<template>
    <v-dialog v-model="isShow" max-width="290">
        <v-card v-if="context">
            <v-card-title class="headline">{{ context.title }}</v-card-title>
            <v-card-text>{{ context.text }}</v-card-text>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn text color="black" @click="close(false)">
                    <v-icon>mdi-close</v-icon>
                    {{context.cancelText}}
                </v-btn>
                <v-btn color="primary" @click="close(true)" text>
                    <v-icon>mdi-check</v-icon>
                    {{context.okText}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
/**
 * @packageDocumentation
 * @module Components
 * @preferred
 */
import { Vue, Prop, Component, Mixins } from "vue-property-decorator";
import DialogBase from "./DialogBase.vue";

/**
 * @summary 確認用ダイアログを提供します.
 */
@Component
export default class ConfirmDialog extends Mixins(DialogBase)
{
}
</script>
