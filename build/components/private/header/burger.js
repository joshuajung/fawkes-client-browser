"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../helpers/componentEnhancer");
const uiActions = require("../../../actions/ui");
class Burger extends React.Component {
    render() {
        return (React.createElement("div", { className: "navbar-burger" + (this.props.burgerOpen ? " is-active" : ""), onClick: this.props.toggleBurger },
            React.createElement("span", null),
            React.createElement("span", null),
            React.createElement("span", null)));
    }
}
const stateMappings = (s, props) => ({
    burgerOpen: s.ui.navbarBurgerOpen
});
const dispatchMappings = (d, props) => ({
    toggleBurger: () => {
        d(uiActions.toggleNavbarBurger());
    }
});
exports.default = (() => ce.enhance(Burger, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=burger.js.map