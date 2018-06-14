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
  resetPasswordWithToken: (newPassword: string) => void
}
interface LocalState {}

class ResetPasswordWithTokenForm extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return (
      <div>
        <Title
          title={this.props.cl(l => l.public.title())}
          subtitle={this.props.cl(l =>
            l.resetPasswordWithTokenForm.title()
          )}
        >
          <Button
            label={this.props.cl(l => l.loginForm.title())}
            href="/"
          />
        </Title>
        <AdvancedForm
          formId="resetPasswordWithToken"
          onSubmit={formData => {
            this.props.resetPasswordWithToken(formData.newPassword)
          }}
        >
          <AdvancedFormField
            formId="resetPasswordWithToken"
            path="newPassword"
            dataType={AdvancedDataType.Varchar}
            presenter={AdvancedFormInput}
            presenterProps={{
              label: this.props.cl(l =>
                l.resetPasswordWithTokenForm.formFieldLabel()
              ),
              placeholder: this.props.cl(l =>
                l.resetPasswordWithTokenForm.formFieldLabel()
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
  resetPasswordWithToken: (newPassword: Varchar) => {
    d(
      userActions.resetPasswordWithToken(
        props.module.api,
        newPassword,
        props.match.params["token"],
        props.history
      )
    )
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(ResetPasswordWithTokenForm, { stateMappings, dispatchMappings }))()
