"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const support_1 = require("fawkes-server/build/support");
const ce = require("../../../../helpers/componentEnhancer");
const advancedTableBodyCellBoolean_1 = require("./bodyCells/advancedTableBodyCellBoolean");
const advancedTableBodyCellVarchar_1 = require("./bodyCells/advancedTableBodyCellVarchar");
const advancedTableBodyCellText_1 = require("./bodyCells/advancedTableBodyCellText");
const advancedTableBodyCellInteger_1 = require("./bodyCells/advancedTableBodyCellInteger");
const advancedTableBodyCellFloat_1 = require("./bodyCells/advancedTableBodyCellFloat");
const advancedTableBodyCellDateTime_1 = require("./bodyCells/advancedTableBodyCellDateTime");
const advancedTableBodyCellStupidDate_1 = require("./bodyCells/advancedTableBodyCellStupidDate");
const advancedTableBodyCellLookup_1 = require("./bodyCells/advancedTableBodyCellLookup");
const stateTools_1 = require("../../../../helpers/stateTools");
class AdvancedTableBodyCell extends React.Component {
    render() {
        if (!this.props.value)
            return React.createElement("td", null);
        switch (this.props.value.type) {
            case support_1.AdvancedDataType.Varchar:
                return (React.createElement(advancedTableBodyCellVarchar_1.default, { value: this.props.value, link: this.props.displayProperties.link &&
                        this.props.displayProperties.link(this.props.advancedRecordId, this.props.value.value) }));
            case support_1.AdvancedDataType.Text:
                return React.createElement(advancedTableBodyCellText_1.default, { value: this.props.value });
            case support_1.AdvancedDataType.Integer:
                return (React.createElement(advancedTableBodyCellInteger_1.default, { value: this.props.value, link: this.props.displayProperties.link &&
                        this.props.displayProperties.link(this.props.advancedRecordId, this.props.value.value) }));
            case support_1.AdvancedDataType.Float:
                return (React.createElement(advancedTableBodyCellFloat_1.default, { value: this.props.value, link: this.props.displayProperties.link &&
                        this.props.displayProperties.link(this.props.advancedRecordId, this.props.value.value) }));
            case support_1.AdvancedDataType.Boolean:
                return (React.createElement(advancedTableBodyCellBoolean_1.default, { value: this.props.value }));
            case support_1.AdvancedDataType.DateTime:
                return (React.createElement(advancedTableBodyCellDateTime_1.default, { value: this.props.value, link: this.props.displayProperties.link &&
                        this.props.displayProperties.link(this.props.advancedRecordId, this.props.value.value) }));
            case support_1.AdvancedDataType.StupidDate:
                return (React.createElement(advancedTableBodyCellStupidDate_1.default, { value: this.props.value, link: this.props.displayProperties.link &&
                        this.props.displayProperties.link(this.props.advancedRecordId, this.props.value.value) }));
            case support_1.AdvancedDataType.Lookup:
                return (React.createElement(advancedTableBodyCellLookup_1.default, { value: this.props.value, listRetrievedAt: this.props.listRetrievedAt, module: this.props.module }));
        }
    }
}
const stateMappings = (s, props) => ({
    value: stateTools_1.findAdvancedRecordProperty(s.advancedRecordDetails, props.advancedObject.objectName, props.advancedRecordId, props.propertyName, props.listRetrievedAt)
});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedTableBodyCell, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedTableBodyCell.js.map