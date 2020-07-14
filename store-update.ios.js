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
var StoreUpdate = (function () {
    function StoreUpdate() {
    }
    StoreUpdate.init = function (config) {
        if (StoreUpdate._common)
            throw new Error('NS Store Update already configured');
        StoreUpdate._common = new store_update_common_1.StoreUpdateCommon(__assign({}, config, { onConfirmed: StoreUpdate._openStore.bind(StoreUpdate) }));
        app.on(app.resumeEvent, function (args) {
            StoreUpdate.checkForUpdate();
        });
    };
    StoreUpdate.checkForUpdate = function () {
        if (!StoreUpdate._common)
            return;
        helpers_1.AppStoreHelper.getAppInfos(StoreUpdate._common.getBundleId(), StoreUpdate._common.countryCode)
            .then(StoreUpdate._extendResults)
            .then(StoreUpdate._common.triggerAlertIfEligible.bind(StoreUpdate._common))
            .catch(function (e) { return console.error(e); });
    };
    StoreUpdate._openStore = function () {
        utils.openUrl(NSURL.URLWithString("itms-apps" + StoreUpdate._trackViewUrl.slice(5)).absoluteString);
    };
    StoreUpdate._extendResults = function (result) {
        StoreUpdate._trackViewUrl = result.trackViewUrl;
        return __assign({}, result, { systemVersion: UIDevice.currentDevice.systemVersion });
    };
    return StoreUpdate;
}());
exports.StoreUpdate = StoreUpdate;
//# sourceMappingURL=store-update.ios.js.map