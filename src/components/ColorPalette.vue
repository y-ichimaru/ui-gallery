<template>
    <v-menu bottom origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on }">
            <v-btn
                elevation="1"
                :color="value"
                dark
                :style="{minWidth:buttonWidth+'px',width:buttonWidth+'px'}"
                v-on="on"
            ></v-btn>
        </template>

        <v-item-group mandatory :value="value">
            <v-card :style="{background:backgroundColor}">
                <div
                    class="d-flex flex-wrap"
                    :style="{width:((itemSize+margin)*column+margin*2).toString()+'px',padding:margin+'px'}"
                >
                    <v-item
                        v-slot:default="{ active, toggle }"
                        v-for="(c,key) in colors"
                        :key="key"
                    >
                        <div
                            v-ripple
                            class="palette"
                            :class="value===c?'active':''"
                            @click="$emit('input',c)"
                            :style="{background:c,height:itemSize+'px',width:itemSize+'px'}"
                            style="margin:1px;"
                        ></div>
                    </v-item>
                </div>
            </v-card>
        </v-item-group>
    </v-menu>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

const defaultColors = [
    "#f44336",
    "#FF9800",
    "#ff9800",
    "#ffeb3b",
    "#CDDC39",
    "#8BC34A",
    "#4caf50",
    "#009688",
    "#00bcd4",
    "#03A9F4",
    "#2196f3",
    "#4527A0",
    "#673AB7",
    "#9c27b0",
    "#ec407a",
    "#909090",
    "#0a0a0a",
    "#FFFFFF"
];

@Component
export default class ColorPalette extends Vue
{
    @Prop({ default: () => defaultColors }) colors!: string[];
    @Prop({ default: defaultColors[0] }) value!: string;
    @Prop({ default: 36 }) buttonWidth!: number;
    @Prop({ default: 48 }) readonly itemSize!: number;
    @Prop({ default: 6 }) readonly column!: number;
    @Prop({ default: 2 }) readonly margin!: number;
    @Prop({ default: "#2b2b2b" }) readonly backgroundColor!: string;
    private created()
    {
        if (this.value)
        {
            this.$emit("input", this.value);
            this.$forceUpdate();
        }
        else
        {
            this.$emit("input", this.colors[0]);
            this.$forceUpdate();
        }
    }
}
</script>
<style scoped>
.active::after {
    background: #ff717100 !important;
    /* margin-left: -22px!@/libsant; */
    z-index: 333;
    /* position: absolute; */
    width: 100%;
    height: 100%;
    padding: 0;
    /* position: absolute; */
    /* top: 0; */
    /* bottom: 0; */
    font-size: 36px;
    padding: 6px;
    color: #00000049;
    content: "●";
}

.palette:hover {
    filter: brightness(90%);
}
</style>
