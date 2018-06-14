"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const ce = require("../../../../../helpers/componentEnhancer");
class AdvancedTableBodyCellDateTime extends React.Component {
    render() {
        const value = this.props.value.toString();
        return (React.createElement("td", { className: "date-time" }, this.props.link ? React.createElement(react_router_dom_1.Link, { to: this.props.link }, value) : value));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedTableBodyCellDateTime, {
    stateMappings,
    dispatchMappings
}))();
//# sourceMappingURL=advancedTableBodyCellDateTime.js.map