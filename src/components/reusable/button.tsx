// External imports
import * as React from "react"
import { isArray } from "lodash"
import { Link } from "react-router-dom"

// Internal imports
import * as ce from "../../helpers/componentEnhancer"
import Icon from "./icon"

export interface ParentProps {
  icon?: string | Array<string>
  label?: string
  isActive?: boolean
  isSubmit?: boolean
  classNames?: Array<string>
  onClick?: (e) => any
  href?: string
}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

class Button extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  createButtonClasses() {
    const classes = ["button"]
    if (isArray(this.props.classNames)) classes.push(...this.props.classNames)
    if (this.props.isActive) classes.push("is-active")
    return classes.join(" ")
  }
  render() {
    const icon = this.props.icon ? (
      <span className="icon">
        <Icon icon={this.props.icon} />
      </span>
    ) : null
    const label = this.props.label ? <span>{this.props.label}</span> : null
    return this.props.href ? (
      <Link
        className={this.createButtonClasses()}
        to={this.props.href}
        type={this.props.isSubmit ? "submit" : "button"}
      >
        {icon}
        {label}
      </Link>
    ) : (
      <button
        className={this.createButtonClasses()}
        onClick={this.props.onClick}
        type={this.props.isSubmit ? "submit" : "button"}
      >
        {icon}
        {label}
      </button>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(Button, { stateMappings, dispatchMappings }))()
