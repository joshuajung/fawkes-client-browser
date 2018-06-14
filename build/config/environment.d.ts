export declare const environments: {
    development: {
        enableReduxLogger: boolean;
        logApiRequests: boolean;
        logMissingLanguage: boolean;
        disableRehydration: boolean;
        reduxLoggerBlacklist: any[];
    };
    production: {
        enableReduxLogger: boolean;
        logApiRequests: boolean;
        logMissingLanguage: boolean;
        disableRehydration: boolean;
        reduxLoggerBlacklist: any[];
    };
};
export declare const environment: typeof environments.development;
