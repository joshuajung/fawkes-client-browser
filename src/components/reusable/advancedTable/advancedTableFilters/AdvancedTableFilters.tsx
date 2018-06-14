// External imports
import * as React from "react"
import { advancedObjectHelper, Varchar } from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../../helpers/componentEnhancer"
import * as stl from "../../../../store/types"
import AdvancedForm from "../../advancedForm/advancedForm"
import AdvancedFormArray from "../../advancedForm/advancedFormArray"
import { AdvancedTablePropertyToDisplay } from "../../../../helpers/advancedTable"
import AdvancedTableFilter from "./advancedTableFilter"
import * as advancedFormActions from "../../../../actions/advancedForm"
import Button from "../../button"

export interface ParentProps {
  table: stl.AdvancedRecordList
  propertiesToDisplay: Array<AdvancedTablePropertyToDisplay>
  setFilters: (
    newFilters: Array<
      advancedObjectHelper.AdvancedObjectGetRecordListFilterByOption
    >
  ) => void
}
interface StateProps {}
interface DispatchProps {
  add: () => void
}
interface LocalState {}

class AdvancedTableFilters extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  render() {
    const formKey = "at-filters-" + this.props.table.key
    return (
      <div className="filters">
        <AdvancedForm
          formId={formKey}
          onSubmit={formData =>
            this.props.setFilters(
              formData.filters.map(formFilter => ({
                propertyName: formFilter.propertyName.value,
                operator: formFilter.operator.value,
                constants: formFilter.constants
              }))
            )
          }
          initialValues={{
            filters:
              this.props.table.data.options.filterBy.length > 0
                ? this.props.table.data.options.filterBy.map(initialFilter => ({
                    propertyName: new Varchar(initialFilter.propertyName),
                    operator: new Varchar(initialFilter.operator),
                    constants: initialFilter.constants
                  }))
                : // Add an empty Filter in case there is none
                  [
                    {
                      propertyName: new Varchar(
                        this.props.propertiesToDisplay[0].propertyName
                      ),
                      operator: new Varchar(null),
                      constants: [new Varchar(null)]
                    }
                  ]
          }}
        >
          <AdvancedFormArray
            formId={formKey}
            path="filters"
            presenter={AdvancedTableFilter}
            presenterProps={{
              propertiesToDisplay: this.props.propertiesToDisplay,
              propertyDefinitions: this.props.table.data.properties
            }}
            module={this.props.module}
          />
          <div className="buttons is-right">
            <Button
              onClick={this.props.add}
              icon={["far", "plus"]}
              label={this.props.cl(l => l.advancedTable.filters.add())}
            />
            <Button
              classNames={["is-primary"]}
              label={this.props.cl(l =>
                l.advancedTable.filters.apply()
              )}
              isSubmit={true}
            />
          </div>
        </AdvancedForm>
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  add: () =>
    d(
      advancedFormActions.addElementToArray(
        "at-filters-" + props.table.key,
        "filters",
        {
          propertyName: new Varchar(props.propertiesToDisplay[0].propertyName),
          operator: new Varchar(null),
          constants: [new Varchar(null)]
        }
      )
    )
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedTableFilters, { stateMappings, dispatchMappings }))()
