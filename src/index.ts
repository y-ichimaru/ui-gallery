import * as Components from "./components";
import * as Core from "./core";
import * as Rtc from "./rtc";

declare enum LogType
{
    Log = 1 << 0,
    Error = 1 << 1,
    Warning = 1 << 1,
}

export interface Logger
{
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

declare global
{
    var logger: Logger;
}

export
{
    Components,
    Core,
    Rtc
};
