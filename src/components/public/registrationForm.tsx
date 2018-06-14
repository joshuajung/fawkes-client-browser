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
  register: (email: string, password: string) => void
}
interface LocalState {}

class RegistrationForm extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return (
      <div>
        <Title
          title={this.props.cl(l => l.public.title())}
          subtitle={this.props.cl(l => l.registrationForm.title())}
        >
          <Button
            label={this.props.cl(l => l.loginForm.title())}
            href="/"
          />
        </Title>
        <AdvancedForm
          formId="register"
          onSubmit={formData => {
            this.props.register(formData.email, formData.password)
          }}
        >
          <AdvancedFormField
            formId="register"
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
          <AdvancedFormField
            formId="register"
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
        </AdvancedForm>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  register: (email: Varchar, password: Varchar) => {
    d(userActions.register(props.module.api, email, password, props.history))
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(RegistrationForm, { stateMappings, dispatchMappings }))()
