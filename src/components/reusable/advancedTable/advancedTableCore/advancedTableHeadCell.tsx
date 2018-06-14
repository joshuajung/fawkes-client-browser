// External imports
import * as React from "react"
import {
  advancedObjectHelper,
  AdvancedDataType
} from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"
import { AdvancedTablePropertyToDisplay } from "../../../../helpers/advancedTable"
import Icon from "../../icon"

export interface ParentProps {
  property: advancedObjectHelper.AdvancedObjectPropertyPublic
  propertyDisplayOptions: AdvancedTablePropertyToDisplay
  dataType: AdvancedDataType
  currentOrderBy: Array<
    advancedObjectHelper.AdvancedObjectGetRecordListOrderByOption
  >
  setOrderBy: (
    orderBy: Array<
      advancedObjectHelper.AdvancedObjectGetRecordListOrderByOption
    >
  ) => void
}
interface StateProps {}
interface DispatchProps {}
interface LocalState {}

class AdvancedTableHeadCell extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  currentFirstOrderByCriterium() {
    return this.props.currentOrderBy[0]
  }
  isOrderedByThis() {
    return (
      this.currentFirstOrderByCriterium() &&
      this.currentFirstOrderByCriterium().propertyName ===
        this.props.propertyDisplayOptions.propertyName
    )
  }
  isOrderedByThisAscending() {
    return (
      this.isOrderedByThis() && !this.currentFirstOrderByCriterium().descending
    )
  }
  generateNewOrderBy(): Array<
    advancedObjectHelper.AdvancedObjectGetRecordListOrderByOption
  > {
    const nowOrderByDescending = this.isOrderedByThisAscending()
    return [
      {
        propertyName: this.props.propertyDisplayOptions.propertyName,
        descending: nowOrderByDescending
      },
      ...this.props.currentOrderBy
    ].splice(0, 5)
  }
  generateCssClass(): string {
    let classesArray = []
    if (this.props.property.orderByAllowed) classesArray.push("sortable")
    return classesArray.join(" ")
  }
  render() {
    return (
      <th
        onClick={
          this.props.property.orderByAllowed
            ? e => this.props.setOrderBy(this.generateNewOrderBy())
            : null
        }
        className={this.generateCssClass()}
        style={{ width: this.props.propertyDisplayOptions.defaultWidth }}
      >
        <span>
          {(this.props.propertyDisplayOptions &&
            this.props.propertyDisplayOptions.columnTitle) ||
            ""}
        </span>
        {this.isOrderedByThis() ? (
          <span className="sort-indicator">
            {this.isOrderedByThisAscending() ? <Icon icon="sort-up" /> : null}
            {!this.isOrderedByThisAscending() ? (
              <Icon icon="sort-down" />
            ) : null}
          </span>
        ) : null}
      </th>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableHeadCell, { stateMappings, dispatchMappings }))()
