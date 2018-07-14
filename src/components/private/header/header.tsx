// External imports
import * as React from "react"
import { Link } from "react-router-dom"

// Internal imports
import * as ce from "../../../helpers/componentEnhancer"
import * as userActions from "../../../actions/user"
import Burger from "./burger"
import NavbarItem from "./navbarItem"

export interface ParentProps {}
interface StateProps {
  burgerOpen: boolean
  userEmail: string
}
interface DispatchProps {
  logOut: () => void
}
interface LocalState {}

class Header extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <this.props.module.brand />
            </Link>
            <Burger />
          </div>
          <div
            className={
              "navbar-menu" + (this.props.burgerOpen ? " is-active" : "")
            }
          >
            <div className="navbar-start">
              {this.props.module.advancedObjects.map(
                (advancedObject, index) => (
                  <NavbarItem
                    key={"ao-" + index}
                    title={advancedObject.getTitlePlural(
                      this.props.language,
                      true
                    )}
                    href={"/" + advancedObject.objectName + "/list"}
                  />
                )
              )}
              {this.props.module.navbarItems.map((ModuleNavbarItem, index) => (
                <ModuleNavbarItem key={index} />
              ))}
            </div>
            <div className="navbar-end">
              {this.props.module.autoLoginWithAppleIdentifier ? null : (
                <NavbarItem
                  title={this.props.userEmail}
                  items={[
                    {
                      title: this.props.cl(l => l.private.navbar.logOut()),
                      onClick: this.props.logOut
                    }
                  ]}
                />
              )}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  burgerOpen: s.ui.navbarBurgerOpen,
  userEmail: s.user.userInfo.email
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  logOut: () => {
    d(userActions.logOut(props.module.api))
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(Header, { stateMappings, dispatchMappings }))()
