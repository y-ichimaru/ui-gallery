import "./style.scss";
declare enum LogType {
    Log = 1,
    Error = 2,
    Warning = 2
}
declare interface Logger {
    onTraceHandler: (log: unknown, type?: LogType) => void;
    trace(content: any, type: LogType): void;
    onErrorHandler: (log: unknown, type?: LogType) => void;
    error(content: any, type?: LogType): void;
    onInfoHandler: (log: unknown, type?: LogType) => void;
    info(content: any, type?: LogType): void;
    onLogHandler: (log: unknown, type?: LogType) => void;
    log(content: any, type?: LogType): void;
    onWarnHandler: (log: unknown, type?: LogType) => void;
    warn(content: any, type?: LogType): void;
}
declare global {
    var logger: Logger;
}
export * from "./components";
export * from "./core";
export * from "./rtc";
