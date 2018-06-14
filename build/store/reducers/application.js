"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const el = require("../../helpers/eventLibrary");
const stateTools_1 = require("../../helpers/stateTools");
exports.defaultState = {
    rehydrationComplete: false,
    alerts: []
};
exports.reducer = (state = exports.defaultState, event) => {
    switch (event.type) {
        case el.EventType.PersistRehydrate:
            return Object.assign({}, state, { rehydrationComplete: true });
        case el.EventType.AlertPresented:
            return Object.assign({}, state, { alerts: stateTools_1.replaceInArray(state.alerts, alert => alert.id === event.alert.id, alert => event.alert, event.alert) });
        case el.EventType.AlertDismissed:
            return Object.assign({}, state, { alerts: stateTools_1.replaceInArray(state.alerts, a => a.id === event.alertId, a => {
                    a.dismissed = true;
                    return a;
                }) });
        default:
            return state;
    }
};
//# sourceMappingURL=application.js.map