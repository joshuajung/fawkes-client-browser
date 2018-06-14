// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../../helpers/componentEnhancer"
import * as alertActions from "../../../actions/alert"

export interface ParentProps {}
interface StateProps {}
interface DispatchProps {
  triggerAlert: (alert: ce.stl.Alert) => void
}
interface LocalState {
  updatingAlert: ce.stl.Alert
}

class AlertTester extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  componentDidMount() {
    // Alerts
    this.setState({
      updatingAlert: new ce.stl.Alert({
        message: l => l.dev.helloWorld(),
        progress: 0.1,
        autoDismissTimeout: null
      })
    })
  }
  render() {
    return (
      <div>
        <button
          type="button"
          className="button"
          onClick={e => {
            this.props.triggerAlert(
              new ce.stl.Alert({
                message: l => l.dev.helloWorld()
              })
            )
          }}
        >
          Demo Alert
        </button>
        <button
          type="button"
          className="button"
          onClick={e => {
            this.props.triggerAlert(
              new ce.stl.Alert({
                message: l => l.dev.helloWorld(),
                autoDismissTimeout: null
              })
            )
          }}
        >
          Demo Alert without autoDismiss
        </button>
        <button
          type="button"
          className="button"
          onClick={e => {
            this.props.triggerAlert(this.state.updatingAlert)
          }}
        >
          Demo Alert with progress 10%
        </button>
        <button
          type="button"
          className="button"
          onClick={e => {
            this.props.triggerAlert({
              ...this.state.updatingAlert,
              progress: 1,
              autoDismissTimeout: 3000,
              type: ce.stl.AlertType.Success
            })
          }}
        >
          Update Alert to 100% progress
        </button>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  triggerAlert: (alert: ce.stl.Alert) => {
    d(alertActions.request(alert))
  }
})
export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AlertTester, { stateMappings, dispatchMappings }))()
