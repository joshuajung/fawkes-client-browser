// External imports
import * as React from "react"
import {
  advancedDataConstructor,
  Varchar,
  DateTime,
  StupidDate,
  Float,
  Integer,
  Boolean,
  cryptoHelper
} from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"
import Icon from "../../icon"

export interface ParentProps {
  changeField: (newValue: CompatibleData) => void
  value: CompatibleData
  options: Array<{ value: string; label: string }>
  includeEmptyOption: boolean
  label?: string
  placeholder?: string
  infoIcon?: string
  isRequired?: boolean
}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

export type CompatibleData =
  | Varchar
  | DateTime
  | StupidDate
  | Float
  | Integer
  | Boolean

class AdvancedFormSelect extends React.Component<
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
  optionsIncludingEmpty(): Array<{ value: string; label: string }> {
    let result: Array<{ value: string; label: string }> = []
    if (this.props.includeEmptyOption) result.push({ value: "", label: "" })
    result = [...result, ...this.props.options]
    return result
  }
  currentValueUnavailable(): boolean {
    return !this.optionsIncludingEmpty().find(
      option => option.value === this.props.value.toSelect()
    )
  }
  resetValueIfUnavailable() {
    if (this.currentValueUnavailable()) {
      this.processChange(this.optionsIncludingEmpty()[0].value)
    }
  }
  processChange(value: string) {
    this.props.changeField(advancedDataConstructor(
      this.props.value.type
    ).fromSelect(value, this.props.value.options) as CompatibleData)
  }
  componentDidUpdate(prevProps, prevState) {
    this.resetValueIfUnavailable()
  }
  render() {
    const selectId = cryptoHelper.createGuid()
    return (
      <div className="field">
        {this.props.label ? (
          <label className="label" htmlFor={selectId}>
            {this.props.label}
          </label>
        ) : null}
        <div className={this.controlClasses()}>
          <div className="select">
            <select
              value={this.props.value.toSelect()}
              id={selectId}
              onChange={e => this.processChange(e.target.value)}
              required={this.props.isRequired}
            >
              {this.optionsIncludingEmpty().map((option, optionIndex) => (
                <option value={option.value} key={optionIndex}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {this.infoIcon()}
        </div>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedFormSelect, { stateMappings, dispatchMappings }))()
