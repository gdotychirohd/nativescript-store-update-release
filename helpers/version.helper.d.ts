export declare class VersionHelper {
    static isHigher(left: string, right: string): boolean;
    static isEqualOrHigher(left: string, right: string): boolean;
    static isMajorUpdate(left: string, right: string): boolean;
    static isMinorUpdate(left: string, right: string): boolean;
    static isPatchUpdate(left: string, right: string): boolean;
    static isRevisionUpdate(left: string, right: string): boolean;
    private static _isIndexSectionHigher(left, right, index);
    private static _compareVersions(left, right);
}
