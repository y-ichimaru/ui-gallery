export declare const SCREEN_SHARE_PEER_MODE: "sfu" | "mesh" | undefined;
export declare const VIDEO_CHAT_PEER_MODE: "sfu" | "mesh" | undefined;
export declare const MAX_MEMBER_COUNT = 5;
export declare const MAX_SCREEN_SHARE_COUNT = 6;
export declare const VIDEO_CODEC: string;
export declare const AUDIO_CODEC = "Opus";
export declare const VIDEO_CHAT_SCREEN_WIDTH = 720;
export declare const VIDEO_CHAT_SCREEN_HEIGHT = 405;
/**
 * エラーの種類とエラーメッセージ
 */
export declare const MediaErrorMessages: {
    AbortError: string;
    NotAllowedError: string;
    NotFoundError: string;
    NotReadableError: string;
    OverconstrainedError: string;
    SecurityError: string;
    TypeError: string;
    SourceUnavailableError: string;
};
