export interface IAppleStoreResult {
    bundleId: string;
    trackId: number;
    version: string;
    minimumOsVersion: string;
    currentVersionReleaseDate: string;
    trackViewUrl: string;
}
export interface IAppleStoreInfos {
    resultCount: number;
    results: IAppleStoreResult[];
}
