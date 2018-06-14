"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../helpers/componentEnhancer");
const alertActions = require("../../actions/alert");
const icon_1 = require("../reusable/icon");
class Alert extends React.Component {
    render() {
        let articleClasses = ["alert"];
        switch (this.props.alert.type) {
            case ce.stl.AlertType.Success:
                articleClasses.push("is-success");
                break;
            case ce.stl.AlertType.Error:
                articleClasses.push("is-danger");
                break;
            case ce.stl.AlertType.Warning:
                articleClasses.push("is-warning");
                break;
            case ce.stl.AlertType.Info:
                articleClasses.push("is-info");
                break;
        }
        return (React.createElement("article", { className: articleClasses.join(" ") },
            React.createElement("div", { className: "alert-title" },
                React.createElement("p", null,
                    this.props.alert.progress && this.props.alert.progress < 1 ? (React.createElement(icon_1.default, { icon: "spinner", spin: true })) : null,
                    " ",
                    this.props.cl(this.props.alert.title)),
                React.createElement("button", { className: "alert-dismiss", onClick: e => {
                        this.props.dismissAlert(this.props.alert.id);
                    } })),
            React.createElement("div", { className: "alert-body" }, this.props.cl(this.props.alert.message))));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({
    dismissAlert: (id) => {
        d(alertActions.dismiss(id));
    }
});
exports.default = (() => ce.enhance(Alert, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=alert.js.map