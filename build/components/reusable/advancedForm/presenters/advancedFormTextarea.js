"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const support_1 = require("fawkes-server/build/support");
const ce = require("../../../../helpers/componentEnhancer");
const icon_1 = require("../../icon");
class AdvancedFormTextarea extends React.Component {
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
    textareaProps() {
        switch (this.props.value.type) {
            default:
                return { type: this.props.typeOverride || "input" };
        }
    }
    processChange(value) {
        this.props.changeField(support_1.advancedDataConstructor(this.props.value.type).fromTextarea(value, this.props.value.options));
    }
    render() {
        const textareaId = support_1.cryptoHelper.createGuid();
        return (React.createElement("div", { className: "field" },
            this.props.label ? (React.createElement("label", { className: "label", htmlFor: textareaId }, this.props.label)) : null,
            React.createElement("div", { className: this.controlClasses() },
                React.createElement("textarea", Object.assign({}, this.textareaProps(), { id: textareaId, value: this.props.value.toTextarea(), onChange: e => this.processChange(e.target.value), placeholder: this.props.placeholder, required: this.props.isRequired })))));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedFormTextarea, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedFormTextarea.js.map