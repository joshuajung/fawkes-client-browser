// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../helpers/componentEnhancer"

export interface ParentProps {
  title: string
  subtitle?: string
}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

class Title extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return (
      <div className="columns">
        <div className="column">
          <h1>{this.props.title}</h1>
          {this.props.subtitle ? <h2>{this.props.subtitle}</h2> : null}
        </div>
        <div className="column">
          <div className="buttons is-right">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(Title, { stateMappings, dispatchMappings }))()
