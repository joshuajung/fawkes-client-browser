"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const support_1 = require("fawkes-server/build/support");
const ce = require("../../../../helpers/componentEnhancer");
const icon_1 = require("../../icon");
class AdvancedFormSelect extends React.Component {
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
    optionsIncludingEmpty() {
        let result = [];
        if (this.props.includeEmptyOption)
            result.push({ value: "", label: "" });
        result = [...result, ...this.props.options];
        return result;
    }
    currentValueUnavailable() {
        return !this.optionsIncludingEmpty().find(option => option.value === this.props.value.toSelect());
    }
    resetValueIfUnavailable() {
        if (this.currentValueUnavailable()) {
            this.processChange(this.optionsIncludingEmpty()[0].value);
        }
    }
    processChange(value) {
        this.props.changeField(support_1.advancedDataConstructor(this.props.value.type).fromSelect(value, this.props.value.options));
    }
    componentDidUpdate(prevProps, prevState) {
        this.resetValueIfUnavailable();
    }
    render() {
        const selectId = support_1.cryptoHelper.createGuid();
        return (React.createElement("div", { className: "field" },
            this.props.label ? (React.createElement("label", { className: "label", htmlFor: selectId }, this.props.label)) : null,
            React.createElement("div", { className: this.controlClasses() },
                React.createElement("div", { className: "select" },
                    React.createElement("select", { value: this.props.value.toSelect(), id: selectId, onChange: e => this.processChange(e.target.value), required: this.props.isRequired }, this.optionsIncludingEmpty().map((option, optionIndex) => (React.createElement("option", { value: option.value, key: optionIndex }, option.label))))),
                this.infoIcon())));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedFormSelect, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedFormSelect.js.map