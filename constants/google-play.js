"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePlayConstants = {
    PLAY_STORE_PACKAGE_NOT_PUBLISHED_IDENTIFIER: "\n    We're sorry, the requested URL was not found on this server.\n  ",
    PLAY_STORE_ROOT_WEB: "https://play.google.com/store/apps/details",
    REGEX: {
        DATE: /Updated<(?:.|\n)?>(\w*\s\d{1,2},\s\d{4})/gm,
        OS: /Requires\sAndroid<(?:.|\n)?>(\d{1,3}(.\d{1,3}(.\d{1,3})?)?)/gm,
        VERSION: /Current\sVersion<(?:.|\n)*?>(\d{1,3}(.\d{1,3}(.\d{1,3})?)?)/gm
    },
};
//# sourceMappingURL=google-play.js.map