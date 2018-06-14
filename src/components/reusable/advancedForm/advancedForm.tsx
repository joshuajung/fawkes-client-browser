// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../../helpers/componentEnhancer"
import * as advancedFormActions from "../../../actions/advancedForm"
// import * as advancedFormHelper from "../../../helpers/advancedForm"
import * as stl from "../../../store/types"

export interface ParentProps {
  formId: string
  onSubmit: (data) => void
  initialValues?: object
}
interface StateProps {
  form: stl.AdvancedForm
}
interface DispatchProps {
  registerForm: () => void
  unregisterForm: () => void
}
interface LocalState {}

class AdvancedForm extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  componentDidMount() {
    this.props.registerForm()
  }
  componentWillUnmount() {
    this.props.unregisterForm()
  }
  render() {
    if (this.props.form) {
      return (
        <form
          onSubmit={e => {
            this.props.onSubmit(this.props.form.fields)
            e.preventDefault()
          }}
          className="advanced-form"
        >
          {this.props.children}
        </form>
      )
    } else return null
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  form: s.advancedForm.forms.find(f => f.id === props.formId)
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  registerForm: () =>
    d(advancedFormActions.registerForm(props.formId, props.initialValues)),
  unregisterForm: () => d(advancedFormActions.unregisterForm(props.formId))
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedForm, { stateMappings, dispatchMappings }))()
