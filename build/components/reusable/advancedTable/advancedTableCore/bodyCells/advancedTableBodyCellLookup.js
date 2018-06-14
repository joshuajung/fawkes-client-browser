"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const ce = require("../../../../../helpers/componentEnhancer");
const stateTools_1 = require("../../../../../helpers/stateTools");
const AdvancedRecordDetailsActions = require("../../../../../actions/advancedRecordDetails");
class AdvancedTableBodyCellLookup extends React.Component {
    componentDidMount() {
        if (!this.props.lookupRecord)
            this.props.loadLookupRecordDetails();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.listRetrievedAt > prevProps.listRetrievedAt &&
            !this.props.lookupRecord)
            this.props.loadLookupRecordDetails();
    }
    render() {
        const lookupObject = this.props.module.advancedObjects.find(ao => ao.objectName === this.props.value.options.lookupObjectName);
        if (!this.props.lookupRecord)
            return React.createElement("td", null);
        return (React.createElement("td", null,
            React.createElement(react_router_dom_1.Link, { to: "/" + lookupObject.objectName + "/record/" + this.props.value.value }, lookupObject.getReadableIdentifier(this.props.lookupRecord.data))));
    }
}
const stateMappings = (s, props) => ({
    lookupRecord: stateTools_1.findAdvancedRecord(s.advancedRecordDetails, props.value.options.lookupObjectName, props.value.value, props.listRetrievedAt)
});
const dispatchMappings = (d, props) => ({
    loadLookupRecordDetails: () => {
        d(AdvancedRecordDetailsActions.select(props.module.api, props.module.advancedObjects.find(ao => ao.objectName === props.value.options.lookupObjectName), [props.value.value]));
    }
});
exports.default = (() => ce.enhance(AdvancedTableBodyCellLookup, {
    stateMappings,
    dispatchMappings
}))();
//# sourceMappingURL=advancedTableBodyCellLookup.js.map