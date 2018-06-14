"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const lodash_1 = require("lodash");
const react_router_dom_1 = require("react-router-dom");
const ce = require("../../helpers/componentEnhancer");
const icon_1 = require("./icon");
class Button extends React.Component {
    createButtonClasses() {
        const classes = ["button"];
        if (lodash_1.isArray(this.props.classNames))
            classes.push(...this.props.classNames);
        if (this.props.isActive)
            classes.push("is-active");
        return classes.join(" ");
    }
    render() {
        const icon = this.props.icon ? (React.createElement("span", { className: "icon" },
            React.createElement(icon_1.default, { icon: this.props.icon }))) : null;
        const label = this.props.label ? React.createElement("span", null, this.props.label) : null;
        return this.props.href ? (React.createElement(react_router_dom_1.Link, { className: this.createButtonClasses(), to: this.props.href, type: this.props.isSubmit ? "submit" : "button" },
            icon,
            label)) : (React.createElement("button", { className: this.createButtonClasses(), onClick: this.props.onClick, type: this.props.isSubmit ? "submit" : "button" },
            icon,
            label));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(Button, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=button.js.map