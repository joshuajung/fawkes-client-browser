// External imports
import * as React from "react"
import {
  advancedDataConstructor,
  Text,
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

export type CompatibleData = Text

class AdvancedFormTextarea extends React.Component<
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
  textareaProps(): object {
    switch (this.props.value.type) {
      default:
        return { type: this.props.typeOverride || "input" }
    }
  }
  processChange(value: string) {
    this.props.changeField(advancedDataConstructor(
      this.props.value.type
    ).fromTextarea(value, this.props.value.options) as CompatibleData)
  }
  render() {
    const textareaId = cryptoHelper.createGuid()
    return (
      <div className="field">
        {this.props.label ? (
          <label className="label" htmlFor={textareaId}>
            {this.props.label}
          </label>
        ) : null}
        <div className={this.controlClasses()}>
          <textarea
            {...this.textareaProps()}
            id={textareaId}
            value={this.props.value.toTextarea()}
            onChange={e => this.processChange(e.target.value)}
            placeholder={this.props.placeholder}
            required={this.props.isRequired}
          />
        </div>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedFormTextarea, { stateMappings, dispatchMappings }))()
