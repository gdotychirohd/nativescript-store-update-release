"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalesHelper = (function () {
    function LocalesHelper() {
    }
    LocalesHelper.translate = function (key) {
        var translation = LocalesHelper._translations[LocalesHelper.currentLang][key];
        if (!translation) {
            console.error("Can't find translation for " + key + " in " + LocalesHelper.currentLang);
            return '';
        }
        return translation;
    };
    LocalesHelper.changeLang = function (key) {
        key = key.toLowerCase();
        var langKey = LocalesHelper._translations[key] ? key : key.split('-')[0];
        if (!LocalesHelper._translations[langKey]) {
            LocalesHelper.currentLang = LocalesHelper._defaultLang;
            console.error("\n        The lang " + langKey + " is not yet supporter by the plugin,\n        but you can contribute it on https://github.com/chronogolf/nativescript-store-update\n      ");
            return;
        }
        LocalesHelper.currentLang = langKey;
    };
    return LocalesHelper;
}());
LocalesHelper.currentLang = 'en';
LocalesHelper._defaultLang = 'en';
LocalesHelper._translations = {
    en: require('../i18n/en.json'),
    fr: require('../i18n/fr.json'),
    es: require('../i18n/es.json')
};
exports.LocalesHelper = LocalesHelper;
//# sourceMappingURL=locales.helper.js.map