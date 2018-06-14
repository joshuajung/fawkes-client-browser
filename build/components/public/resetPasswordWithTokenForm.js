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
class ResetPasswordWithTokenForm extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(title_1.default, { title: this.props.cl(l => l.public.title()), subtitle: this.props.cl(l => l.resetPasswordWithTokenForm.title()) },
                React.createElement(button_1.default, { label: this.props.cl(l => l.loginForm.title()), href: "/" })),
            React.createElement(advancedForm_1.default, { formId: "resetPasswordWithToken", onSubmit: formData => {
                    this.props.resetPasswordWithToken(formData.newPassword);
                } },
                React.createElement(advancedFormField_1.default, { formId: "resetPasswordWithToken", path: "newPassword", dataType: support_1.AdvancedDataType.Varchar, presenter: advancedFormInput_1.default, presenterProps: {
                        label: this.props.cl(l => l.resetPasswordWithTokenForm.formFieldLabel()),
                        placeholder: this.props.cl(l => l.resetPasswordWithTokenForm.formFieldLabel()),
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
    resetPasswordWithToken: (newPassword) => {
        d(userActions.resetPasswordWithToken(props.module.api, newPassword, props.match.params["token"], props.history));
    }
});
exports.default = (() => ce.enhance(ResetPasswordWithTokenForm, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=resetPasswordWithTokenForm.js.map