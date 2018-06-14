"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const ce = require("../../../helpers/componentEnhancer");
class NavbarItem extends React.Component {
    render() {
        return this.props.items ? (React.createElement("div", { className: "navbar-item has-dropdown is-hoverable" },
            this.props.href ? (React.createElement(react_router_dom_1.Link, { className: "navbar-link", to: this.props.href }, this.props.title)) : (React.createElement("a", { className: "navbar-link", onClick: this.props.onClick }, this.props.title)),
            this.props.items ? (React.createElement("div", { className: "navbar-dropdown" }, this.props.items.map((item, index) => item.href ? (React.createElement(react_router_dom_1.Link, { className: "navbar-item", to: item.href, key: index }, item.title)) : (React.createElement("a", { className: "navbar-item", onClick: item.onClick, key: index }, item.title))))) : null)) : this.props.href ? (React.createElement(react_router_dom_1.Link, { className: "navbar-item", to: this.props.href }, this.props.title)) : (React.createElement("a", { className: "navbar-item", onClick: this.props.onClick }, this.props.title));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(NavbarItem, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=navbarItem.js.map