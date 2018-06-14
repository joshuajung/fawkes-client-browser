// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../helpers/componentEnhancer"
import * as alertActions from "../../actions/alert"
import Icon from "../reusable/icon"

export interface ParentProps {
  alert: ce.stl.Alert
}
interface StateProps {}
interface DispatchProps {
  dismissAlert: (id: string) => void
}
interface LocalState {}

class Alert extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    let articleClasses = ["alert"]
    switch (this.props.alert.type) {
      case ce.stl.AlertType.Success:
        articleClasses.push("is-success")
        break
      case ce.stl.AlertType.Error:
        articleClasses.push("is-danger")
        break
      case ce.stl.AlertType.Warning:
        articleClasses.push("is-warning")
        break
      case ce.stl.AlertType.Info:
        articleClasses.push("is-info")
        break
    }
    return (
      <article className={articleClasses.join(" ")}>
        <div className="alert-title">
          <p>
            {this.props.alert.progress && this.props.alert.progress < 1 ? (
              <Icon icon="spinner" spin />
            ) : null}{" "}
            {this.props.cl(this.props.alert.title)}
          </p>
          <button
            className="alert-dismiss"
            onClick={e => {
              this.props.dismissAlert(this.props.alert.id)
            }}
          />
        </div>
        <div className="alert-body">
          {this.props.cl(this.props.alert.message)}
        </div>
      </article>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  dismissAlert: (id: string) => {
    d(alertActions.dismiss(id))
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(Alert, { stateMappings, dispatchMappings }))()
