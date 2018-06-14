"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const el = require("../../helpers/eventLibrary");
exports.defaultState = {
    accessToken: undefined,
    userInfo: undefined,
    language: undefined
};
exports.reducer = (state = exports.defaultState, event) => {
    switch (event.type) {
        case el.EventType.LanguageChanged:
            return Object.assign({}, state, { language: event.newLanguage });
        case el.EventType.RegisterRequestEnded:
            if (!event.result.error && event.result.body.code === "USER_CREATED") {
                return Object.assign({}, state, { accessToken: event.result.body.accessToken, userInfo: event.result.body.userInfo });
            }
        case el.EventType.LogInRequestEnded:
            if (!event.result.error &&
                event.result.body.code === "LOGIN_SUCCESSFUL") {
                return Object.assign({}, state, { accessToken: event.result.body.accessToken, userInfo: event.result.body.userInfo });
            }
            else {
                return state;
            }
        case el.EventType.LogOutRequestEnded:
            return Object.assign({}, state, { accessToken: exports.defaultState.accessToken });
        default:
            return state;
    }
};
//# sourceMappingURL=user.js.map