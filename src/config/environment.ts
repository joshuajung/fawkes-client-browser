const currentEnvironment = process.env.NODE_ENV

export const environments = {
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
}

export const environment: typeof environments.development =
  environments[currentEnvironment]
