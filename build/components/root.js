"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../helpers/componentEnhancer");
const private_1 = require("./private/private");
const public_1 = require("./public/public");
const loadingIndicator_1 = require("./reusable/loadingIndicator");
const alertCenter_1 = require("./alertCenter/alertCenter");
class Root extends React.Component {
    render() {
        let componentToPresent;
        if (this.props.rehydrationComplete) {
            if (this.props.accessToken) {
                componentToPresent = React.createElement(private_1.default, { module: this.props.module });
            }
            else {
                componentToPresent = React.createElement(public_1.default, { module: this.props.module });
            }
        }
        else {
            componentToPresent = React.createElement(loadingIndicator_1.default, null);
        }
        return (React.createElement("div", null,
            componentToPresent,
            React.createElement(alertCenter_1.default, null)));
    }
}
const stateMappings = (s, props) => ({
    accessToken: s.user.accessToken,
    rehydrationComplete: s.application.rehydrationComplete
});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(Root, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=root.js.map