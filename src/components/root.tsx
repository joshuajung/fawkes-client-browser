// External imports
import * as React from "react"

// Internal imports
import * as ce from "../helpers/componentEnhancer"
import Private from "./private/private"
import Public from "./public/public"
import LoadingIndicator from "./reusable/loadingIndicator"
import AlertCenter from "./alertCenter/alertCenter"

export interface ParentProps {}
interface StateProps {
  accessToken: string
  rehydrationComplete: boolean
}
interface DispatchProps {}

class Root extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate
> {
  render() {
    let componentToPresent
    if (this.props.rehydrationComplete) {
      if (this.props.accessToken) {
        componentToPresent = <Private module={this.props.module} />
      } else {
        componentToPresent = <Public module={this.props.module} />
      }
    } else {
      componentToPresent = <LoadingIndicator />
    }
    return (
      <div>
        {componentToPresent}
        <AlertCenter />
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  accessToken: s.user.accessToken,
  rehydrationComplete: s.application.rehydrationComplete
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(Root, { stateMappings, dispatchMappings }))()
