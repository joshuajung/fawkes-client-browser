// External imports
import * as React from "react"
import { Link } from "react-router-dom"
import { Integer } from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../../helpers/componentEnhancer"

export interface ParentProps {
  value: Integer
  link?: string
}
interface StateProps { }
interface DispatchProps { }
interface LocalState { }

class AdvancedTableBodyCellInteger extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
  > {
  render() {
    return (
      <td className="integer">
        {this.props.link ? (
          <Link to={this.props.link}>{this.props.value.toString()}</Link>
        ) : (
            this.props.value.toString()
          )}
      </td>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableBodyCellInteger, {
    stateMappings,
    dispatchMappings
  }))()
