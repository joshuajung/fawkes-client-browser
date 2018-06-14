"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const localization_1 = require("./localization");
const stl = require("../store/types");
exports.stl = stl;
const silence_1 = require("../helpers/silence");
exports.silence = silence_1.default;
const config = require("../config");
function enhance(Component, options = {}) {
    const { stateMappings = s => ({}), dispatchMappings = d => ({}) } = options;
    const enhancedStateMappings = (state, props) => (Object.assign({}, stateMappings(state, props), { cl: (selector) => localization_1.lookup(selector, state.user.language, localization_1.availableLanguages, config.ui.fallbackLanguage), language: state.user.language || config.ui.fallbackLanguage }));
    let enhancedComponent = react_redux_1.connect(enhancedStateMappings, dispatchMappings)(Component);
    enhancedComponent = react_router_dom_1.withRouter(enhancedComponent);
    return enhancedComponent;
}
exports.enhance = enhance;
//# sourceMappingURL=componentEnhancer.js.map