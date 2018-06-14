"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../../helpers/componentEnhancer");
const button_1 = require("../../button");
class AdvancedFormSubmitButton extends React.Component {
    render() {
        return (React.createElement("div", { className: "field" },
            React.createElement("div", { className: "control" },
                React.createElement(button_1.default, { classNames: ["is-primary"], label: this.props.label ||
                        this.props.cl(l => l.advancedForm.submit()), isSubmit: true }))));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedFormSubmitButton, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedFormSubmitButton.js.map