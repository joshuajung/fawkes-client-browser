"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const ce = require("../../../helpers/componentEnhancer");
const userActions = require("../../../actions/user");
const burger_1 = require("./burger");
const navbarItem_1 = require("./navbarItem");
class Header extends React.Component {
    render() {
        return (React.createElement("div", { className: "container" },
            React.createElement("nav", { className: "navbar" },
                React.createElement("div", { className: "navbar-brand" },
                    React.createElement(react_router_dom_1.Link, { className: "navbar-item", to: "/" },
                        React.createElement(this.props.module.brand, null)),
                    React.createElement(burger_1.default, null)),
                React.createElement("div", { className: "navbar-menu" + (this.props.burgerOpen ? " is-active" : "") },
                    React.createElement("div", { className: "navbar-start" },
                        this.props.module.advancedObjects.map((advancedObject, index) => (React.createElement(navbarItem_1.default, { key: "ao-" + index, title: advancedObject.getTitlePlural(this.props.language, true), href: "/" + advancedObject.objectName + "/list" }))),
                        this.props.module.navbarItems.map((ModuleNavbarItem, index) => (React.createElement(ModuleNavbarItem, { key: index })))),
                    React.createElement("div", { className: "navbar-end" },
                        React.createElement(navbarItem_1.default, { title: this.props.userEmail, items: [
                                {
                                    title: this.props.cl(l => l.private.navbar.logOut()),
                                    onClick: this.props.logOut
                                }
                            ] }))))));
    }
}
const stateMappings = (s, props) => ({
    burgerOpen: s.ui.navbarBurgerOpen,
    userEmail: s.user.userInfo.email
});
const dispatchMappings = (d, props) => ({
    logOut: () => {
        d(userActions.logOut(props.module.api));
    }
});
exports.default = (() => ce.enhance(Header, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=header.js.map