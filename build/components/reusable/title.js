"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../helpers/componentEnhancer");
class Title extends React.Component {
    render() {
        return (React.createElement("div", { className: "columns" },
            React.createElement("div", { className: "column" },
                React.createElement("h1", null, this.props.title),
                this.props.subtitle ? React.createElement("h2", null, this.props.subtitle) : null),
            React.createElement("div", { className: "column" },
                React.createElement("div", { className: "buttons is-right" }, this.props.children))));
    }
}
const stateMappings = (s, props) => ({});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(Title, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=title.js.map