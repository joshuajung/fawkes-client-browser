// External imports
import * as React from "react"
import { AdvancedDataType } from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"
import AdvancedFormField from "../../advancedForm/advancedFormField"
import AdvancedFormInput from "../../advancedForm/presenters/advancedFormInput"
import AdvancedFormSelect from "../../advancedForm/presenters/advancedFormSelect"
import AdvancedFormLookup from "../../advancedForm/presenters/advancedFormLookup"

export interface ParentProps {
  formId: string
  path: string
  dataType: AdvancedDataType
}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

class AdvancedTableFilterConstant extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  presenter() {
    switch (this.props.dataType) {
      case AdvancedDataType.DateTime:
      case AdvancedDataType.Float:
      case AdvancedDataType.Integer:
      case AdvancedDataType.StupidDate:
      case AdvancedDataType.Varchar:
        return AdvancedFormInput
      case AdvancedDataType.Lookup:
        return AdvancedFormLookup
      case AdvancedDataType.Boolean:
        return AdvancedFormSelect
      case AdvancedDataType.Text:
        throw new Error("Tried to filter for Text datatype.")
    }
  }
  presenterProps() {
    switch (this.props.dataType) {
      case AdvancedDataType.Boolean:
        return {
          isRequired: true,
          options: [
            {
              value: "false",
              label: this.props.cl(l => l.common.no())
            },
            {
              value: "true",
              label: this.props.cl(l => l.common.yes())
            }
          ]
        }
      default:
        return {
          isRequired: true
        }
    }
  }
  render() {
    return (
      <div className="column">
        <AdvancedFormField
          formId={this.props.formId}
          dataType={this.props.dataType}
          path={this.props.path}
          presenter={this.presenter()}
          presenterProps={this.presenterProps()}
          module={this.props.module}
        />
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableFilterConstant, {
    stateMappings,
    dispatchMappings
  }))()
