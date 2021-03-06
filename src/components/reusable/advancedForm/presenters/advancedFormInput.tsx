// External imports
import * as React from "react"
import {
  AdvancedDataType,
  advancedDataConstructor,
  Varchar,
  DateTime,
  StupidDate,
  Float,
  Integer,
  cryptoHelper
} from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"
import Icon from "../../icon"

export interface ParentProps {
  changeField: (newValue: CompatibleData) => void
  value: CompatibleData
  label?: string
  placeholder?: string
  infoIcon?: string
  isRequired?: boolean
  typeOverride?: string
}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

export type CompatibleData = Varchar | DateTime | StupidDate | Float | Integer

class AdvancedFormInput extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  controlClasses() {
    const classes = ["control"]
    if (this.props.infoIcon) classes.push("has-icons-left")
    return classes.join(" ")
  }
  infoIcon() {
    if (!this.props.infoIcon) return null
    return (
      <span className="icon is-small is-left">
        <Icon icon={this.props.infoIcon} />
      </span>
    )
  }
  inputProps(): object {
    switch (this.props.value.type) {
      case AdvancedDataType.Varchar:
        return { type: this.props.typeOverride || "input" }
      case AdvancedDataType.Float:
        const decimalDigits = this.props.value.options["decimalDigits"]
        const step = !isNaN(decimalDigits)
          ? Math.pow(10, -decimalDigits)
          : "any"
        return { type: this.props.typeOverride || "number", step: step }
      case AdvancedDataType.Integer:
        return { type: this.props.typeOverride || "number", step: 1 }
      case AdvancedDataType.StupidDate:
        return { type: this.props.typeOverride || "date" }
      case AdvancedDataType.DateTime:
        return { type: this.props.typeOverride || "datetime-local" }
      default:
        return { type: this.props.typeOverride || "input" }
    }
  }
  processChange(value: string) {
    this.props.changeField(advancedDataConstructor(
      this.props.value.type
    ).fromInput(value, this.props.value.options) as CompatibleData)
  }
  render() {
    const inputId = cryptoHelper.createGuid()
    return (
      <div className="field">
        {this.props.label ? (
          <label className="label" htmlFor={inputId}>
            {this.props.label}
          </label>
        ) : null}
        <div className={this.controlClasses()}>
          <input
            {...this.inputProps()}
            id={inputId}
            value={this.props.value.toInput()}
            onChange={e => this.processChange(e.target.value)}
            placeholder={this.props.placeholder}
            required={this.props.isRequired}
          />
          {this.infoIcon()}
        </div>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedFormInput, { stateMappings, dispatchMappings }))()
