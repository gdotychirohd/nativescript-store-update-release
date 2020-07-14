"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var app = require("tns-core-modules/application");
var utils = require("tns-core-modules/utils/utils");
var helpers_1 = require("./helpers");
var store_update_common_1 = require("./store-update.common");
__export(require("./constants"));
__export(require("./helpers"));
app.on(app.resumeEvent, function () {
    StoreUpdate.checkForUpdate();
});
var StoreUpdate = (function () {
    function StoreUpdate() {
    }
    StoreUpdate.init = function (config) {
        if (StoreUpdate._common)
            throw new Error('NS Store Update already configured');
        StoreUpdate._common = new store_update_common_1.StoreUpdateCommon(__assign({}, config, { onConfirmed: StoreUpdate._openStore.bind(StoreUpdate) }));
    };
    StoreUpdate.checkForUpdate = function () {
        if (!StoreUpdate._common)
            return;
        helpers_1.GooglePlayHelper.getAppInfos(StoreUpdate._common.getBundleId())
            .then(StoreUpdate._extendResults)
            .then(StoreUpdate._common.triggerAlertIfEligible.bind(StoreUpdate._common))
            .catch(console.error);
    };
    StoreUpdate._openStore = function () {
        var storeUrl = "market://details?id=" + StoreUpdate._common.getBundleId();
        utils.openUrl(storeUrl);
    };
    StoreUpdate._extendResults = function (result) {
        return {
            currentVersionReleaseDate: result.date,
            minimumOsVersion: result.os,
            systemVersion: android.os.Build.VERSION.RELEASE,
            version: result.version,
        };
    };
    return StoreUpdate;
}());
exports.StoreUpdate = StoreUpdate;
//# sourceMappingURL=store-update.android.js.map