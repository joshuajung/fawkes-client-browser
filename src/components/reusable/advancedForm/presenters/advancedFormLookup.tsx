// External imports
import * as React from "react"
import {
  advancedDataConstructor,
  Lookup,
  cryptoHelper
} from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"
import Icon from "../../icon"
import * as AdvancedRecordListActions from "../../../../actions/advancedRecordList"
import * as AdvancedRecordDetailsActions from "../../../../actions/advancedRecordDetails"
import * as stl from "../../../../store/types"
import { AdvancedRecordDetailsReducerState } from "../../../../store/reducers/advancedRecordDetails"
import { findAdvancedRecord } from "../../../../helpers/stateTools"
import Button from "../../button"

export interface ParentProps {
  changeField: (newValue: CompatibleData) => void
  value: CompatibleData
  label?: string
  infoIcon?: string
  shouldShowGoToLookupRecordButton?: boolean
  isRequired?: boolean
}
interface StateProps {
  advancedRecordList: stl.AdvancedRecordList
  advancedRecordDetails: AdvancedRecordDetailsReducerState
  advancedRecordDetailsFiltered: Array<stl.AdvancedRecordDetails>
}
interface DispatchProps {
  loadOptionList: () => void
  loadOptionDetails: (recordIds) => void
}
interface LocalState {}

export type CompatibleData = Lookup

class AdvancedFormLookup extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  componentDidMount() {
    this.props.loadOptionList()
  }
  controlClasses() {
    const classes = ["control"]
    if (this.props.infoIcon) classes.push("has-icons-left")
    return classes.join(" ")
  }
  infoIcon() {
    if (!this.props.infoIcon) return null
    return (
      <span className="icon is-small is-left">
        <Icon icon={this.props.infoIcon} />
      </span>
    )
  }
  goToLookupRecordButton() {
    if (this.props.shouldShowGoToLookupRecordButton)
      return (
        <Button
          icon="chevron-square-right"
          href={
            "/" +
            this.props.value.options.lookupObjectName +
            "/record/" +
            this.props.value.value
          }
          classNames={["is-text"]}
        />
      )
    else return null
  }
  getLookupObject() {
    return this.props.module.advancedObjects.find(
      ao => ao.objectName === this.props.value.options.lookupObjectName
    )
  }
  getOptions() {
    const lookupObject = this.getLookupObject()
    return this.props.advancedRecordList.data.records.map(r => {
      const lookupRecord = this.getLookupRecord(r)
      return {
        value: r,
        label: lookupRecord
          ? lookupObject.getReadableIdentifier(lookupRecord.data)
          : r
      }
    })
  }
  getLookupRecord(recordId) {
    return findAdvancedRecord(
      this.props.advancedRecordDetails,
      this.getLookupObject().objectName,
      recordId,
      this.props.advancedRecordList.retrievedAt
    )
  }
  lookupRecordsToLoad() {
    if (!this.props.advancedRecordList) return []
    return this.props.advancedRecordList.data.records.filter(
      record => !this.getLookupRecord(record)
    )
  }
  optionsIncludingEmpty(): Array<{ value: string; label: string }> {
    if (!this.props.isRequired)
      return [{ value: "", label: "" }, ...this.getOptions()]
    else return this.getOptions()
  }
  currentValueUnavailable(): boolean {
    return !this.optionsIncludingEmpty().find(
      option => option.value === this.props.value.toSelect()
    )
  }
  resetValueIfUnavailable() {
    if (this.currentValueUnavailable()) {
      this.processChange(this.optionsIncludingEmpty()[0].value)
    }
  }
  processChange(value: string) {
    this.props.changeField(advancedDataConstructor(
      this.props.value.type
    ).fromSelect(value, this.props.value.options) as CompatibleData)
  }
  componentDidUpdate(prevProps, prevState) {
    const lookupRecordsToLoad = this.lookupRecordsToLoad()
    if (lookupRecordsToLoad.length > 0)
      this.props.loadOptionDetails(lookupRecordsToLoad)
    // this.resetValueIfUnavailable()
  }
  render() {
    if (!this.props.advancedRecordList) return null
    const selectId = cryptoHelper.createGuid()
    return (
      <div className="field">
        {this.props.label ? (
          <label className="label" htmlFor={selectId}>
            {this.props.label}{" "}
          </label>
        ) : null}
        <div className={this.controlClasses()}>
          <div className="select">
            <select
              value={this.props.value.toSelect()}
              id={selectId}
              onChange={e => this.processChange(e.target.value)}
              required={this.props.isRequired}
            >
              {this.optionsIncludingEmpty().map((option, optionIndex) => (
                <option value={option.value} key={optionIndex}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {this.goToLookupRecordButton()}
          {this.infoIcon()}
        </div>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => {
  return {
    advancedRecordList: s.advancedRecordList.instances.find(
      st => st.key === props.value.options.lookupObjectName + "-lookup"
    ),
    advancedRecordDetails: s.advancedRecordDetails
  }
}
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  loadOptionList: () => {
    d(
      AdvancedRecordListActions.load(
        props.module.api,
        props.module.advancedObjects.find(
          ao => ao.objectName === props.value.options.lookupObjectName
        ),
        { pageSize: 999 }, // Get really many records for this lookup field.
        "lookup"
      )
    )
  },
  loadOptionDetails: recordIds => {
    d(
      AdvancedRecordDetailsActions.select(
        props.module.api,
        props.module.advancedObjects.find(
          ao => ao.objectName === props.value.options.lookupObjectName
        ),
        recordIds
      )
    )
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedFormLookup, { stateMappings, dispatchMappings }))()
