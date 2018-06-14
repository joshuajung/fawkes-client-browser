"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_persist_1 = require("redux-persist");
const redux_thunk_1 = require("redux-thunk");
const redux_logger_1 = require("redux-logger");
const config = require("../config");
const user = require("./reducers/user");
const application = require("./reducers/application");
const ui = require("./reducers/ui");
const advancedRecordList = require("./reducers/advancedRecordList");
const advancedRecordDetails = require("./reducers/advancedRecordDetails");
const advancedForm = require("./reducers/advancedForm");
const advancedTable = require("./reducers/advancedTable");
const reducers = (moduleReducer) => redux_1.combineReducers({
    application: application.reducer,
    ui: ui.reducer,
    user: user.reducer,
    advancedRecordList: advancedRecordList.reducer,
    advancedRecordDetails: advancedRecordDetails.reducer,
    advancedForm: advancedForm.reducer,
    advancedTable: advancedTable.reducer,
    module: moduleReducer
});
function configureStore(moduleReducer) {
    let middlewareToApply = [];
    middlewareToApply.push(redux_thunk_1.default);
    if (config.environment.enableReduxLogger)
        middlewareToApply.push(redux_logger_1.createLogger({
            predicate: (getState, action) => {
                return (config.environment.reduxLoggerBlacklist.indexOf(action.type) === -1);
            }
        }));
    const storeMiddleware = redux_1.applyMiddleware(...middlewareToApply);
    let enhancersToApply = [];
    enhancersToApply.push(storeMiddleware);
    if (!config.environment.disableRehydration)
        enhancersToApply.push(redux_persist_1.autoRehydrate());
    const store = redux_1.createStore(reducers(moduleReducer), {}, redux_1.compose(...enhancersToApply));
    if (!config.environment.disableRehydration) {
        redux_persist_1.persistStore(store, {
            whitelist: ["user"]
        });
    }
    return store;
}
exports.configureStore = configureStore;
//# sourceMappingURL=store.js.map