// External imports
import * as React from "react"
import { Link } from "react-router-dom"

// Internal imports
import * as ce from "../../../helpers/componentEnhancer"

export interface ParentProps {
  title: string
  href?: any
  onClick?: any
  items?: Array<{
    title: string
    href?: any
    onClick?: any
  }>
}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

class NavbarItem extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return this.props.items ? (
      <div className={"navbar-item has-dropdown is-hoverable"}>
        {this.props.href ? (
          <Link className="navbar-link" to={this.props.href}>
            {this.props.title}
          </Link>
        ) : (
          <a className="navbar-link" onClick={this.props.onClick}>
            {this.props.title}
          </a>
        )}
        {this.props.items ? (
          <div className="navbar-dropdown">
            {this.props.items.map(
              (item, index) =>
                item.href ? (
                  <Link className="navbar-item" to={item.href} key={index}>
                    {item.title}
                  </Link>
                ) : (
                  <a className="navbar-item" onClick={item.onClick} key={index}>
                    {item.title}
                  </a>
                )
            )}
          </div>
        ) : null}
      </div>
    ) : this.props.href ? (
      <Link className="navbar-item" to={this.props.href}>
        {this.props.title}
      </Link>
    ) : (
      <a className="navbar-item" onClick={this.props.onClick}>
        {this.props.title}
      </a>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(NavbarItem, { stateMappings, dispatchMappings }))()
