"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const support_1 = require("fawkes-server/build/support");
const ce = require("../../../../helpers/componentEnhancer");
const advancedForm_1 = require("../../advancedForm/advancedForm");
const advancedFormArray_1 = require("../../advancedForm/advancedFormArray");
const advancedTableFilter_1 = require("./advancedTableFilter");
const advancedFormActions = require("../../../../actions/advancedForm");
const button_1 = require("../../button");
class AdvancedTableFilters extends React.Component {
    render() {
        const formKey = "at-filters-" + this.props.table.key;
        return (React.createElement("div", { className: "filters" },
            React.createElement(advancedForm_1.default, { formId: formKey, onSubmit: formData => this.props.setFilters(formData.filters.map(formFilter => ({
                    propertyName: formFilter.propertyName.value,
                    operator: formFilter.operator.value,
                    constants: formFilter.constants
                }))), initialValues: {
                    filters: this.props.table.data.options.filterBy.length > 0
                        ? this.props.table.data.options.filterBy.map(initialFilter => ({
                            propertyName: new support_1.Varchar(initialFilter.propertyName),
                            operator: new support_1.Varchar(initialFilter.operator),
                            constants: initialFilter.constants
                        }))
                        :
                            [
                                {
                                    propertyName: new support_1.Varchar(this.props.propertiesToDisplay[0].propertyName),
                                    operator: new support_1.Varchar(null),
                                    constants: [new support_1.Varchar(null)]
                                }
                            ]
                } },
                React.createElement(advancedFormArray_1.default, { formId: formKey, path: "filters", presenter: advancedTableFilter_1.default, presenterProps: {
                        propertiesToDisplay: this.props.propertiesToDisplay,
                        propertyDefinitions: this.props.table.data.properties
                    }, module: this.props.module }),
                React.createElement("div", { className: "buttons is-right" },
                    React.createElement(button_1.default, { onClick: this.props.add, icon: ["far", "plus"], label: this.props.cl(l => l.advancedTable.filters.add()) }),
                    React.createElement(button_1.default, { classNames: ["is-primary"], label: this.props.cl(l => l.advancedTable.filters.apply()), isSubmit: true })))));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({
    add: () => d(advancedFormActions.addElementToArray("at-filters-" + props.table.key, "filters", {
        propertyName: new support_1.Varchar(props.propertiesToDisplay[0].propertyName),
        operator: new support_1.Varchar(null),
        constants: [new support_1.Varchar(null)]
    }))
});
exports.default = (() => ce.enhance(AdvancedTableFilters, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedTableFilters.js.map