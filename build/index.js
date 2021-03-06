"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.React = React;
const react_dom_1 = require("react-dom");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
exports.Route = react_router_dom_1.Route;
const redux_1 = require("redux");
exports.combineReducers = redux_1.combineReducers;
const store_1 = require("./store/store");
const componentEnhancer = require("./helpers/componentEnhancer");
exports.componentEnhancer = componentEnhancer;
const localization_1 = require("./helpers/localization");
exports.lookup = localization_1.lookup;
const apiActions = require("./actions/api");
exports.apiActions = apiActions;
const advancedFormActions = require("./actions/advancedForm");
exports.advancedFormActions = advancedFormActions;
const uiActions = require("./actions/ui");
exports.uiActions = uiActions;
const eventLibrary = require("./helpers/eventLibrary");
exports.eventLibrary = eventLibrary;
const icons_1 = require("./helpers/icons");
const stateTools = require("./helpers/stateTools");
exports.stateTools = stateTools;
const advancedForm_1 = require("./components/reusable/advancedForm/advancedForm");
exports.AdvancedForm = advancedForm_1.default;
const advancedFormArray_1 = require("./components/reusable/advancedForm/advancedFormArray");
exports.AdvancedFormArray = advancedFormArray_1.default;
const advancedFormField_1 = require("./components/reusable/advancedForm/advancedFormField");
exports.AdvancedFormField = advancedFormField_1.default;
const advancedFormInput_1 = require("./components/reusable/advancedForm/presenters/advancedFormInput");
exports.AdvancedFormInput = advancedFormInput_1.default;
const advancedFormInputReadonly_1 = require("./components/reusable/advancedForm/presenters/advancedFormInputReadonly");
exports.AdvancedFormInputReadonly = advancedFormInputReadonly_1.default;
const advancedFormTextarea_1 = require("./components/reusable/advancedForm/presenters/advancedFormTextarea");
exports.AdvancedFormTextarea = advancedFormTextarea_1.default;
const advancedFormSelect_1 = require("./components/reusable/advancedForm/presenters/advancedFormSelect");
exports.AdvancedFormSelect = advancedFormSelect_1.default;
const advancedFormCheckbox_1 = require("./components/reusable/advancedForm/presenters/advancedFormCheckbox");
exports.AdvancedFormCheckbox = advancedFormCheckbox_1.default;
const advancedFormSubmitButton_1 = require("./components/reusable/advancedForm/presenters/advancedFormSubmitButton");
exports.AdvancedFormSubmitButton = advancedFormSubmitButton_1.default;
const advancedDataSpan_1 = require("./components/reusable/advancedDataField/presenters/advancedDataSpan");
exports.AdvancedDataSpan = advancedDataSpan_1.default;
const advancedTable_1 = require("./components/reusable/advancedTable/advancedTable");
exports.AdvancedTable = advancedTable_1.default;
const advancedRecordDetails_1 = require("./components/reusable/advancedRecordDetails/advancedRecordDetails");
exports.AdvancedRecordDetails = advancedRecordDetails_1.default;
const navbarItem_1 = require("./components/private/header/navbarItem");
exports.NavbarItem = navbarItem_1.default;
const root_1 = require("./components/root");
const title_1 = require("./components/reusable/title");
exports.Title = title_1.default;
const button_1 = require("./components/reusable/button");
exports.Button = button_1.default;
const icon_1 = require("./components/reusable/icon");
exports.Icon = icon_1.default;
const initialize = () => {
    icons_1.default();
};
exports.initialize = initialize;
const render = (m) => {
    return react_dom_1.render(React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(react_redux_1.Provider, { store: store_1.configureStore(m.reducer) }, m.customRootComponent ? (React.createElement(m.customRootComponent, { module: m })) : (React.createElement(root_1.default, { module: m })))), document.getElementById(m.rootElementId));
};
exports.render = render;
//# sourceMappingURL=index.js.map