// External imports
import * as React from "react"
import { advancedObjectHelper } from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../helpers/componentEnhancer"
import * as AdvancedRecordListActions from "../../../actions/advancedRecordList"
import AdvancedTableCore from "./advancedTableCore/advancedTableCore"
import AdvancedTablePagination from "./advancedTablePagination/advancedTablePagination"
import AdvancedTableFilters from "./advancedTableFilters/advancedTableFilters"
import AdvancedTableButtonBar from "./advancedTableButtonBar"
import Title from "../title"
import * as stl from "../../../store/types"
import { AdvancedTablePropertyToDisplay } from "../../../helpers/advancedTable"

export interface ParentProps {
  advancedObject: advancedObjectHelper.AdvancedObject
  tableKeyPrefix?: string
  queryOptions?: advancedObjectHelper.AdvancedObjectGetRecordListOptions
}
interface StateProps {
  advancedRecordList: stl.AdvancedRecordList
  advancedTable: stl.AdvancedTable
}
interface DispatchProps {
  load: (
    queryOptions: advancedObjectHelper.AdvancedObjectGetRecordListOptions
  ) => void
}
interface LocalState {}

class AdvancedTable extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  componentDidMount() {
    this.props.load(this.props.queryOptions || {})
  }
  propertiesToDisplay(): Array<AdvancedTablePropertyToDisplay> {
    return this.props.advancedObject
      .getPropertiesPublic()
      .filter(property => property.showInDefaultList)
      .map((property, propertyIndex) => ({
        propertyName: property.name,
        columnTitle: this.props.advancedObject.getPropertyTitle(
          property.name,
          this.props.language
        ),
        link: /*(recordId, cellValue) =>
          propertyIndex === 0
            ? "/" + this.props.advancedObject.objectName + "/record/" + recordId
            : */ null // This used to automatically link the first column to the record - replaced by individual Button
      }))
  }
  render() {
    return this.props.advancedRecordList ? (
      <div className="advanced-table">
        <Title
          title={this.props.advancedObject.getTitlePlural(
            this.props.language,
            true
          )}
        >
          <AdvancedTableButtonBar
            table={this.props.advancedTable}
            newItemLinkPath={
              "/" + this.props.advancedObject.objectName + "/record/"
            }
          />
        </Title>
        {this.props.advancedTable.ui.filtersExpanded ? (
          <AdvancedTableFilters
            table={this.props.advancedRecordList}
            propertiesToDisplay={this.propertiesToDisplay()}
            setFilters={(
              newFilters: Array<
                advancedObjectHelper.AdvancedObjectGetRecordListFilterByOption
              >
            ) => this.props.load({ filterBy: newFilters, pageIndex: 0 })}
            module={this.props.module}
          />
        ) : null}
        <AdvancedTableCore
          advancedRecordList={this.props.advancedRecordList}
          advancedObject={this.props.advancedObject}
          propertiesToDisplay={this.propertiesToDisplay()}
          loadList={this.props.load}
          module={this.props.module}
        />
        <AdvancedTablePagination
          count={this.props.advancedRecordList.data.count}
          currentPageIndex={
            this.props.advancedRecordList.data.options.pageIndex
          }
          pageSize={this.props.advancedRecordList.data.options.pageSize}
          goToPage={(pageIndex: number) => this.props.load({ pageIndex })}
        />
      </div>
    ) : null
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  advancedRecordList: s.advancedRecordList.instances.find(
    st =>
      st.key ===
      props.advancedObject.objectName +
        "-" +
        (props.tableKeyPrefix || "default")
  ),
  advancedTable: s.advancedTable.tables.find(
    st =>
      st.key ===
      props.advancedObject.objectName +
        "-" +
        (props.tableKeyPrefix || "default")
  )
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  load: (
    queryOptions: advancedObjectHelper.AdvancedObjectGetRecordListOptions
  ) => {
    d(
      AdvancedRecordListActions.load(
        props.module.api,
        props.advancedObject,
        queryOptions,
        props.tableKeyPrefix || "default"
      )
    )
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTable, { stateMappings, dispatchMappings }))()
