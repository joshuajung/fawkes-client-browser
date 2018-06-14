// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../../helpers/componentEnhancer"
import * as uiActions from "../../../actions/ui"

export interface ParentProps {}
interface StateProps {
  burgerOpen: boolean
}
interface DispatchProps {
  toggleBurger: () => void
}
interface LocalState {}

class Burger extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return (
      <div
        className={"navbar-burger" + (this.props.burgerOpen ? " is-active" : "")}
        onClick={this.props.toggleBurger}
      >
        <span />
        <span />
        <span />
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  burgerOpen: s.ui.navbarBurgerOpen
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  toggleBurger: () => {
    d(uiActions.toggleNavbarBurger())
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(Burger, { stateMappings, dispatchMappings }))()
