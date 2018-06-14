"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const lodash_1 = require("lodash");
const ce = require("../../../helpers/componentEnhancer");
class AdvancedFormArray extends React.Component {
    static pathValue(form, path) {
        const pathValue = lodash_1.get(form.fields, path);
        if (!lodash_1.isArray(pathValue)) {
            console.warn("Value at path " +
                path +
                " is no array, cannot generate AdanvedFormArray.");
            return [];
        }
        return pathValue;
    }
    render() {
        const pathValue = AdvancedFormArray.pathValue(this.props.form, this.props.path);
        if (lodash_1.isArray(pathValue)) {
            return pathValue.map((element, elementIndex) => (React.createElement(this.props.presenter, Object.assign({}, this.props.presenterProps, { key: elementIndex, formId: this.props.formId, path: this.props.path + "." + elementIndex, module: this.props.module }))));
        }
        else
            return null;
    }
}
const stateMappings = (s, props) => ({
    form: s.advancedForm.forms.find(form => props.formId === form.id)
});
const dispatchMappings = (d, props) => ({});
exports.default = (() => ce.enhance(AdvancedFormArray, { stateMappings, dispatchMappings }))();
//# sourceMappingURL=advancedFormArray.js.map