declare const _default: {
    name: string;
    props: {
        stream: {};
        isEnabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        indicatorCount: {
            type: NumberConstructor;
            default: number;
        };
        height: {
            type: NumberConstructor;
            default: number;
        };
        span: {
            type: NumberConstructor;
            default: number;
        };
        color: {
            type: StringConstructor;
            default: string;
        };
        emptyColor: {
            type: StringConstructor;
            default: string;
        };
    };
    data(): {
        intervalId: number;
        audioContext: null;
    };
    watch: {
        isEnabled(value: any): void;
        stream(value: any): void;
    };
    methods: {
        begin(): void;
        kill(): void;
        createAnalyzer(stream: any): any;
    };
    mounted(): void;
    beforeDestroy(): void;
};
export default _default;
