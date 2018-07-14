"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const ce = require("../../helpers/componentEnhancer");
const header_1 = require("./header/header");
const advancedTable_1 = require("../reusable/advancedTable/advancedTable");
const advancedRecordDetails_1 = require("../reusable/advancedRecordDetails/advancedRecordDetails");
class Private extends React.Component {
    render() {
        return (React.createElement("div", null,
            this.props.module.hideHeader ? null : (React.createElement(header_1.default, { module: this.props.module })),
            React.createElement("section", null,
                React.createElement("div", { className: "container" },
                    this.props.module.advancedObjects.map(ao => (React.createElement(react_router_dom_1.Route, { path: "/" + ao.objectName + "/list", exact: true, key: "route-at-" + ao.objectName, render: () => (React.createElement(advancedTable_1.default, { advancedObject: ao, module: this.props.module })) }))),
                    this.props.module.advancedObjects.map(ao => (React.createElement(react_router_dom_1.Route, { path: "/" + ao.objectName + "/record/:id?", exact: true, key: "route-ard-" + ao.objectName, render: () => (React.createElement(advancedRecordDetails_1.default, { advancedObject: ao, module: this.props.module })) }))),
                    this.props.module.customRoutes.map((cr, crIndex) => (React.createElement(react_router_dom_1.Route, { path: cr.path, exact: true, key: "route-custom-" + crIndex, render: () => {
                            const Component = cr.component;
                            return React.createElement(Component, { module: this.props.module });
                        } })))))));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(Private, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=private.js.map