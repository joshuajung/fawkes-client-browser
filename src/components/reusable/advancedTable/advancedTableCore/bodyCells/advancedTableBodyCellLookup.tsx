// External imports
import * as React from "react"
import { Link } from "react-router-dom"
import { Lookup } from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../../helpers/componentEnhancer"
import { findAdvancedRecord } from "../../../../../helpers/stateTools"
import * as AdvancedRecordDetailsActions from "../../../../../actions/advancedRecordDetails"

export interface ParentProps {
  value: Lookup
  listRetrievedAt: Date
}
interface StateProps {
  lookupRecord: ce.stl.AdvancedRecordDetails
}
interface DispatchProps {
  loadLookupRecordDetails: () => void
}
interface LocalState {}

class AdvancedTableBodyCellLookup extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  componentDidMount() {
    if (!this.props.lookupRecord) this.props.loadLookupRecordDetails()
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.listRetrievedAt > prevProps.listRetrievedAt &&
      !this.props.lookupRecord
    )
      this.props.loadLookupRecordDetails()
  }
  render() {
    const lookupObject = this.props.module.advancedObjects.find(
      ao => ao.objectName === this.props.value.options.lookupObjectName
    )
    if (!this.props.lookupRecord) return <td />
    return (
      <td>
        <Link
          to={
            "/" + lookupObject.objectName + "/record/" + this.props.value.value
          }
        >
          {lookupObject.getReadableIdentifier(this.props.lookupRecord.data)}
        </Link>
      </td>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  lookupRecord: findAdvancedRecord(
    s.advancedRecordDetails,
    props.value.options.lookupObjectName,
    props.value.value,
    props.listRetrievedAt
  )
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  loadLookupRecordDetails: () => {
    d(
      AdvancedRecordDetailsActions.select(
        props.module.api,
        props.module.advancedObjects.find(
          ao => ao.objectName === props.value.options.lookupObjectName
        ),
        [props.value.value]
      )
    )
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableBodyCellLookup, {
    stateMappings,
    dispatchMappings
  }))()
