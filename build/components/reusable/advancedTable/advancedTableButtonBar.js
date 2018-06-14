"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../helpers/componentEnhancer");
const AdvancedRecordListActions = require("../../../actions/advancedRecordList");
const button_1 = require("../button");
class AdvancedTableButtonBar extends React.Component {
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement(button_1.default, { icon: ["far", "filter"], isActive: this.props.table.ui.filtersExpanded, onClick: this.props.toggleFilterPanel }),
            React.createElement(button_1.default, { icon: ["far", "plus"], href: this.props.newItemLinkPath })));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({
    toggleFilterPanel: () => {
        d(AdvancedRecordListActions.toggleFilterPanel(props.table.key));
    }
});
exports.default = (() => ce.enhance(AdvancedTableButtonBar, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedTableButtonBar.js.map