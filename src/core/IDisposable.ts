/**
 * @packageDocumentation
 * @module Core
 * @preferred
 */

/**
 * @description リソースを開放するロジックを提供
 */
export interface IDisposeable
{
    /**
     * リソースが解放済みかどうか
     */
    isDisposed: boolean;

    /**
     * リソースの開放
     */
    dispose(): void;
}
