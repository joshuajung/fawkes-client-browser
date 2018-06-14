"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const support_1 = require("fawkes-server/build/support");
const ce = require("../../../../helpers/componentEnhancer");
class AdvancedFormCheckbox extends React.Component {
    processChange(value) {
        this.props.changeField(support_1.advancedDataConstructor(this.props.value.type).fromCheckbox(value, this.props.value.options));
    }
    componentDidMount() {
        this.processChange(this.props.value.value);
    }
    render() {
        return (React.createElement("label", { className: "checkbox" },
            React.createElement("input", { type: "checkbox", checked: this.props.value.toCheckbox(), onChange: e => this.processChange(e.target.checked), required: this.props.isRequired }),
            React.createElement("span", { className: "label" }, this.props.label)));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedFormCheckbox, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedFormCheckbox.js.map