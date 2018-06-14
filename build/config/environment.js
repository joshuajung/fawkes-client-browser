"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const currentEnvironment = process.env.NODE_ENV;
exports.environments = {
    development: {
        enableReduxLogger: true,
        logApiRequests: true,
        logMissingLanguage: true,
        disableRehydration: false,
        reduxLoggerBlacklist: []
    },
    production: {
        enableReduxLogger: false,
        logApiRequests: false,
        logMissingLanguage: false,
        disableRehydration: false,
        reduxLoggerBlacklist: []
    }
};
exports.environment = exports.environments[currentEnvironment];
//# sourceMappingURL=environment.js.map