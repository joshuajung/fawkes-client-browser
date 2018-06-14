"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../../helpers/componentEnhancer");
const icon_1 = require("../../icon");
class AdvancedTableHeadCell extends React.Component {
    currentFirstOrderByCriterium() {
        return this.props.currentOrderBy[0];
    }
    isOrderedByThis() {
        return (this.currentFirstOrderByCriterium() &&
            this.currentFirstOrderByCriterium().propertyName ===
                this.props.propertyDisplayOptions.propertyName);
    }
    isOrderedByThisAscending() {
        return (this.isOrderedByThis() && !this.currentFirstOrderByCriterium().descending);
    }
    generateNewOrderBy() {
        const nowOrderByDescending = this.isOrderedByThisAscending();
        return [
            {
                propertyName: this.props.propertyDisplayOptions.propertyName,
                descending: nowOrderByDescending
            },
            ...this.props.currentOrderBy
        ].splice(0, 5);
    }
    generateCssClass() {
        let classesArray = [];
        if (this.props.property.orderByAllowed)
            classesArray.push("sortable");
        return classesArray.join(" ");
    }
    render() {
        return (React.createElement("th", { onClick: this.props.property.orderByAllowed
                ? e => this.props.setOrderBy(this.generateNewOrderBy())
                : null, className: this.generateCssClass(), style: { width: this.props.propertyDisplayOptions.defaultWidth } },
            React.createElement("span", null, (this.props.propertyDisplayOptions &&
                this.props.propertyDisplayOptions.columnTitle) ||
                ""),
            this.isOrderedByThis() ? (React.createElement("span", { className: "sort-indicator" },
                this.isOrderedByThisAscending() ? React.createElement(icon_1.default, { icon: "sort-up" }) : null,
                !this.isOrderedByThisAscending() ? (React.createElement(icon_1.default, { icon: "sort-down" })) : null)) : null));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedTableHeadCell, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedTableHeadCell.js.map