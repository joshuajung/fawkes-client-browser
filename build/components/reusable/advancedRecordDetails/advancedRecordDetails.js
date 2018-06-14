"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const support_1 = require("fawkes-server/build/support");
const ce = require("../../../helpers/componentEnhancer");
const title_1 = require("../title");
const advancedForm_1 = require("../advancedForm/advancedForm");
const advancedFormField_1 = require("../advancedForm/advancedFormField");
const advancedFormSubmitButton_1 = require("../advancedForm/presenters/advancedFormSubmitButton");
const advancedRecordDetailsActions = require("../../../actions/advancedRecordDetails");
const stateTools_1 = require("../../../helpers/stateTools");
const advancedFormInput_1 = require("../advancedForm/presenters/advancedFormInput");
const advancedFormInputReadonly_1 = require("../advancedForm/presenters/advancedFormInputReadonly");
const advancedFormCheckbox_1 = require("../advancedForm/presenters/advancedFormCheckbox");
const advancedFormTextarea_1 = require("../advancedForm/presenters/advancedFormTextarea");
const advancedFormLookup_1 = require("../advancedForm/presenters/advancedFormLookup");
const advancedTable_1 = require("../advancedTable/advancedTable");
class AdvancedRecordDetails extends React.Component {
    componentWillMount() {
        this.setState({ renderedAt: new Date() });
    }
    componentDidMount() {
        this.props.select();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.getRecordId()) {
            this.setState({ renderedAt: new Date() });
            this.props.select();
        }
    }
    propertyDefinitionForFieldName(propertyName) {
        return this.props.propertyDefinitions.find(property => property.name === propertyName);
    }
    getRecordId() {
        return this.props.match.params.id;
    }
    subtitle() {
        if (this.getRecord())
            return this.props.advancedObject.getReadableIdentifier(this.getRecord().data);
        else
            return this.props.cl(l => l.advancedRecordDetails.create());
    }
    getRecord() {
        return stateTools_1.findAdvancedRecord(this.props.advancedRecords, this.props.advancedObject.objectName, this.getRecordId(), this.state.renderedAt);
    }
    getPresentersForDatatype(dataType, manualEditAllowed) {
        switch (dataType) {
            case support_1.AdvancedDataType.Boolean:
                return advancedFormCheckbox_1.default;
            case support_1.AdvancedDataType.Text:
                return advancedFormTextarea_1.default;
            case support_1.AdvancedDataType.Lookup:
                return advancedFormLookup_1.default;
            default:
                return manualEditAllowed ? advancedFormInput_1.default : advancedFormInputReadonly_1.default;
        }
    }
    render() {
        if (this.getRecordId() && !this.getRecord())
            return null;
        if (!this.props.propertyDefinitions)
            return null;
        const formKey = "ard-" + this.props.advancedObject.objectName;
        return (React.createElement("div", { className: "advanced-record-details" },
            React.createElement(title_1.default, { title: this.props.advancedObject.getTitleSingular(this.props.language, true), subtitle: this.subtitle() }),
            React.createElement(advancedForm_1.default, { formId: formKey, onSubmit: this.props.update, initialValues: this.getRecord() ? this.getRecord().data : {} },
                this.props.advancedObject
                    .getPropertiesPublic()
                    .filter(property => property.name !== this.props.advancedObject.getIdProperty().name)
                    .map((property, propertyIndex) => {
                    return (React.createElement(advancedFormField_1.default, { key: propertyIndex, formId: formKey, path: property.name, dataType: property.dataType, dataTypeOptions: property.dataTypeOptions, presenter: this.getPresentersForDatatype(property.dataType, property.manualEditAllowed), presenterProps: {
                            label: this.props.advancedObject.getPropertyTitle(property.name, this.props.language),
                            manualEditAllowed: property.manualEditAllowed,
                            shouldShowGoToLookupRecordButton: property.dataType === support_1.AdvancedDataType.Lookup
                                ? true
                                : undefined
                        }, module: this.props.module }));
                }),
                React.createElement(advancedFormSubmitButton_1.default, null)),
            this.props.advancedObject.lookedUpBy.map(lookedUpBy => {
                return (React.createElement("div", { className: "looked-up-by-at", key: "lookedUpBy-table-" + lookedUpBy.foreignObjectName },
                    React.createElement(advancedTable_1.default, { advancedObject: this.props.module.advancedObjects.find(ao => ao.objectName === lookedUpBy.foreignObjectName), tableKeyPrefix: formKey, queryOptions: {
                            filterBy: [
                                {
                                    propertyName: lookedUpBy.foreignPropertyName,
                                    operator: support_1.advancedObjectHelper
                                        .AdvancedObjectGetRecordListFilterByOperatorKey
                                        .Equals,
                                    constants: [
                                        new support_1.Lookup(this.getRecordId(), this.getRecordId(), {
                                            lookupObjectName: this.props.advancedObject.objectName
                                        })
                                    ]
                                }
                            ]
                        }, module: this.props.module })));
            })));
    }
}
const stateMappings = (s, props) => ({
    propertyDefinitions: props.advancedObject.getPropertiesPublic(),
    advancedRecords: s.advancedRecordDetails
});
const dispatchMappings = (d, props) => ({
    select: () => {
        d(advancedRecordDetailsActions.select(props.module.api, props.advancedObject, [props.match.params.id]));
    },
    update: body => {
        d(advancedRecordDetailsActions.update(props.module.api, props.history, props.advancedObject, props.match.params.id, body));
    }
});
exports.default = (() => ce.enhance(AdvancedRecordDetails, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedRecordDetails.js.map