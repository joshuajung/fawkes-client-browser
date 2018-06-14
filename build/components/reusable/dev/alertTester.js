"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../helpers/componentEnhancer");
const alertActions = require("../../../actions/alert");
class AlertTester extends React.Component {
    componentDidMount() {
        this.setState({
            updatingAlert: new ce.stl.Alert({
                message: l => l.dev.helloWorld(),
                progress: 0.1,
                autoDismissTimeout: null
            })
        });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("button", { type: "button", className: "button", onClick: e => {
                    this.props.triggerAlert(new ce.stl.Alert({
                        message: l => l.dev.helloWorld()
                    }));
                } }, "Demo Alert"),
            React.createElement("button", { type: "button", className: "button", onClick: e => {
                    this.props.triggerAlert(new ce.stl.Alert({
                        message: l => l.dev.helloWorld(),
                        autoDismissTimeout: null
                    }));
                } }, "Demo Alert without autoDismiss"),
            React.createElement("button", { type: "button", className: "button", onClick: e => {
                    this.props.triggerAlert(this.state.updatingAlert);
                } }, "Demo Alert with progress 10%"),
            React.createElement("button", { type: "button", className: "button", onClick: e => {
                    this.props.triggerAlert(Object.assign({}, this.state.updatingAlert, { progress: 1, autoDismissTimeout: 3000, type: ce.stl.AlertType.Success }));
                } }, "Update Alert to 100% progress")));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({
    triggerAlert: (alert) => {
        d(alertActions.request(alert));
    }
});
exports.default = (() => ce.enhance(AlertTester, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=alertTester.js.map