// External imports
import * as React from "react"
import {
  advancedObjectHelper,
  AdvancedDataType,
  Lookup
} from "fawkes-server/build/support"

// Internal imports
import * as ce from "../../../helpers/componentEnhancer"
import Title from "../title"
import AdvancedForm from "../advancedForm/advancedForm"
import AdvancedFormField from "../advancedForm/advancedFormField"
import AdvancedFormSubmitButton from "../advancedForm/presenters/advancedFormSubmitButton"
import * as advancedRecordDetailsActions from "../../../actions/advancedRecordDetails"
import { findAdvancedRecord } from "../../../helpers/stateTools"
import AdvancedFormInput from "../advancedForm/presenters/advancedFormInput"
import AdvancedFormInputReadonly from "../advancedForm/presenters/advancedFormInputReadonly"
import AdvancedFormCheckbox from "../advancedForm/presenters/advancedFormCheckbox"
// import AdvancedFormSelect from "../advancedForm/presenters/advancedFormSelect"
import AdvancedFormTextarea from "../advancedForm/presenters/advancedFormTextarea"
import AdvancedFormLookup from "../advancedForm/presenters/advancedFormLookup"
import AdvancedTable from "../advancedTable/advancedTable"

export interface ParentProps {
  advancedObject: advancedObjectHelper.AdvancedObject
}
interface StateProps {
  propertyDefinitions: Array<advancedObjectHelper.AdvancedObjectPropertyPublic>
  advancedRecords: any
}
interface DispatchProps {
  select: () => void
  update: (body) => void
}
interface LocalState {
  renderedAt: Date
}

class AdvancedRecordDetails extends React.Component<
  ParentProps & StateProps & DispatchProps & ce.EnhancedPropsPrivate,
  LocalState
> {
  componentWillMount() {
    this.setState({ renderedAt: new Date() })
  }
  componentDidMount() {
    this.props.select()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.getRecordId()) {
      this.setState({ renderedAt: new Date() })
      this.props.select()
    }
  }
  propertyDefinitionForFieldName(
    propertyName: string
  ): advancedObjectHelper.AdvancedObjectPropertyPublic {
    return this.props.propertyDefinitions.find(
      property => property.name === propertyName
    )
  }
  getRecordId(): string {
    return this.props.match.params.id
  }
  subtitle(): string {
    if (this.getRecord())
      return this.props.advancedObject.getReadableIdentifier(
        this.getRecord().data
      )
    else return this.props.cl(l => l.advancedRecordDetails.create())
  }
  getRecord() {
    return findAdvancedRecord(
      this.props.advancedRecords,
      this.props.advancedObject.objectName,
      this.getRecordId(),
      this.state.renderedAt
    )
  }
  getPresentersForDatatype(
    dataType: AdvancedDataType,
    manualEditAllowed: boolean
  ) {
    switch (dataType) {
      case AdvancedDataType.Boolean:
        return AdvancedFormCheckbox
      case AdvancedDataType.Text:
        return AdvancedFormTextarea
      case AdvancedDataType.Lookup:
        return AdvancedFormLookup
      default:
        return manualEditAllowed ? AdvancedFormInput : AdvancedFormInputReadonly
    }
  }
  render() {
    // Do not initialize form until record has loaded
    if (this.getRecordId() && !this.getRecord()) return null
    if (!this.props.propertyDefinitions) return null
    // Otherwise return form
    const formKey = "ard-" + this.props.advancedObject.objectName
    return (
      <div className="advanced-record-details">
        <Title
          title={this.props.advancedObject.getTitleSingular(
            this.props.language,
            true
          )}
          subtitle={this.subtitle()}
        />
        <AdvancedForm
          formId={formKey}
          onSubmit={this.props.update}
          initialValues={this.getRecord() ? this.getRecord().data : {}}
        >
          {this.props.advancedObject
            .getPropertiesPublic()
            .filter(
              property =>
                property.name !== this.props.advancedObject.getIdProperty().name
            )
            .map((property, propertyIndex) => {
              return (
                <AdvancedFormField
                  key={propertyIndex}
                  formId={formKey}
                  path={property.name}
                  dataType={property.dataType}
                  dataTypeOptions={property.dataTypeOptions}
                  presenter={this.getPresentersForDatatype(
                    property.dataType,
                    property.manualEditAllowed
                  )}
                  presenterProps={{
                    label: this.props.advancedObject.getPropertyTitle(
                      property.name,
                      this.props.language
                    ),
                    manualEditAllowed: property.manualEditAllowed,
                    shouldShowGoToLookupRecordButton:
                      property.dataType === AdvancedDataType.Lookup
                        ? true
                        : undefined
                  }}
                  module={this.props.module}
                />
              )
            })}
          <AdvancedFormSubmitButton />
        </AdvancedForm>
        {this.props.advancedObject.lookedUpBy.map(lookedUpBy => {
          return (
            <div
              className="looked-up-by-at"
              key={"lookedUpBy-table-" + lookedUpBy.foreignObjectName}
            >
              <AdvancedTable
                advancedObject={this.props.module.advancedObjects.find(
                  ao => ao.objectName === lookedUpBy.foreignObjectName
                )}
                tableKeyPrefix={formKey}
                queryOptions={{
                  filterBy: [
                    {
                      propertyName: lookedUpBy.foreignPropertyName,
                      operator:
                        advancedObjectHelper
                          .AdvancedObjectGetRecordListFilterByOperatorKey
                          .Equals,
                      constants: [
                        new Lookup(this.getRecordId(), this.getRecordId(), {
                          lookupObjectName: this.props.advancedObject.objectName
                        })
                      ]
                    }
                  ]
                }}
                module={this.props.module}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

const stateMappings: ce.StateMappings<ParentProps> = (s, props) => ({
  propertyDefinitions: props.advancedObject.getPropertiesPublic(),
  advancedRecords: s.advancedRecordDetails
})
const dispatchMappings: ce.DispatchMappings<ParentProps> = (d, props) => ({
  select: () => {
    d(
      advancedRecordDetailsActions.select(
        props.module.api,
        props.advancedObject,
        [props.match.params.id]
      )
    )
  },
  update: body => {
    d(
      advancedRecordDetailsActions.update(
        props.module.api,
        props.history,
        props.advancedObject,
        props.match.params.id,
        body
      )
    )
  }
})

export default ((): React.ComponentType<ParentProps & ce.EnhancedPropsPublic> =>
  ce.enhance(AdvancedRecordDetails, { stateMappings, dispatchMappings }))()
