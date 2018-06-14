"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../../helpers/componentEnhancer");
class AdvancedDataSpan extends React.Component {
    render() {
        return (React.createElement("span", null,
            this.props.label,
            ": ",
            this.props.value.toString()));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedDataSpan, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedDataSpan.js.map