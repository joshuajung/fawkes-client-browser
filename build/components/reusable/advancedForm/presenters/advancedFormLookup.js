"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const support_1 = require("fawkes-server/build/support");
const ce = require("../../../../helpers/componentEnhancer");
const icon_1 = require("../../icon");
const AdvancedRecordListActions = require("../../../../actions/advancedRecordList");
const AdvancedRecordDetailsActions = require("../../../../actions/advancedRecordDetails");
const stateTools_1 = require("../../../../helpers/stateTools");
const button_1 = require("../../button");
class AdvancedFormLookup extends React.Component {
    componentDidMount() {
        this.props.loadOptionList();
    }
    controlClasses() {
        const classes = ["control"];
        if (this.props.infoIcon)
            classes.push("has-icons-left");
        return classes.join(" ");
    }
    infoIcon() {
        if (!this.props.infoIcon)
            return null;
        return (React.createElement("span", { className: "icon is-small is-left" },
            React.createElement(icon_1.default, { icon: this.props.infoIcon })));
    }
    goToLookupRecordButton() {
        if (this.props.shouldShowGoToLookupRecordButton)
            return (React.createElement(button_1.default, { icon: "chevron-square-right", href: "/" +
                    this.props.value.options.lookupObjectName +
                    "/record/" +
                    this.props.value.value, classNames: ["is-text"] }));
        else
            return null;
    }
    getLookupObject() {
        return this.props.module.advancedObjects.find(ao => ao.objectName === this.props.value.options.lookupObjectName);
    }
    getOptions() {
        const lookupObject = this.getLookupObject();
        return this.props.advancedRecordList.data.records.map(r => {
            const lookupRecord = this.getLookupRecord(r);
            return {
                value: r,
                label: lookupRecord
                    ? lookupObject.getReadableIdentifier(lookupRecord.data)
                    : r
            };
        });
    }
    getLookupRecord(recordId) {
        return stateTools_1.findAdvancedRecord(this.props.advancedRecordDetails, this.getLookupObject().objectName, recordId, this.props.advancedRecordList.retrievedAt);
    }
    lookupRecordsToLoad() {
        if (!this.props.advancedRecordList)
            return [];
        return this.props.advancedRecordList.data.records.filter(record => !this.getLookupRecord(record));
    }
    optionsIncludingEmpty() {
        if (!this.props.isRequired)
            return [{ value: "", label: "" }, ...this.getOptions()];
        else
            return this.getOptions();
    }
    currentValueUnavailable() {
        return !this.optionsIncludingEmpty().find(option => option.value === this.props.value.toSelect());
    }
    resetValueIfUnavailable() {
        if (this.currentValueUnavailable()) {
            this.processChange(this.optionsIncludingEmpty()[0].value);
        }
    }
    processChange(value) {
        this.props.changeField(support_1.advancedDataConstructor(this.props.value.type).fromSelect(value, this.props.value.options));
    }
    componentDidUpdate(prevProps, prevState) {
        const lookupRecordsToLoad = this.lookupRecordsToLoad();
        if (lookupRecordsToLoad.length > 0)
            this.props.loadOptionDetails(lookupRecordsToLoad);
    }
    render() {
        if (!this.props.advancedRecordList)
            return null;
        const selectId = support_1.cryptoHelper.createGuid();
        return (React.createElement("div", { className: "field" },
            this.props.label ? (React.createElement("label", { className: "label", htmlFor: selectId },
                this.props.label,
                " ")) : null,
            React.createElement("div", { className: this.controlClasses() },
                React.createElement("div", { className: "select" },
                    React.createElement("select", { value: this.props.value.toSelect(), id: selectId, onChange: e => this.processChange(e.target.value), required: this.props.isRequired }, this.optionsIncludingEmpty().map((option, optionIndex) => (React.createElement("option", { value: option.value, key: optionIndex }, option.label))))),
                this.goToLookupRecordButton(),
                this.infoIcon())));
    }
}
const stateMappings = (s, props) => {
    return {
        advancedRecordList: s.advancedRecordList.instances.find(st => st.key === props.value.options.lookupObjectName + "-lookup"),
        advancedRecordDetails: s.advancedRecordDetails
    };
};
const dispatchMappings = (d, props) => ({
    loadOptionList: () => {
        d(AdvancedRecordListActions.load(props.module.api, props.module.advancedObjects.find(ao => ao.objectName === props.value.options.lookupObjectName), { pageSize: 999 }, "lookup"));
    },
    loadOptionDetails: recordIds => {
        d(AdvancedRecordDetailsActions.select(props.module.api, props.module.advancedObjects.find(ao => ao.objectName === props.value.options.lookupObjectName), recordIds));
    }
});
exports.default = (() => ce.enhance(AdvancedFormLookup, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedFormLookup.js.map