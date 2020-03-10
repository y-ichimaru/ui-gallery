/**
 * @packageDocumentation
 * @module Core
 * @preferred
 */

enum LogType
{
    Log = 1 << 0,
    Error = 1 << 1,
    Warning = 1 << 1,
}

export class Logger
{
    public onTraceHandler: (log: unknown, type: LogType) => void = (log, type) => console.trace(log);
    public trace(content: any, type = LogType.Log): void
    {
        this.onTraceHandler(content, type);
    }

    public onErrorHandler: (log: unknown, type: LogType) => void = (log, type) => console.error(log);
    public error(content: any, type = LogType.Log): void
    {
        this.onErrorHandler(content, type);
    }

    public onInfoHandler: (log: unknown, type: LogType) => void = (log, type) => console.info(log);
    public info(content: any, type = LogType.Log): void
    {
        this.onInfoHandler(content, type);
    }

    public onLogHandler: (log: unknown, type: LogType) => void = (log, type) => console.log(log);
    public log(content: any, type = LogType.Log): void
    {
        this.onLogHandler(content, type);
    }

    public onWarnHandler: (log: unknown, type: LogType) => void = (log, type) => console.warn(log);
    public warn(content: any, type = LogType.Log): void
    {
        this.onWarnHandler(content, type);
    }
}

(globalThis as any).logger = new Logger();
