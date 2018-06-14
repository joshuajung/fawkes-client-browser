"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../../../helpers/componentEnhancer");
class AdvancedTableBodyCellText extends React.Component {
    render() {
        return React.createElement("td", null, this.props.value.toString());
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedTableBodyCellText, {
    stateMappings,
    dispatchMappings
}))();
//# sourceMappingURL=advancedTableBodyCellText.js.map