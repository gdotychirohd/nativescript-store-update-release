"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var _1 = require("./");
var GooglePlayHelper = (function () {
    function GooglePlayHelper() {
    }
    GooglePlayHelper.getAppInfos = function (bundleId, countryCode) {
        return GooglePlayHelper._getAppPage(bundleId, countryCode)
            .then(_1.ResponseHelper.handleErrorStatus)
            .then(function (response) { return response.text(); })
            .then(GooglePlayHelper._parseResource);
    };
    GooglePlayHelper._getAppPage = function (bundleId, countryCode) {
        return fetch(GooglePlayHelper._getStoreAppUrl(bundleId, countryCode));
    };
    GooglePlayHelper._parseResource = function (page) {
        var infos = {};
        Object.keys(constants_1.GooglePlayConstants.REGEX).map(function (key) {
            var regEx = new RegExp(constants_1.GooglePlayConstants.REGEX[key].source, 'gm').exec(page);
            infos[key.toLowerCase()] = regEx ? regEx[1] : null;
        });
        return infos;
    };
    GooglePlayHelper._getStoreAppUrl = function (bundleId, countryCode) {
        var url = constants_1.GooglePlayConstants.PLAY_STORE_ROOT_WEB + "?id=" + bundleId;
        if (countryCode) {
            url += "&hl=" + countryCode;
        }
        return url;
    };
    return GooglePlayHelper;
}());
exports.GooglePlayHelper = GooglePlayHelper;
//# sourceMappingURL=google-play.helper.js.map