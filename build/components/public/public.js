"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const ce = require("../../helpers/componentEnhancer");
const loginForm_1 = require("./loginForm");
const registrationForm_1 = require("./registrationForm");
const forgotPasswordForm_1 = require("./forgotPasswordForm");
const resetPasswordWithTokenForm_1 = require("./resetPasswordWithTokenForm");
const logInWithTokenPage_1 = require("./logInWithTokenPage");
const userActions = require("../../actions/user");
const loadingIndicator_1 = require("../reusable/loadingIndicator");
class Public extends React.Component {
    componentDidMount() {
        if (this.props.module.autoLoginWithAppleIdentifier)
            this.props.logInWithAppleIdentifier();
    }
    render() {
        return (React.createElement("section", null,
            React.createElement("div", { className: "container" }, this.props.module.autoLoginWithAppleIdentifier ? (React.createElement(loadingIndicator_1.default, null)) : (React.createElement(React.Fragment, null,
                React.createElement(react_router_dom_1.Route, { path: "/", exact: true, render: () => React.createElement(loginForm_1.default, { module: this.props.module }) }),
                React.createElement(react_router_dom_1.Route, { path: "/register", exact: true, render: () => React.createElement(registrationForm_1.default, { module: this.props.module }) }),
                React.createElement(react_router_dom_1.Route, { path: "/forgotPassword", exact: true, render: () => React.createElement(forgotPasswordForm_1.default, { module: this.props.module }) }),
                React.createElement(react_router_dom_1.Route, { path: "/resetPasswordWithToken/:token", exact: true, render: () => (React.createElement(resetPasswordWithTokenForm_1.default, { module: this.props.module })) }),
                React.createElement(react_router_dom_1.Route, { path: "/logInWithToken/:token", exact: true, render: () => React.createElement(logInWithTokenPage_1.default, { module: this.props.module }) }),
                " ")))));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({
    logInWithAppleIdentifier: () => d(userActions.logInWithAppleIdentifier(props.module.api, props.history))
});
exports.default = (() => ce.enhance(Public, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=public.js.map