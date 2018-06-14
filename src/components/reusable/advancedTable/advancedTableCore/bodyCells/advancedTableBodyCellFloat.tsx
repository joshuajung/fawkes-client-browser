// External imports
import * as React from "react"
import { Link } from "react-router-dom"
import { Float } from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../../helpers/componentEnhancer"

export interface ParentProps {
  value: Float
  link?: string
}
interface StateProps { }
interface DispatchProps { }
interface LocalState { }

class AdvancedTableBodyCellFloat extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
  > {
  render() {
    const value = this.props.value.toString()
    return (
      <td className="integer">
        {this.props.link ? <Link to={this.props.link}>{value}</Link> : value}
      </td>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableBodyCellFloat, {
    stateMappings,
    dispatchMappings
  }))()
