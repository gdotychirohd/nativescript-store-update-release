import { ConfirmOptions } from 'tns-core-modules/ui/dialogs';
import { IStoreUpdateConfig } from './interfaces';
export declare class StoreUpdateCommon {
    countryCode: any;
    private _majorUpdateAlertType;
    private _minorUpdateAlertType;
    private _patchUpdateAlertType;
    private _revisionUpdateAlertType;
    private _notifyNbDaysAfterRelease;
    private _onConfirmed;
    private _alertOptions;
    constructor(config?: IStoreUpdateConfig);
    getBundleId(): string;
    getLocalVersionNumber(): string;
    isEligibleForUpdate({version, currentVersionReleaseDate, minimumOsVersion, systemVersion}: {
        version: any;
        currentVersionReleaseDate: any;
        minimumOsVersion: any;
        systemVersion: any;
    }): boolean;
    setVersionAsSkipped(version: string): void;
    triggerAlertForUpdate(version: string): Promise<void>;
    getAlertTypeForVersion(currentAppStoreVersion: string): number;
    buildDialogOptions({skippable}?: {
        skippable?: boolean;
    }): ConfirmOptions;
    showAlertForUpdate(version: string): Promise<boolean>;
    triggerAlertIfEligible(result: any): void;
    private _init(config);
    private _isAppStoreVersionNewer(storeVersion);
    private _isCurrentVersionSkipped(currentAppStoreVersion);
    private _hasBeenReleasedLongerThanDelay(releaseDate);
    private _isUpdateCompatibleWithDeviceOS(deviceVersion, minimumRequiredOSVersion);
    private _getUpdateTypeForVersion(currentAppStoreVersion);
    private _getMessage(alertOptionKey, fallbackTranslateKey);
    private _hasValidAlertOptionEntry(key);
}
