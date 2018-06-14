"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fontawesome_1 = require("@fortawesome/fontawesome");
const fontawesome_pro_solid_1 = require("@fortawesome/fontawesome-pro-solid");
const fontawesome_pro_regular_1 = require("@fortawesome/fontawesome-pro-regular");
const fontawesome_pro_light_1 = require("@fortawesome/fontawesome-pro-light");
const icons = [fontawesome_pro_solid_1.default, fontawesome_pro_regular_1.default, fontawesome_pro_light_1.default];
exports.default = () => fontawesome_1.default.library.add(...icons);
//# sourceMappingURL=icons.js.map