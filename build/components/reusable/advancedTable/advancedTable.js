"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../helpers/componentEnhancer");
const AdvancedRecordListActions = require("../../../actions/advancedRecordList");
const advancedTableCore_1 = require("./advancedTableCore/advancedTableCore");
const advancedTablePagination_1 = require("./advancedTablePagination/advancedTablePagination");
const advancedTableFilters_1 = require("./advancedTableFilters/advancedTableFilters");
const advancedTableButtonBar_1 = require("./advancedTableButtonBar");
const title_1 = require("../title");
class AdvancedTable extends React.Component {
    componentDidMount() {
        this.props.load(this.props.queryOptions || {});
    }
    propertiesToDisplay() {
        return this.props.advancedObject
            .getPropertiesPublic()
            .filter(property => property.showInDefaultList)
            .map((property, propertyIndex) => ({
            propertyName: property.name,
            columnTitle: this.props.advancedObject.getPropertyTitle(property.name, this.props.language),
            link: null
        }));
    }
    render() {
        return this.props.advancedRecordList ? (React.createElement("div", { className: "advanced-table" },
            React.createElement(title_1.default, { title: this.props.advancedObject.getTitlePlural(this.props.language, true) },
                React.createElement(advancedTableButtonBar_1.default, { table: this.props.advancedTable, newItemLinkPath: "/" + this.props.advancedObject.objectName + "/record/" })),
            this.props.advancedTable.ui.filtersExpanded ? (React.createElement(advancedTableFilters_1.default, { table: this.props.advancedRecordList, propertiesToDisplay: this.propertiesToDisplay(), setFilters: (newFilters) => this.props.load({ filterBy: newFilters, pageIndex: 0 }), module: this.props.module })) : null,
            React.createElement(advancedTableCore_1.default, { advancedRecordList: this.props.advancedRecordList, advancedObject: this.props.advancedObject, propertiesToDisplay: this.propertiesToDisplay(), loadList: this.props.load, module: this.props.module }),
            React.createElement(advancedTablePagination_1.default, { count: this.props.advancedRecordList.data.count, currentPageIndex: this.props.advancedRecordList.data.options.pageIndex, pageSize: this.props.advancedRecordList.data.options.pageSize, goToPage: (pageIndex) => this.props.load({ pageIndex }) }))) : null;
    }
}
const stateMappings = (s, props) => ({
    advancedRecordList: s.advancedRecordList.instances.find(st => st.key ===
        props.advancedObject.objectName +
            "-" +
            (props.tableKeyPrefix || "default")),
    advancedTable: s.advancedTable.tables.find(st => st.key ===
        props.advancedObject.objectName +
            "-" +
            (props.tableKeyPrefix || "default"))
});
const dispatchMappings = (d, props) => ({
    load: (queryOptions) => {
        d(AdvancedRecordListActions.load(props.module.api, props.advancedObject, queryOptions, props.tableKeyPrefix || "default"));
    }
});
exports.default = (() => ce.enhance(AdvancedTable, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedTable.js.map