"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var _1 = require("./");
var AppStoreHelper = (function () {
    function AppStoreHelper() {
    }
    AppStoreHelper.getAppInfos = function (bundleID, countryCode) {
        return AppStoreHelper._getLookupFile(bundleID, countryCode)
            .then(_1.ResponseHelper.handleErrorStatus)
            .then(function (response) { return response.json(); })
            .then(AppStoreHelper._parseResource);
    };
    AppStoreHelper._getLookupFile = function (bundleID, countryCode) {
        return fetch(AppStoreHelper._getItunesLookupUrl(bundleID, countryCode));
    };
    AppStoreHelper._parseResource = function (resource) {
        if (resource.resultCount === 0)
            return null;
        return resource.results[0];
    };
    AppStoreHelper._getItunesLookupUrl = function (bundleId, countryCode) {
        var url = constants_1.AppStoreConstants.ITUNES_BASE_URL + "/lookup?bundleId=" + bundleId;
        if (countryCode) {
            url += "&hl=" + countryCode;
        }
        return url;
    };
    return AppStoreHelper;
}());
exports.AppStoreHelper = AppStoreHelper;
//# sourceMappingURL=app-store.helper.js.map