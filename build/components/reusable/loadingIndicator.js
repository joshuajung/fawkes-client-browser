"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ce = require("../../helpers/componentEnhancer");
class LoadingIndicator extends React.Component {
    render() {
        return React.createElement("p", null, this.props.cl(l => l.loading()));
    }
}
exports.default = (() => ce.enhance(LoadingIndicator))();
//# sourceMappingURL=loadingIndicator.js.map