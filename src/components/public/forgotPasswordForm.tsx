// External imports
import * as React from "react"
import { Varchar, AdvancedDataType } from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../helpers/componentEnhancer"
import AdvancedForm from "../reusable/advancedForm/advancedForm"
import AdvancedFormField from "../reusable/advancedForm/advancedFormField"
import AdvancedFormInput from "../reusable/advancedForm/presenters/advancedFormInput"
import AdvancedFormSubmitButton from "../reusable/advancedForm/presenters/advancedFormSubmitButton"
import * as userActions from "../../actions/user"
import Title from "../reusable/title"
import Button from "../reusable/button"

export interface ParentProps {}
interface StateProps {}
interface DispatchProps {
  sendResetPasswordLink: (email: string) => void
}
interface LocalState {}

class ForgotPasswordForm extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return (
      <div>
        <Title
          title={this.props.cl(l => l.public.title())}
          subtitle={this.props.cl(l => l.forgotPasswordForm.title())}
        >
          <Button
            label={this.props.cl(l => l.loginForm.title())}
            href="/"
          />
        </Title>
        <AdvancedForm
          formId="forgotPassword"
          onSubmit={formData => {
            this.props.sendResetPasswordLink(formData.email)
          }}
        >
          <AdvancedFormField
            formId="forgotPassword"
            path="email"
            dataType={AdvancedDataType.Varchar}
            presenter={AdvancedFormInput}
            presenterProps={{
              label: this.props.cl(l => l.loginForm.email.label()),
              placeholder: this.props.cl(l =>
                l.loginForm.email.placeholder()
              ),
              infoIcon: "at",
              isRequired: true,
              validate: true,
              typeOverride: "email"
            }}
          />
          <AdvancedFormSubmitButton />
        </AdvancedForm>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  sendResetPasswordLink: (email: Varchar) => {
    d(
      userActions.sendResetPasswordLink(
        props.module.api,
        email,
        props.module.clientUrl,
        props.history
      )
    )
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(ForgotPasswordForm, { stateMappings, dispatchMappings }))()
