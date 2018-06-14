"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../helpers/componentEnhancer");
const userActions = require("../../actions/user");
const title_1 = require("../reusable/title");
const button_1 = require("../reusable/button");
class LogInWithTokenPage extends React.Component {
    componentDidMount() {
        if (this.props.match.params.token)
            this.props.logInWithToken(this.props.match.params.token);
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(title_1.default, { title: this.props.cl(l => l.public.title()), subtitle: this.props.cl(l => l.loginForm.title()) },
                React.createElement(button_1.default, { label: this.props.cl(l => l.loginForm.title()), href: "/" }))));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({
    logInWithToken: (token) => {
        d(userActions.logInWithToken(props.module.api, token, props.history));
    }
});
exports.default = (() => ce.enhance(LogInWithTokenPage, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=logInWithTokenPage.js.map