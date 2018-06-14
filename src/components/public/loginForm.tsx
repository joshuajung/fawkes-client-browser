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
import { AdvancedForm as AdvancedFormInStore } from "../../store/types"

export interface ParentProps {}
interface StateProps {
  form?: AdvancedFormInStore
}
interface DispatchProps {
  logIn: (email: string, password: string) => void
  sendLoginLink: (email: string) => void
}
interface LocalState {}

class LoginForm extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return (
      <div>
        <Title
          title={this.props.cl(l => l.public.title())}
          subtitle={this.props.cl(l => l.loginForm.title())}
        >
          <Button
            label={this.props.cl(l => l.registrationForm.title())}
            href="/register"
          />
          <Button
            label={this.props.cl(l => l.forgotPasswordForm.title())}
            href="/forgotPassword"
          />
        </Title>
        <AdvancedForm
          formId="login"
          onSubmit={formData => {
            this.props.logIn(formData.email, formData.password)
          }}
        >
          <AdvancedFormField
            formId="login"
            path="email"
            dataType={AdvancedDataType.Varchar}
            presenter={AdvancedFormInput}
            presenterProps={{
              label: this.props.cl(l => l.loginForm.email.label()),
              placeholder: this.props.cl(l => l.loginForm.email.placeholder()),
              infoIcon: "at",
              isRequired: true,
              validate: true,
              typeOverride: "email"
            }}
          />
          <AdvancedFormField
            formId="login"
            path="password"
            dataType={AdvancedDataType.Varchar}
            presenter={AdvancedFormInput}
            presenterProps={{
              label: this.props.cl(l => l.loginForm.password.label()),
              placeholder: this.props.cl(l =>
                l.loginForm.password.placeholder()
              ),
              infoIcon: "key",
              isRequired: true,
              validate: true,
              typeOverride: "password"
            }}
          />
          <AdvancedFormSubmitButton />
          <Button
            label={this.props.cl(l => l.loginForm.sendLoginLink())}
            onClick={() =>
              this.props.sendLoginLink(this.props.form.fields["email"])
            }
          />
        </AdvancedForm>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  form: s.advancedForm.forms.find(form => form.id === "login")
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  logIn: (email: Varchar, password: Varchar) => {
    d(
      userActions.logInWithEmail(
        props.module.api,
        email,
        password,
        props.history
      )
    )
  },
  sendLoginLink: (email: Varchar) => {
    d(
      userActions.sendLoginLink(
        props.module.api,
        email,
        props.module.clientUrl,
        props.history
      )
    )
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(LoginForm, { stateMappings, dispatchMappings }))()
