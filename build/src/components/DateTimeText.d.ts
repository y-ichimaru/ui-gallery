import { Vue } from "vue-property-decorator";
/**
 * @summary 日付と時間をフォーマットし表示するコンポーネントを提供します.
 */
export default class DateTimeText extends Vue {
    text?: string;
    private readonly displayHtml;
}
