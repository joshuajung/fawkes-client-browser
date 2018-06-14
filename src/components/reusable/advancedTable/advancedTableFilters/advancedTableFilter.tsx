// External imports
import * as React from "react"
import {
  advancedObjectHelper,
  AdvancedData,
  AdvancedDataType,
  advancedDataConstructor,
  Varchar
} from "fawkes-server/build/support"
import { get } from "lodash"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"
import AdvancedFormField from "../../advancedForm/advancedFormField"
import AdvancedFormSelect from "../../advancedForm/presenters/advancedFormSelect"
import AdvancedFormArray from "../../advancedForm/advancedFormArray"
import AdvancedTableFilterConstant from "./advancedTableFilterConstant"
import * as advancedFormActions from "../../../../actions/advancedForm"
import { AdvancedTablePropertyToDisplay } from "../../../../helpers/advancedTable"
import Button from "../../button"

export interface ParentProps {
  formId: string
  path: string
  propertiesToDisplay: Array<AdvancedTablePropertyToDisplay>
  propertyDefinitions: Array<advancedObjectHelper.AdvancedObjectPropertyPublic>
}
interface StateProps {
  filter: AdvancedTableFilterFormData
}
interface DispatchProps {
  remove: () => void
  resetConstants: (newConstants: Array<AdvancedData>) => void
}
interface LocalState {}

interface AdvancedTableFilterFormData {
  propertyName: Varchar
  operator: Varchar
  constants: Array<AdvancedData>
}

class AdvancedTableFilterLine extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  resetConstants(
    filter: AdvancedTableFilterFormData,
    resetConstantsAction: (newConstants: Array<AdvancedData>) => void
  ) {
    const constantCount = advancedObjectHelper.AdvancedObjectGetRecordListFilterByOperators.find(
      operator => operator.key === filter.operator.value
    ).constantCount
    const propertyDefinition = this.propertyDefinition(
      filter.propertyName.value
    )
    const constructor = advancedDataConstructor(propertyDefinition.dataType)
    resetConstantsAction(
      Array(constantCount).fill(
        new constructor(
          undefined,
          undefined,
          propertyDefinition.dataTypeOptions
        )
      )
    )
  }
  propertyDefinition(propertyName: string) {
    return this.props.propertyDefinitions.find(f => f.name === propertyName)
  }
  componentWillReceiveProps(newProps) {
    // Opportunity for optimization: only reset constants if constant count or data type changes
    if (
      this.props.filter.propertyName.value !==
        newProps.filter.propertyName.value ||
      this.props.filter.operator.value !== newProps.filter.operator.value
    ) {
      this.resetConstants(newProps.filter, newProps.resetConstants)
    }
  }
  render() {
    return (
      <div className="columns">
        <div className="column">
          <AdvancedFormField
            formId={this.props.formId}
            path={`${this.props.path}.propertyName`}
            dataType={AdvancedDataType.Varchar}
            presenter={AdvancedFormSelect}
            presenterProps={{
              options: this.props.propertiesToDisplay
                .filter(
                  propertyToDisplay =>
                    this.props.propertyDefinitions.find(
                      propertyDefinition =>
                        propertyDefinition.name ===
                        propertyToDisplay.propertyName
                    ).filterByAllowed
                )
                .map(propertyToDisplay => ({
                  value: propertyToDisplay.propertyName,
                  label: propertyToDisplay.columnTitle
                }))
                .sort((option1, option2) =>
                  option1.label.localeCompare(option2.label)
                )
            }}
          />
        </div>
        <div className="column">
          <AdvancedFormField
            formId={this.props.formId}
            path={`${this.props.path}.operator`}
            dataType={AdvancedDataType.Varchar}
            presenter={AdvancedFormSelect}
            presenterProps={{
              options: advancedObjectHelper.AdvancedObjectGetRecordListFilterByOperators.filter(
                operator =>
                  operator.availableFor.find(
                    availableFor =>
                      availableFor ===
                      this.propertyDefinition(
                        this.props.filter.propertyName.value
                      ).dataType
                  )
              ).map(operator => ({
                value: operator.key,
                label: this.props.cl(l =>
                  l.advancedTable.filters.operators[operator.key]()
                )
              }))
            }}
          />
        </div>
        <div className="column columns">
          <AdvancedFormArray
            formId={this.props.formId}
            path={`${this.props.path}.constants`}
            presenter={AdvancedTableFilterConstant}
            presenterProps={{
              filter: this.props.filter,
              dataType: this.propertyDefinition(
                this.props.filter.propertyName.value
              ).dataType,
              dataTypeOptions: this.propertyDefinition(
                this.props.filter.propertyName.value
              ).dataTypeOptions
            }}
            module={this.props.module}
          />
        </div>
        <div className="column is-narrow">
          <Button
            onClick={this.props.remove}
            classNames={["remove-filter"]}
            icon={["far", "minus"]}
          />
        </div>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  filter: get(
    s.advancedForm.forms.find(form => props.formId === form.id).fields,
    props.path
  )
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  remove: () =>
    d(advancedFormActions.removeElementFromArray(props.formId, props.path)),
  resetConstants: newConstants =>
    d(
      advancedFormActions.changeField(
        props.formId,
        props.path + ".constants",
        newConstants
      )
    )
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableFilterLine, { stateMappings, dispatchMappings }))()
