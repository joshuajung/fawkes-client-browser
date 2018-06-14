// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../helpers/componentEnhancer"
import Alert from "./alert"

export interface ParentProps {}
interface StateProps {
  alerts: Array<ce.stl.Alert>
}
interface DispatchProps {}
interface LocalState {}

class AlertCenter extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return (
      <div className="alert-center">
        <section>
          {this.props.alerts
            .slice(0, 1)
            .map(alert => <Alert alert={alert} key={alert.id} />)}
        </section>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  alerts: s.application.alerts
    .filter(a => !a.dismissed)
    .sort((a, b) => a.created.getTime() - b.created.getTime())
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AlertCenter, { stateMappings, dispatchMappings }))()
