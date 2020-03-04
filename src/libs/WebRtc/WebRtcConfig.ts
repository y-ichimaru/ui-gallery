import { getUrlParameter } from "../utilities/StringUtility";

// ビデオコーデック
const VIDEO_CODEC_TYPES = {
    VP8: "VP8",
    VP9: "VP9",
    H264: "H264"
};

// 画面共有通信のモード
export const SCREEN_SHARE_PEER_MODE: "sfu" | "mesh" | undefined = "mesh";
// ビデオチャットの通信モード
export const VIDEO_CHAT_PEER_MODE: "sfu" | "mesh" | undefined = getUrlParameter("sfu") === "1" ? "sfu" : "mesh";
// 会議可能な人数
export const MAX_MEMBER_COUNT = 5;
// 画面共有可能人数
export const MAX_SCREEN_SHARE_COUNT = 6;
// ビデオコーデック
export const VIDEO_CODEC = VIDEO_CODEC_TYPES.VP8;
// オーディオコーデック
export const AUDIO_CODEC = "Opus";

export const VIDEO_CHAT_SCREEN_WIDTH = 720;

export const VIDEO_CHAT_SCREEN_HEIGHT = 405;

/**
 * エラーの種類とエラーメッセージ
 */
export const MediaErrorMessages = {
    AbortError: "デバイスの使用を妨げる何らかの事象が発生しました",
    NotAllowedError: "デバイスの使用が許可されていません",
    NotFoundError: "使用できるデバイスが見つかりません",
    NotReadableError: "デバイスの読み取りができません",
    OverconstrainedError: "必要な仕様を満たすデバイスが見つかりません",
    SecurityError: "ユーザーメディアサポートが無効になっています",
    TypeError: "不正な呼び出しをしています",
    SourceUnavailableError: "デバイスの使用を妨げる何らかの事象が発生しました"
};
