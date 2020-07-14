"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseHelper = (function () {
    function ResponseHelper() {
    }
    ResponseHelper.handleErrorStatus = function (response) {
        if (response.status >= 400) {
            throw new Error("Unexpected HTTP status code (" + response.status + ")");
        }
        return response;
    };
    return ResponseHelper;
}());
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=response.helper.js.map