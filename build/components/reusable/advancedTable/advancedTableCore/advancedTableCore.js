"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../../helpers/componentEnhancer");
const AdvancedRecordDetailsActions = require("../../../../actions/advancedRecordDetails");
const advancedTableBodyCell_1 = require("./advancedTableBodyCell");
const advancedTableHeadCell_1 = require("./advancedTableHeadCell");
const button_1 = require("../../button");
class AdvancedTableCore extends React.Component {
    componentDidMount() {
        this.props.loadDetails();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.advancedRecordList.retrievedAt >
            prevProps.advancedRecordList.retrievedAt)
            this.props.loadDetails();
    }
    render() {
        return (React.createElement("table", null,
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("td", null),
                    this.props.propertiesToDisplay.map(fdof => {
                        const property = this.props.advancedRecordList.data.properties.find(srf => srf.name === fdof.propertyName);
                        return (React.createElement(advancedTableHeadCell_1.default, { property: property, propertyDisplayOptions: fdof, dataType: property.dataType, key: "head-" + property.name, currentOrderBy: this.props.advancedRecordList.data.options.orderBy, setOrderBy: orderBy => this.props.loadList({ orderBy, pageIndex: 0 }) }));
                    }))),
            React.createElement("tbody", null, this.props.advancedRecordList.data.records.map(recordId => (React.createElement("tr", { key: recordId },
                React.createElement("td", null,
                    React.createElement(button_1.default, { icon: "pencil", href: "/" +
                            this.props.advancedObject.objectName +
                            "/record/" +
                            recordId, classNames: ["is-small"] })),
                this.props.propertiesToDisplay.map((fdof, fieldIndex) => {
                    return (React.createElement(advancedTableBodyCell_1.default, { advancedObject: this.props.advancedObject, advancedRecordId: recordId, listRetrievedAt: this.props.advancedRecordList.retrievedAt, propertyName: fdof.propertyName, key: recordId + "-" + fdof.propertyName, displayProperties: fdof, module: this.props.module }));
                })))))));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({
    loadDetails: () => {
        d(AdvancedRecordDetailsActions.select(props.module.api, props.advancedObject, props.advancedRecordList.data.records));
    }
});
exports.default = (() => ce.enhance(AdvancedTableCore, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedTableCore.js.map