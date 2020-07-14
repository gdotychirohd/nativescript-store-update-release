import { IGoogleStoreResult } from '../interfaces';
export declare class GooglePlayHelper {
    static getAppInfos(bundleId: any, countryCode?: any): Promise<IGoogleStoreResult>;
    private static _getAppPage(bundleId, countryCode?);
    private static _parseResource(page);
    private static _getStoreAppUrl(bundleId, countryCode?);
}
