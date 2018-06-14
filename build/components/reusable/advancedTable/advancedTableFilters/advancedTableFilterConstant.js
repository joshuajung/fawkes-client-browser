"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const support_1 = require("fawkes-server/build/support");
const ce = require("../../../../helpers/componentEnhancer");
const advancedFormField_1 = require("../../advancedForm/advancedFormField");
const advancedFormInput_1 = require("../../advancedForm/presenters/advancedFormInput");
const advancedFormSelect_1 = require("../../advancedForm/presenters/advancedFormSelect");
const advancedFormLookup_1 = require("../../advancedForm/presenters/advancedFormLookup");
class AdvancedTableFilterConstant extends React.Component {
    presenter() {
        switch (this.props.dataType) {
            case support_1.AdvancedDataType.DateTime:
            case support_1.AdvancedDataType.Float:
            case support_1.AdvancedDataType.Integer:
            case support_1.AdvancedDataType.StupidDate:
            case support_1.AdvancedDataType.Varchar:
                return advancedFormInput_1.default;
            case support_1.AdvancedDataType.Lookup:
                return advancedFormLookup_1.default;
            case support_1.AdvancedDataType.Boolean:
                return advancedFormSelect_1.default;
            case support_1.AdvancedDataType.Text:
                throw new Error("Tried to filter for Text datatype.");
        }
    }
    presenterProps() {
        switch (this.props.dataType) {
            case support_1.AdvancedDataType.Boolean:
                return {
                    isRequired: true,
                    options: [
                        {
                            value: "false",
                            label: this.props.cl(l => l.common.no())
                        },
                        {
                            value: "true",
                            label: this.props.cl(l => l.common.yes())
                        }
                    ]
                };
            default:
                return {
                    isRequired: true
                };
        }
    }
    render() {
        return (React.createElement("div", { className: "column" },
            React.createElement(advancedFormField_1.default, { formId: this.props.formId, dataType: this.props.dataType, path: this.props.path, presenter: this.presenter(), presenterProps: this.presenterProps(), module: this.props.module })));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedTableFilterConstant, {
    stateMappings,
    dispatchMappings
}))();
//# sourceMappingURL=advancedTableFilterConstant.js.map