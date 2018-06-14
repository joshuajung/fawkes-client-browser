"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../helpers/componentEnhancer");
class SmartComponent extends React.Component {
    render() {
        return React.createElement("div", null);
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(SmartComponent, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=_component.js.map