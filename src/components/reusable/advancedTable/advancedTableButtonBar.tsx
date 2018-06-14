// External imports
import * as React from "react"

// Internal imports
import * as ce from "../../../helpers/componentEnhancer"
import * as stl from "../../../store/types"
import * as AdvancedRecordListActions from "../../../actions/advancedRecordList"
import Button from "../button"

export interface ParentProps {
  table: stl.AdvancedTable
  newItemLinkPath: string
}
interface StateProps {}
interface DispatchProps {
  toggleFilterPanel: () => void
}
interface LocalState {}

class AdvancedTableButtonBar extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    return (
      <>
        <Button
          icon={["far", "filter"]}
          isActive={this.props.table.ui.filtersExpanded}
          onClick={this.props.toggleFilterPanel}
        />
        <Button icon={["far", "plus"]} href={this.props.newItemLinkPath} />
      </>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  toggleFilterPanel: () => {
    d(AdvancedRecordListActions.toggleFilterPanel(props.table.key))
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableButtonBar, { stateMappings, dispatchMappings }))()
