"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../../../helpers/componentEnhancer");
const icon_1 = require("../../../icon");
class AdvancedTableBodyCellBoolean extends React.Component {
    render() {
        const cellContent = this.props.value.isNil() ? (React.createElement(icon_1.default, { icon: "question-square" })) : this.props.value.value ? (React.createElement(icon_1.default, { icon: "check-square" })) : (React.createElement(icon_1.default, { icon: "times-square" }));
        return React.createElement("td", { className: "boolean" }, cellContent);
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedTableBodyCellBoolean, {
    stateMappings,
    dispatchMappings
}))();
//# sourceMappingURL=advancedTableBodyCellBoolean.js.map