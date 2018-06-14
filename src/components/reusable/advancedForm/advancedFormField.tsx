// External imports
import * as React from "react"
import { get, isUndefined } from "lodash"
import {
  AdvancedData,
  AdvancedDataType,
  AdvancedDataTypeOptions
} from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../helpers/componentEnhancer"
import * as advancedFormActions from "../../../actions/advancedForm"
import * as advancedFormHelper from "../../../helpers/advancedForm"
import { AdvancedForm } from "../../../store/types"
// import { AdvancedFormFieldInState } from "../../../store/reducers/advancedForm"

export interface ParentProps {
  formId: string
  path: string
  dataType: AdvancedDataType
  dataTypeOptions?: AdvancedDataTypeOptions
  presenter: advancedFormHelper.AdvancedFormFieldPresenter
  presenterProps?: object
  onChangeSideEffects?: (newValue: AdvancedData) => void
}
interface StateProps {
  form?: AdvancedForm
}
interface DispatchProps {
  registerField: () => void
  unregisterField: () => void
  changeField: (newValue: AdvancedData) => void
}
interface LocalState {}

class AdvancedFormField extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  componentWillMount() {
    this.props.registerField()
  }
  componentWillUnmount() {
    this.props.unregisterField()
  }
  static fieldValue(form: AdvancedForm, path: string): AdvancedData {
    return get(form.fields, path)
  }
  render() {
    if (
      !isUndefined(
        AdvancedFormField.fieldValue(this.props.form, this.props.path)
      )
    )
      return (
        <this.props.presenter
          {...this.props.presenterProps}
          changeField={newValue => {
            this.props.changeField(newValue)
            if (this.props.onChangeSideEffects)
              this.props.onChangeSideEffects(newValue)
          }}
          value={AdvancedFormField.fieldValue(this.props.form, this.props.path)}
          module={this.props.module}
        />
      )
    else return null
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  form: s.advancedForm.forms.find(form => props.formId === form.id)
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  registerField: () =>
    d(
      advancedFormActions.registerField(
        props.formId,
        props.path,
        props.dataType,
        props.dataTypeOptions
      )
    ),
  unregisterField: () =>
    d(advancedFormActions.unregisterField(props.formId, props.path)),
  changeField: newValue =>
    d(advancedFormActions.changeField(props.formId, props.path, newValue))
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedFormField, { stateMappings, dispatchMappings }))()
