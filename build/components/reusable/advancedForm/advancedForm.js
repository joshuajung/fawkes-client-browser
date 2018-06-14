"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../helpers/componentEnhancer");
const advancedFormActions = require("../../../actions/advancedForm");
class AdvancedForm extends React.Component {
    componentDidMount() {
        this.props.registerForm();
    }
    componentWillUnmount() {
        this.props.unregisterForm();
    }
    render() {
        if (this.props.form) {
            return (React.createElement("form", { onSubmit: e => {
                    this.props.onSubmit(this.props.form.fields);
                    e.preventDefault();
                }, className: "advanced-form" }, this.props.children));
        }
        else
            return null;
    }
}
const stateMappings = (s, props) => ({
    form: s.advancedForm.forms.find(f => f.id === props.formId)
});
const dispatchMappings = (d, props) => ({
    registerForm: () => d(advancedFormActions.registerForm(props.formId, props.initialValues)),
    unregisterForm: () => d(advancedFormActions.unregisterForm(props.formId))
});
exports.default = (() => ce.enhance(AdvancedForm, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedForm.js.map