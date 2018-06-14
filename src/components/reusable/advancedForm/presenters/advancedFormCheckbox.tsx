// External imports
import * as React from "react"
import { advancedDataConstructor, Boolean } from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"

export interface ParentProps {
  changeField: (newValue: CompatibleData) => void
  value: CompatibleData
  label: string
  isRequired?: boolean
}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

export type CompatibleData = Boolean

class AdvancedFormCheckbox extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  processChange(value: boolean) {
    this.props.changeField(advancedDataConstructor(
      this.props.value.type
    ).fromCheckbox(value, this.props.value.options) as CompatibleData)
  }
  componentDidMount() {
    // Ensuring that the saved value is never null, as this state is not supported by Checkbox
    this.processChange(this.props.value.value)
  }
  render() {
    return (
      <label className="checkbox">
        <input
          type="checkbox"
          checked={this.props.value.toCheckbox()}
          onChange={e => this.processChange(e.target.checked)}
          required={this.props.isRequired}
        />
        <span className="label">{this.props.label}</span>
      </label>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedFormCheckbox, { stateMappings, dispatchMappings }))()
