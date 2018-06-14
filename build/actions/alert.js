"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const el = require("../helpers/eventLibrary");
const config = require("../config");
exports.request = (alert) => dispatch => {
    if (alert.autoDismissTimeout !== null && isNaN(alert.autoDismissTimeout)) {
        alert.autoDismissTimeout = config.ui.defaultAlertAutoDismissTimeout;
    }
    dispatch(present(alert));
    if (alert.autoDismissTimeout !== null) {
        window.setTimeout(() => {
            dispatch(dismissStale());
        }, alert.autoDismissTimeout + 100);
    }
};
const present = (alert) => ({
    type: el.EventType.AlertPresented,
    alert: Object.assign({}, alert, { lastUpdated: new Date() })
});
exports.dismiss = (id) => ({
    type: el.EventType.AlertDismissed,
    alertId: id
});
const dismissStale = () => (dispatch, getState) => {
    const staleAlerts = getState().application.alerts.filter(alert => alert.autoDismissTimeout &&
        alert.lastUpdated.getTime() + alert.autoDismissTimeout < new Date().getTime() &&
        !alert.dismissed);
    staleAlerts.forEach(staleAlert => dispatch(exports.dismiss(staleAlert.id)));
};
//# sourceMappingURL=alert.js.map