"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const support_1 = require("fawkes-server/build/support");
const ce = require("../../../../helpers/componentEnhancer");
const icon_1 = require("../../icon");
class AdvancedFormInput extends React.Component {
    controlClasses() {
        const classes = ["control"];
        if (this.props.infoIcon)
            classes.push("has-icons-left");
        return classes.join(" ");
    }
    infoIcon() {
        if (!this.props.infoIcon)
            return null;
        return (React.createElement("span", { className: "icon is-small is-left" },
            React.createElement(icon_1.default, { icon: this.props.infoIcon })));
    }
    inputProps() {
        switch (this.props.value.type) {
            case support_1.AdvancedDataType.Varchar:
                return { type: this.props.typeOverride || "input" };
            case support_1.AdvancedDataType.Float:
                const decimalDigits = this.props.value.options["decimalDigits"];
                const step = !isNaN(decimalDigits)
                    ? Math.pow(10, -decimalDigits)
                    : "any";
                return { type: this.props.typeOverride || "number", step: step };
            case support_1.AdvancedDataType.Integer:
                return { type: this.props.typeOverride || "number", step: 1 };
            case support_1.AdvancedDataType.StupidDate:
                return { type: this.props.typeOverride || "date" };
            case support_1.AdvancedDataType.DateTime:
                return { type: this.props.typeOverride || "datetime-local" };
            default:
                return { type: this.props.typeOverride || "input" };
        }
    }
    processChange(value) {
        this.props.changeField(support_1.advancedDataConstructor(this.props.value.type).fromInput(value, this.props.value.options));
    }
    render() {
        const inputId = support_1.cryptoHelper.createGuid();
        return (React.createElement("div", { className: "field" },
            this.props.label ? (React.createElement("label", { className: "label", htmlFor: inputId }, this.props.label)) : null,
            React.createElement("div", { className: this.controlClasses() },
                React.createElement("input", Object.assign({}, this.inputProps(), { id: inputId, value: this.props.value.toInput(), onChange: e => this.processChange(e.target.value), placeholder: this.props.placeholder, required: this.props.isRequired })),
                this.infoIcon())));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedFormInput, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedFormInput.js.map