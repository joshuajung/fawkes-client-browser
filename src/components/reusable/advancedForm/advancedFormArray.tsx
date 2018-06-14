// External imports
import * as React from "react"
import { get, isArray } from "lodash"

// Internal imports
import * as ce from "../../../helpers/componentEnhancer"
import * as stl from "../../../store/types"
import * as advancedFormHelper from "../../../helpers/advancedForm"

export interface ParentProps {
  formId: string
  path: string
  presenter: advancedFormHelper.AdvancedFormArrayPresenter
  presenterProps?: object
}
interface StateProps {
  form?: stl.AdvancedForm
}
interface DispatchProps {}
interface LocalState {}

class AdvancedFormArray extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  static pathValue(form: stl.AdvancedForm, path: string): Array<any> {
    const pathValue = get(form.fields, path)
    if (!isArray(pathValue)) {
      console.warn(
        "Value at path " +
          path +
          " is no array, cannot generate AdanvedFormArray."
      )
      return []
    }
    return pathValue
  }
  render() {
    const pathValue = AdvancedFormArray.pathValue(
      this.props.form,
      this.props.path
    )
    if (isArray(pathValue)) {
      return pathValue.map((element, elementIndex) => (
        <this.props.presenter
          {...this.props.presenterProps}
          key={elementIndex}
          formId={this.props.formId}
          path={this.props.path + "." + elementIndex}
          module={this.props.module}
        />
      ))
    } else return null
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  form: s.advancedForm.forms.find(form => props.formId === form.id)
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedFormArray, { stateMappings, dispatchMappings }))()
