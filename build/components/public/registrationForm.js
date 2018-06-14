"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const support_1 = require("fawkes-server/build/support");
const ce = require("../../helpers/componentEnhancer");
const advancedForm_1 = require("../reusable/advancedForm/advancedForm");
const advancedFormField_1 = require("../reusable/advancedForm/advancedFormField");
const advancedFormInput_1 = require("../reusable/advancedForm/presenters/advancedFormInput");
const advancedFormSubmitButton_1 = require("../reusable/advancedForm/presenters/advancedFormSubmitButton");
const userActions = require("../../actions/user");
const title_1 = require("../reusable/title");
const button_1 = require("../reusable/button");
class RegistrationForm extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(title_1.default, { title: this.props.cl(l => l.public.title()), subtitle: this.props.cl(l => l.registrationForm.title()) },
                React.createElement(button_1.default, { label: this.props.cl(l => l.loginForm.title()), href: "/" })),
            React.createElement(advancedForm_1.default, { formId: "register", onSubmit: formData => {
                    this.props.register(formData.email, formData.password);
                } },
                React.createElement(advancedFormField_1.default, { formId: "register", path: "email", dataType: support_1.AdvancedDataType.Varchar, presenter: advancedFormInput_1.default, presenterProps: {
                        label: this.props.cl(l => l.loginForm.email.label()),
                        placeholder: this.props.cl(l => l.loginForm.email.placeholder()),
                        infoIcon: "at",
                        isRequired: true,
                        validate: true,
                        typeOverride: "email"
                    } }),
                React.createElement(advancedFormField_1.default, { formId: "register", path: "password", dataType: support_1.AdvancedDataType.Varchar, presenter: advancedFormInput_1.default, presenterProps: {
                        label: this.props.cl(l => l.loginForm.password.label()),
                        placeholder: this.props.cl(l => l.loginForm.password.placeholder()),
                        infoIcon: "key",
                        isRequired: true,
                        validate: true,
                        typeOverride: "password"
                    } }),
                React.createElement(advancedFormSubmitButton_1.default, null))));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({
    register: (email, password) => {
        d(userActions.register(props.module.api, email, password, props.history));
    }
});
exports.default = (() => ce.enhance(RegistrationForm, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=registrationForm.js.map