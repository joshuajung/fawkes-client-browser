"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const lodash_1 = require("lodash");
const ce = require("../../../helpers/componentEnhancer");
const advancedFormActions = require("../../../actions/advancedForm");
class AdvancedFormField extends React.Component {
    componentWillMount() {
        this.props.registerField();
    }
    componentWillUnmount() {
        this.props.unregisterField();
    }
    static fieldValue(form, path) {
        return lodash_1.get(form.fields, path);
    }
    render() {
        if (!lodash_1.isUndefined(AdvancedFormField.fieldValue(this.props.form, this.props.path)))
            return (React.createElement(this.props.presenter, Object.assign({}, this.props.presenterProps, { changeField: newValue => {
                    this.props.changeField(newValue);
                    if (this.props.onChangeSideEffects)
                        this.props.onChangeSideEffects(newValue);
                }, value: AdvancedFormField.fieldValue(this.props.form, this.props.path), module: this.props.module })));
        else
            return null;
    }
}
const stateMappings = (s, props) => ({
    form: s.advancedForm.forms.find(form => props.formId === form.id)
});
const dispatchMappings = (d, props) => ({
    registerField: () => d(advancedFormActions.registerField(props.formId, props.path, props.dataType, props.dataTypeOptions)),
    unregisterField: () => d(advancedFormActions.unregisterField(props.formId, props.path)),
    changeField: newValue => d(advancedFormActions.changeField(props.formId, props.path, newValue))
});
exports.default = (() => ce.enhance(AdvancedFormField, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedFormField.js.map