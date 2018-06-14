// External imports
import * as React from "react"
import { Text } from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../../helpers/componentEnhancer"

export interface ParentProps {
  value: Text
}
interface StateProps { }
interface DispatchProps { }
interface LocalState { }

class AdvancedTableBodyCellText extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
  > {
  render() {
    return <td>{this.props.value.toString()}</td>
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableBodyCellText, {
    stateMappings,
    dispatchMappings
  }))()
