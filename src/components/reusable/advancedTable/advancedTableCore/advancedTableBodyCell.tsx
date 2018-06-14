// External imports
import * as React from "react"
import {
  AdvancedDataType,
  AdvancedData,
  Varchar,
  Boolean,
  DateTime,
  Float,
  Integer,
  StupidDate,
  Text,
  Lookup,
  advancedObjectHelper
} from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"
import AdvancedTableBodyCellBoolean from "./bodyCells/advancedTableBodyCellBoolean"
import AdvancedTableBodyCellVarchar from "./bodyCells/advancedTableBodyCellVarchar"
import AdvancedTableBodyCellText from "./bodyCells/advancedTableBodyCellText"
import AdvancedTableBodyCellInteger from "./bodyCells/advancedTableBodyCellInteger"
import AdvancedTableBodyCellFloat from "./bodyCells/advancedTableBodyCellFloat"
import AdvancedTableBodyCellDateTime from "./bodyCells/advancedTableBodyCellDateTime"
import AdvancedTableBodyCellStupidDate from "./bodyCells/advancedTableBodyCellStupidDate"
import AdvancedTableBodyCellLookup from "./bodyCells/advancedTableBodyCellLookup"
import { AdvancedTablePropertyToDisplay } from "../../../../helpers/advancedTable"
import { findAdvancedRecordProperty } from "../../../../helpers/stateTools"

export interface ParentProps {
  advancedObject: advancedObjectHelper.AdvancedObject
  advancedRecordId: string
  listRetrievedAt: Date
  propertyName: string
  displayProperties: AdvancedTablePropertyToDisplay
}
interface StateProps {
  value: AdvancedData
}
interface DispatchProps {}
interface LocalState {}

class AdvancedTableBodyCell extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    if (!this.props.value) return <td />
    switch (this.props.value.type) {
      case AdvancedDataType.Varchar:
        return (
          <AdvancedTableBodyCellVarchar
            value={this.props.value as Varchar}
            link={
              this.props.displayProperties.link &&
              this.props.displayProperties.link(
                this.props.advancedRecordId,
                this.props.value.value
              )
            }
          />
        )
      case AdvancedDataType.Text:
        return <AdvancedTableBodyCellText value={this.props.value as Text} />
      case AdvancedDataType.Integer:
        return (
          <AdvancedTableBodyCellInteger
            value={this.props.value as Integer}
            link={
              this.props.displayProperties.link &&
              this.props.displayProperties.link(
                this.props.advancedRecordId,
                this.props.value.value
              )
            }
          />
        )
      case AdvancedDataType.Float:
        return (
          <AdvancedTableBodyCellFloat
            value={this.props.value as Float}
            link={
              this.props.displayProperties.link &&
              this.props.displayProperties.link(
                this.props.advancedRecordId,
                this.props.value.value
              )
            }
          />
        )
      case AdvancedDataType.Boolean:
        return (
          <AdvancedTableBodyCellBoolean value={this.props.value as Boolean} />
        )
      case AdvancedDataType.DateTime:
        return (
          <AdvancedTableBodyCellDateTime
            value={this.props.value as DateTime}
            link={
              this.props.displayProperties.link &&
              this.props.displayProperties.link(
                this.props.advancedRecordId,
                this.props.value.value
              )
            }
          />
        )
      case AdvancedDataType.StupidDate:
        return (
          <AdvancedTableBodyCellStupidDate
            value={this.props.value as StupidDate}
            link={
              this.props.displayProperties.link &&
              this.props.displayProperties.link(
                this.props.advancedRecordId,
                this.props.value.value
              )
            }
          />
        )
      case AdvancedDataType.Lookup:
        return (
          <AdvancedTableBodyCellLookup
            value={this.props.value as Lookup}
            listRetrievedAt={this.props.listRetrievedAt}
            module={this.props.module}
          />
        )
    }
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  value: findAdvancedRecordProperty(
    s.advancedRecordDetails,
    props.advancedObject.objectName,
    props.advancedRecordId,
    props.propertyName,
    props.listRetrievedAt
  )
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableBodyCell, { stateMappings, dispatchMappings }))()
