// External imports
import * as React from "react"
import { Boolean } from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../../helpers/componentEnhancer"
import Icon from "../../../icon"

export interface ParentProps {
  value: Boolean
}
interface StateProps { }
interface DispatchProps { }
interface LocalState { }

class AdvancedTableBodyCellBoolean extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
  > {
  render() {
    const cellContent = this.props.value.isNil() ? (
      <Icon icon="question-square" />
    ) : this.props.value.value ? (
      <Icon icon="check-square" />
    ) : (
          <Icon icon="times-square" />
        )
    return <td className="boolean">{cellContent}</td>
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableBodyCellBoolean, {
    stateMappings,
    dispatchMappings
  }))()
