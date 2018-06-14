// External imports
import * as React from "react"
import {
  Text,
  Varchar,
  DateTime,
  StupidDate,
  Float,
  Integer,
  Boolean
} from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"

export interface ParentProps {
  value: CompatibleData
  label?: string
}
interface StateProps { }
interface DispatchProps { }
interface LocalState { }

export type CompatibleData =
  | Varchar
  | Text
  | DateTime
  | StupidDate
  | Float
  | Integer
  | Boolean

class AdvancedDataSpan extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
  > {
  render() {
    return (
      <span>
        {this.props.label}: {this.props.value.toString()}
      </span>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedDataSpan, { stateMappings, dispatchMappings }))()
