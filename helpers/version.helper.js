"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VersionHelper = (function () {
    function VersionHelper() {
    }
    VersionHelper.isHigher = function (left, right) {
        return this._compareVersions(left, right) > 0;
    };
    VersionHelper.isEqualOrHigher = function (left, right) {
        return this._compareVersions(left, right) !== -1;
    };
    VersionHelper.isMajorUpdate = function (left, right) {
        return this._isIndexSectionHigher(left, right, 0);
    };
    VersionHelper.isMinorUpdate = function (left, right) {
        return this._isIndexSectionHigher(left, right, 1);
    };
    VersionHelper.isPatchUpdate = function (left, right) {
        return this._isIndexSectionHigher(left, right, 2);
    };
    VersionHelper.isRevisionUpdate = function (left, right) {
        return this._isIndexSectionHigher(left, right, 3);
    };
    VersionHelper._isIndexSectionHigher = function (left, right, index) {
        var a = left.split('.');
        var b = right.split('.');
        return (a.length > index && (b.length <= index || parseInt(a[index], 10) > parseInt(b[index], 10)));
    };
    VersionHelper._compareVersions = function (left, right) {
        var a = left.split('.');
        var b = right.split('.');
        for (var i = 0; i < Math.max(a.length, b.length); i++) {
            var aInt = parseInt(a[i], 10);
            var bInt = parseInt(b[i], 10);
            if ((a[i] && !b[i] && aInt > 0) || aInt > bInt)
                return 1;
            if ((b[i] && !a[i] && bInt > 0) || aInt < bInt)
                return -1;
        }
        return 0;
    };
    return VersionHelper;
}());
exports.VersionHelper = VersionHelper;
//# sourceMappingURL=version.helper.js.map