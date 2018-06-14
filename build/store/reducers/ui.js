"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const el = require("../../helpers/eventLibrary");
exports.defaultState = {
    navbarBurgerOpen: false
};
exports.reducer = (state = exports.defaultState, event) => {
    switch (event.type) {
        case el.EventType.NavbarBurgerToggled:
            return Object.assign({}, state, { navbarBurgerOpen: !state.navbarBurgerOpen });
        default:
            return state;
    }
};
//# sourceMappingURL=ui.js.map