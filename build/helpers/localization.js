"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enUs_1 = require("../languages/enUs");
const configuration = require("../config");
exports.availableLanguages = {
    "en-us": enUs_1.default
};
function lookup(selector, language, availableLanguages, fallbackLanguage) {
    const realSelector = selector;
    if (typeof availableLanguages[language] === "undefined") {
        language = fallbackLanguage;
    }
    try {
        const lookUpResult = realSelector(availableLanguages[language]);
        return lookUpResult;
    }
    catch (error) {
        if (configuration.environment.logMissingLanguage)
            console.warn("Missing localization: " +
                selector.toString() +
                " in language " +
                language +
                ".");
        try {
            const lookUpResultFallback = realSelector(availableLanguages[fallbackLanguage]);
            return lookUpResultFallback;
        }
        catch (error) {
            return selector.toString();
        }
    }
}
exports.lookup = lookup;
//# sourceMappingURL=localization.js.map