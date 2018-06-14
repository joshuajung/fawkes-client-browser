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
class Public extends React.Component {
    render() {
        return (React.createElement("section", null,
            React.createElement("div", { className: "container" },
                React.createElement(react_router_dom_1.Route, { path: "/", exact: true },
                    React.createElement(loginForm_1.default, { module: this.props.module })),
                React.createElement(react_router_dom_1.Route, { path: "/register", exact: true },
                    React.createElement(registrationForm_1.default, { module: this.props.module })),
                React.createElement(react_router_dom_1.Route, { path: "/forgotPassword", exact: true },
                    React.createElement(forgotPasswordForm_1.default, { module: this.props.module })),
                React.createElement(react_router_dom_1.Route, { path: "/resetPasswordWithToken/:token", exact: true },
                    React.createElement(resetPasswordWithTokenForm_1.default, { module: this.props.module })),
                React.createElement(react_router_dom_1.Route, { path: "/logInWithToken/:token", exact: true },
                    React.createElement(logInWithTokenPage_1.default, { module: this.props.module })))));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(Public, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=public.js.map