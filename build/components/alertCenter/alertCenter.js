"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../helpers/componentEnhancer");
const alert_1 = require("./alert");
class AlertCenter extends React.Component {
    render() {
        return (React.createElement("div", { className: "alert-center" },
            React.createElement("section", null, this.props.alerts
                .slice(0, 1)
                .map(alert => React.createElement(alert_1.default, { alert: alert, key: alert.id })))));
    }
}
const stateMappings = (s, props) => ({
    alerts: s.application.alerts
        .filter(a => !a.dismissed)
        .sort((a, b) => a.created.getTime() - b.created.getTime())
});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AlertCenter, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=alertCenter.js.map