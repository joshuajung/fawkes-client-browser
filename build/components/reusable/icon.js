"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_fontawesome_1 = require("@fortawesome/react-fontawesome");
const ce = require("../../helpers/componentEnhancer");
class Icon extends React.Component {
    render() {
        return (React.createElement("span", { className: "fawkes-icon" },
            React.createElement(react_fontawesome_1.default, { icon: this.props.icon, spin: this.props.spin })));
    }
}
exports.default = (() => ce.enhance(Icon))();
//# sourceMappingURL=icon.js.map