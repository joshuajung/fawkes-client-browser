"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../../../helpers/componentEnhancer");
class AdvancedTablePagination extends React.Component {
    render() {
        const pagesAvailable = Math.ceil(this.props.count / this.props.pageSize);
        const firstPageAvailableIndex = 0;
        const lastPageAvailableIndex = pagesAvailable - 1;
        const previousPageIndex = this.props.currentPageIndex - 1;
        const nextPageIndex = this.props.currentPageIndex + 1;
        const onFirstPage = this.props.currentPageIndex === firstPageAvailableIndex;
        const onLastPage = this.props.currentPageIndex === lastPageAvailableIndex;
        const currentPageNumberReadable = this.props.currentPageIndex + 1;
        const firstPageAvailableNumberReadable = firstPageAvailableIndex + 1;
        const lastPageAvailableNumberReadable = lastPageAvailableIndex + 1;
        const previousPageNumberReadable = previousPageIndex + 1;
        const nextPageNumberReadable = nextPageIndex + 1;
        if (pagesAvailable > 0) {
            return (React.createElement("nav", { className: "pagination" },
                React.createElement("button", { className: "pagination-previous", disabled: onFirstPage, onClick: e => this.props.goToPage(previousPageIndex) }, this.props.cl(l => l.advancedTable.pagination.previous())),
                React.createElement("button", { className: "pagination-next", disabled: onLastPage, onClick: e => this.props.goToPage(nextPageIndex) }, this.props.cl(l => l.advancedTable.pagination.next())),
                React.createElement("ul", { className: "pagination-list" },
                    !onFirstPage ? (React.createElement("li", null,
                        React.createElement("button", { className: "pagination-link", onClick: e => this.props.goToPage(firstPageAvailableIndex) }, firstPageAvailableNumberReadable))) : null,
                    this.props.currentPageIndex - firstPageAvailableIndex > 2 ? (React.createElement("li", null,
                        React.createElement("span", { className: "pagination-ellipsis" }, "\u2026"))) : null,
                    this.props.currentPageIndex - firstPageAvailableIndex > 1 ? (React.createElement("li", null,
                        React.createElement("button", { className: "pagination-link", onClick: e => this.props.goToPage(previousPageIndex) }, previousPageNumberReadable))) : null,
                    React.createElement("li", null,
                        React.createElement("button", { className: "pagination-link is-current" }, currentPageNumberReadable)),
                    lastPageAvailableIndex - this.props.currentPageIndex > 1 ? (React.createElement("li", null,
                        React.createElement("button", { className: "pagination-link", onClick: e => this.props.goToPage(nextPageIndex) }, nextPageNumberReadable))) : null,
                    lastPageAvailableIndex - this.props.currentPageIndex > 2 ? (React.createElement("li", null,
                        React.createElement("span", { className: "pagination-ellipsis" }, "\u2026"))) : null,
                    !onLastPage ? (React.createElement("li", null,
                        React.createElement("button", { className: "pagination-link", onClick: e => this.props.goToPage(lastPageAvailableIndex) }, lastPageAvailableNumberReadable))) : null)));
        }
        else
            return null;
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedTablePagination, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedTablePagination.js.map