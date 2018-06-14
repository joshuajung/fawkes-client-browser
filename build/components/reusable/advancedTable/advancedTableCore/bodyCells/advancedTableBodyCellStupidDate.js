"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const ce = require("../../../../../helpers/componentEnhancer");
class AdvancedTableBodyCellStupidDate extends React.Component {
    render() {
        return (React.createElement("td", { className: "stupid-date" }, this.props.link ? (React.createElement(react_router_dom_1.Link, { to: this.props.link }, this.props.value.toString())) : (this.props.value.toString())));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedTableBodyCellStupidDate, {
    stateMappings,
    dispatchMappings
}))();
//# sourceMappingURL=advancedTableBodyCellStupidDate.js.map