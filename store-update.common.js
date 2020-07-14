"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('./assign.helper');
var moment = require("moment");
var appSettings = require("tns-core-modules/application-settings");
var platform_1 = require("tns-core-modules/platform");
var nativescript_appversion_1 = require("nativescript-appversion");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var constants_1 = require("./constants");
var helpers_1 = require("./helpers");
var LAST_VERSION_SKIPPED_KEY = 'lastVersionSkipped';
var defaultConfig = {
    countryCode: 'en',
    majorUpdateAlertType: constants_1.AlertTypesConstants.FORCE,
    minorUpdateAlertType: constants_1.AlertTypesConstants.OPTION,
    notifyNbDaysAfterRelease: 1,
    patchUpdateAlertType: constants_1.AlertTypesConstants.NONE,
    revisionUpdateAlertType: constants_1.AlertTypesConstants.NONE,
    alertOptions: null,
    onConfirmed: function () { return console.log('User confirmed!'); },
};
var StoreUpdateCommon = (function () {
    function StoreUpdateCommon(config) {
        if (config)
            this._init(config);
    }
    StoreUpdateCommon.prototype.getBundleId = function () {
        return nativescript_appversion_1.getAppIdSync();
    };
    StoreUpdateCommon.prototype.getLocalVersionNumber = function () {
        return nativescript_appversion_1.getVersionNameSync() + "." + nativescript_appversion_1.getVersionCodeSync();
    };
    StoreUpdateCommon.prototype.isEligibleForUpdate = function (_a) {
        var version = _a.version, currentVersionReleaseDate = _a.currentVersionReleaseDate, minimumOsVersion = _a.minimumOsVersion, systemVersion = _a.systemVersion;
        if (!this._isUpdateCompatibleWithDeviceOS(systemVersion, minimumOsVersion)) {
            return false;
        }
        if (!this._hasBeenReleasedLongerThanDelay(currentVersionReleaseDate))
            return false;
        if (this._isCurrentVersionSkipped(version))
            return false;
        if (!this._isAppStoreVersionNewer(version))
            return false;
        return true;
    };
    StoreUpdateCommon.prototype.setVersionAsSkipped = function (version) {
        appSettings.setString(LAST_VERSION_SKIPPED_KEY, version);
    };
    StoreUpdateCommon.prototype.triggerAlertForUpdate = function (version) {
        var _this = this;
        return this.showAlertForUpdate(version).then(function (confirmed) {
            if (confirmed)
                _this._onConfirmed();
            else
                _this.setVersionAsSkipped(version);
        });
    };
    StoreUpdateCommon.prototype.getAlertTypeForVersion = function (currentAppStoreVersion) {
        var updateType = this._getUpdateTypeForVersion(currentAppStoreVersion);
        switch (updateType) {
            case constants_1.UpdateTypesConstants.MAJOR: {
                return this._majorUpdateAlertType;
            }
            case constants_1.UpdateTypesConstants.MINOR: {
                return this._minorUpdateAlertType;
            }
            case constants_1.UpdateTypesConstants.PATCH: {
                return this._patchUpdateAlertType;
            }
            case constants_1.UpdateTypesConstants.REVISION: {
                return this._revisionUpdateAlertType;
            }
            default:
                return constants_1.AlertTypesConstants.OPTION;
        }
    };
    StoreUpdateCommon.prototype.buildDialogOptions = function (_a) {
        var _b = (_a === void 0 ? {} : _a).skippable, skippable = _b === void 0 ? true : _b;
        var options = {
            title: this._getMessage('title', 'ALERT_TITLE'),
            message: this._getMessage('message', 'ALERT_MESSAGE'),
            neutralButtonText: null,
            okButtonText: this._getMessage('updateButton', 'ALERT_UPDATE_BUTTON'),
        };
        if (skippable) {
            options = __assign({}, options, { neutralButtonText: this._getMessage('skipButton', 'ALERT_SKIP_BUTTON') });
        }
        return options;
    };
    StoreUpdateCommon.prototype.showAlertForUpdate = function (version) {
        var alertType = this.getAlertTypeForVersion(version);
        switch (alertType) {
            case constants_1.AlertTypesConstants.FORCE: {
                var options = this.buildDialogOptions({ skippable: false });
                return dialogs_1.confirm(options);
            }
            case constants_1.AlertTypesConstants.OPTION: {
                var options = this.buildDialogOptions();
                return dialogs_1.confirm(options);
            }
            default:
                return Promise.reject(null);
        }
    };
    StoreUpdateCommon.prototype.triggerAlertIfEligible = function (result) {
        if (this.isEligibleForUpdate(result)) {
            this.triggerAlertForUpdate(result.version);
        }
    };
    StoreUpdateCommon.prototype._init = function (config) {
        var conf = __assign({}, defaultConfig, config);
        this._majorUpdateAlertType = conf.majorUpdateAlertType;
        this._minorUpdateAlertType = conf.minorUpdateAlertType;
        this._patchUpdateAlertType = conf.patchUpdateAlertType;
        this._revisionUpdateAlertType = conf.revisionUpdateAlertType;
        this._notifyNbDaysAfterRelease = conf.notifyNbDaysAfterRelease;
        this.countryCode = conf.countryCode;
        this._onConfirmed = conf.onConfirmed;
        this._alertOptions = conf.alertOptions;
        helpers_1.LocalesHelper.changeLang(platform_1.device.language);
    };
    StoreUpdateCommon.prototype._isAppStoreVersionNewer = function (storeVersion) {
        if (storeVersion === null)
            return false;
        return helpers_1.VersionHelper.isHigher(storeVersion, this.getLocalVersionNumber());
    };
    StoreUpdateCommon.prototype._isCurrentVersionSkipped = function (currentAppStoreVersion) {
        var lastVersionSkipped = appSettings.getString(LAST_VERSION_SKIPPED_KEY);
        return currentAppStoreVersion === lastVersionSkipped;
    };
    StoreUpdateCommon.prototype._hasBeenReleasedLongerThanDelay = function (releaseDate) {
        if (releaseDate === null)
            return false;
        var daysSinceRelease = moment().diff(moment(new Date(releaseDate)), 'days');
        if (daysSinceRelease < this._notifyNbDaysAfterRelease) {
            console.log("Your app has been released for " + daysSinceRelease + " days,\n        but we cannot prompt the user until\n        " + this._notifyNbDaysAfterRelease + " days have passed.");
        }
        return daysSinceRelease >= this._notifyNbDaysAfterRelease;
    };
    StoreUpdateCommon.prototype._isUpdateCompatibleWithDeviceOS = function (deviceVersion, minimumRequiredOSVersion) {
        if (minimumRequiredOSVersion === null)
            return true;
        var isCompatible = helpers_1.VersionHelper.isEqualOrHigher(deviceVersion, minimumRequiredOSVersion);
        if (!isCompatible)
            console.log("Device is incompatible with installed version of iOS.");
        return isCompatible;
    };
    StoreUpdateCommon.prototype._getUpdateTypeForVersion = function (currentAppStoreVersion) {
        var localVersion = this.getLocalVersionNumber();
        if (helpers_1.VersionHelper.isMajorUpdate(currentAppStoreVersion, localVersion)) {
            return constants_1.UpdateTypesConstants.MAJOR;
        }
        if (helpers_1.VersionHelper.isMinorUpdate(currentAppStoreVersion, localVersion)) {
            return constants_1.UpdateTypesConstants.MINOR;
        }
        if (helpers_1.VersionHelper.isPatchUpdate(currentAppStoreVersion, localVersion)) {
            return constants_1.UpdateTypesConstants.PATCH;
        }
        if (helpers_1.VersionHelper.isRevisionUpdate(currentAppStoreVersion, localVersion)) {
            return constants_1.UpdateTypesConstants.REVISION;
        }
        return -1;
    };
    StoreUpdateCommon.prototype._getMessage = function (alertOptionKey, fallbackTranslateKey) {
        if (this._hasValidAlertOptionEntry(alertOptionKey))
            return this._alertOptions[alertOptionKey];
        return helpers_1.LocalesHelper.translate(fallbackTranslateKey);
    };
    StoreUpdateCommon.prototype._hasValidAlertOptionEntry = function (key) {
        if (!this._alertOptions)
            return false;
        return this._alertOptions.hasOwnProperty(key) && this._alertOptions[key] !== '';
    };
    return StoreUpdateCommon;
}());
exports.StoreUpdateCommon = StoreUpdateCommon;
//# sourceMappingURL=store-update.common.js.map