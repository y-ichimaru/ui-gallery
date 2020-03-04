import { Vue } from "vue-property-decorator";
export default class ColorPaletteFlyout extends Vue {
    colors: string[];
    value: string;
    buttonWidth: number;
    readonly itemSize: number;
    readonly column: number;
    readonly margin: number;
    readonly backgroundColor: string;
    private created;
}
