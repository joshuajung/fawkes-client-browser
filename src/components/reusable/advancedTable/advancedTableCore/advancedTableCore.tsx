// External imports
import * as React from "react"
import { advancedObjectHelper } from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"
import * as stl from "../../../../store/types"
import * as AdvancedRecordDetailsActions from "../../../../actions/advancedRecordDetails"
import AdvancedTableBodyCell from "./advancedTableBodyCell"
import AdvancedTableHeadCell from "./advancedTableHeadCell"
import { AdvancedTablePropertyToDisplay } from "../../../../helpers/advancedTable"
import Button from "../../button"

export interface ParentProps {
  advancedObject: advancedObjectHelper.AdvancedObject
  advancedRecordList: stl.AdvancedRecordList
  propertiesToDisplay: Array<AdvancedTablePropertyToDisplay>
  loadList: (
    queryOptions: advancedObjectHelper.AdvancedObjectGetRecordListOptions
  ) => void
}
interface StateProps {}
interface DispatchProps {
  loadDetails: () => void
}
interface LocalState {}

class AdvancedTableCore extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  componentDidMount() {
    this.props.loadDetails()
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.advancedRecordList.retrievedAt >
      prevProps.advancedRecordList.retrievedAt
    )
      this.props.loadDetails()
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <td />
            {this.props.propertiesToDisplay.map(fdof => {
              const property = this.props.advancedRecordList.data.properties.find(
                srf => srf.name === fdof.propertyName
              )
              return (
                <AdvancedTableHeadCell
                  property={property}
                  propertyDisplayOptions={fdof}
                  dataType={property.dataType}
                  key={"head-" + property.name}
                  currentOrderBy={
                    this.props.advancedRecordList.data.options.orderBy
                  }
                  setOrderBy={orderBy =>
                    this.props.loadList({ orderBy, pageIndex: 0 })
                  }
                />
              )
            })}
          </tr>
        </thead>
        <tbody>
          {this.props.advancedRecordList.data.records.map(recordId => (
            <tr key={recordId}>
              <td>
                <Button
                  icon="pencil"
                  href={
                    "/" +
                    this.props.advancedObject.objectName +
                    "/record/" +
                    recordId
                  }
                  classNames={["is-small"]}
                />
              </td>
              {this.props.propertiesToDisplay.map((fdof, fieldIndex) => {
                return (
                  <AdvancedTableBodyCell
                    advancedObject={this.props.advancedObject}
                    advancedRecordId={recordId}
                    listRetrievedAt={this.props.advancedRecordList.retrievedAt}
                    propertyName={fdof.propertyName}
                    key={recordId + "-" + fdof.propertyName}
                    displayProperties={fdof}
                    module={this.props.module}
                  />
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  loadDetails: () => {
    d(
      AdvancedRecordDetailsActions.select(
        props.module.api,
        props.advancedObject,
        props.advancedRecordList.data.records
      )
    )
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableCore, { stateMappings, dispatchMappings }))()
