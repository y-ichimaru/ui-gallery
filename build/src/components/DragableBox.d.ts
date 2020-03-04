declare const _default: {
    name: string;
    computed: {};
    props: {
        fixed: {
            type: BooleanConstructor;
            default: boolean;
            require: boolean;
        };
        top: {
            type: StringConstructor;
            require: boolean;
            default: string;
        };
        bottom: {
            type: StringConstructor;
            require: boolean;
            default: string;
        };
        right: {
            type: StringConstructor;
            require: boolean;
            default: string;
        };
        left: {
            type: StringConstructor;
            require: boolean;
            default: string;
        };
        width: {
            type: StringConstructor;
            require: boolean;
            default: string;
        };
        height: {
            type: StringConstructor;
            require: boolean;
            default: string;
        };
        closedHeaderHeight: {
            type: StringConstructor;
            require: boolean;
            default: string;
        };
        openedHeaderHeight: {
            type: StringConstructor;
            require: boolean;
            default: string;
        };
        headerColor: {
            type: StringConstructor;
            require: boolean;
            default: string;
        };
    };
    data(): {
        isHeaderOpend: boolean;
        dragableBox: null;
        isFixed: boolean;
        isDragging: boolean;
    };
    methods: {
        onBeginMove(e: any): void;
        applyVideoFixed(): void;
        getRect(): any;
    };
    created(): void;
    mounted(): void;
};
export default _default;
