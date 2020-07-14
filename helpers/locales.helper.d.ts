export declare class LocalesHelper {
    static currentLang: string;
    private static _defaultLang;
    private static _translations;
    static translate(key: string): string;
    static changeLang(key: string): void;
}
