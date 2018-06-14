"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const el = require("../helpers/eventLibrary");
exports.changeLanguage = (newLanguage) => ({
    type: el.EventType.LanguageChanged,
    newLanguage: newLanguage
});
exports.toggleNavbarBurger = () => ({
    type: el.EventType.NavbarBurgerToggled
});
//# sourceMappingURL=ui.js.map