// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../../helpers/componentEnhancer"

export interface ParentProps {}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

class SmartComponent extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return <div />
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(SmartComponent, { stateMappings, dispatchMappings }))()
