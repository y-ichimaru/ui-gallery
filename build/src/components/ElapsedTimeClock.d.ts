declare const _default: {
    name: string;
    props: {
        /**
         * [date 表示するDateオブジェクト]
         * @type {Date}
         */
        date: {
            type: DateConstructor;
            require: boolean;
            default: () => Date;
        };
    };
    data(): {
        h: number;
        m: number;
        s: number;
        d: number;
        intervalId: number;
    };
    mounted(): void;
    beforeDestroy(): void;
};
export default _default;
