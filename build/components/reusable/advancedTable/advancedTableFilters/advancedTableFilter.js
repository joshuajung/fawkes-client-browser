"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const support_1 = require("fawkes-server/build/support");
const lodash_1 = require("lodash");
const ce = require("../../../../helpers/componentEnhancer");
const advancedFormField_1 = require("../../advancedForm/advancedFormField");
const advancedFormSelect_1 = require("../../advancedForm/presenters/advancedFormSelect");
const advancedFormArray_1 = require("../../advancedForm/advancedFormArray");
const advancedTableFilterConstant_1 = require("./advancedTableFilterConstant");
const advancedFormActions = require("../../../../actions/advancedForm");
const button_1 = require("../../button");
class AdvancedTableFilterLine extends React.Component {
    resetConstants(filter, resetConstantsAction) {
        const constantCount = support_1.advancedObjectHelper.AdvancedObjectGetRecordListFilterByOperators.find(operator => operator.key === filter.operator.value).constantCount;
        const propertyDefinition = this.propertyDefinition(filter.propertyName.value);
        const constructor = support_1.advancedDataConstructor(propertyDefinition.dataType);
        resetConstantsAction(Array(constantCount).fill(new constructor(undefined, undefined, propertyDefinition.dataTypeOptions)));
    }
    propertyDefinition(propertyName) {
        return this.props.propertyDefinitions.find(f => f.name === propertyName);
    }
    componentWillReceiveProps(newProps) {
        if (this.props.filter.propertyName.value !==
            newProps.filter.propertyName.value ||
            this.props.filter.operator.value !== newProps.filter.operator.value) {
            this.resetConstants(newProps.filter, newProps.resetConstants);
        }
    }
    render() {
        return (React.createElement("div", { className: "columns" },
            React.createElement("div", { className: "column" },
                React.createElement(advancedFormField_1.default, { formId: this.props.formId, path: `${this.props.path}.propertyName`, dataType: support_1.AdvancedDataType.Varchar, presenter: advancedFormSelect_1.default, presenterProps: {
                        options: this.props.propertiesToDisplay
                            .filter(propertyToDisplay => this.props.propertyDefinitions.find(propertyDefinition => propertyDefinition.name ===
                            propertyToDisplay.propertyName).filterByAllowed)
                            .map(propertyToDisplay => ({
                            value: propertyToDisplay.propertyName,
                            label: propertyToDisplay.columnTitle
                        }))
                            .sort((option1, option2) => option1.label.localeCompare(option2.label))
                    } })),
            React.createElement("div", { className: "column" },
                React.createElement(advancedFormField_1.default, { formId: this.props.formId, path: `${this.props.path}.operator`, dataType: support_1.AdvancedDataType.Varchar, presenter: advancedFormSelect_1.default, presenterProps: {
                        options: support_1.advancedObjectHelper.AdvancedObjectGetRecordListFilterByOperators.filter(operator => operator.availableFor.find(availableFor => availableFor ===
                            this.propertyDefinition(this.props.filter.propertyName.value).dataType)).map(operator => ({
                            value: operator.key,
                            label: this.props.cl(l => l.advancedTable.filters.operators[operator.key]())
                        }))
                    } })),
            React.createElement("div", { className: "column columns" },
                React.createElement(advancedFormArray_1.default, { formId: this.props.formId, path: `${this.props.path}.constants`, presenter: advancedTableFilterConstant_1.default, presenterProps: {
                        filter: this.props.filter,
                        dataType: this.propertyDefinition(this.props.filter.propertyName.value).dataType,
                        dataTypeOptions: this.propertyDefinition(this.props.filter.propertyName.value).dataTypeOptions
                    }, module: this.props.module })),
            React.createElement("div", { className: "column is-narrow" },
                React.createElement(button_1.default, { onClick: this.props.remove, classNames: ["remove-filter"], icon: ["far", "minus"] }))));
    }
}
const stateMappings = (s, props) => ({
    filter: lodash_1.get(s.advancedForm.forms.find(form => props.formId === form.id).fields, props.path)
});
const dispatchMappings = (d, props) => ({
    remove: () => d(advancedFormActions.removeElementFromArray(props.formId, props.path)),
    resetConstants: newConstants => d(advancedFormActions.changeField(props.formId, props.path + ".constants", newConstants))
});
exports.default = (() => ce.enhance(AdvancedTableFilterLine, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedTableFilter.js.map