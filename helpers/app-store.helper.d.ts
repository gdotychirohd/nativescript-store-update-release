import { IAppleStoreResult } from '../interfaces';
export declare class AppStoreHelper {
    static getAppInfos(bundleID: any, countryCode?: any): Promise<IAppleStoreResult>;
    private static _getLookupFile(bundleID, countryCode?);
    private static _parseResource(resource);
    private static _getItunesLookupUrl(bundleId, countryCode?);
}
