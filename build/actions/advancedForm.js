"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const support_1 = require("fawkes-server/build/support");
const el = require("../helpers/eventLibrary");
exports.registerForm = (id, initialValues) => ({
    type: el.EventType.AdvancedFormRegistered,
    formId: id,
    initialValues: initialValues
});
exports.unregisterForm = (id) => ({
    type: el.EventType.AdvancedFormUnregistered,
    formId: id
});
exports.changeField = (formId, path, newValue) => ({
    type: el.EventType.AdvancedFormFieldChanged,
    formId: formId,
    path: path,
    newValue: newValue
});
exports.registerField = (formId, path, dataType, dataTypeOptions) => {
    const constructor = support_1.advancedDataConstructor(dataType);
    const initialValue = new constructor(undefined, undefined, dataTypeOptions);
    return {
        type: el.EventType.AdvancedFormFieldRegistered,
        path: path,
        formId: formId,
        initialValue: initialValue
    };
};
exports.unregisterField = (formId, path) => ({
    type: el.EventType.AdvancedFormFieldUnregistered,
    path: path,
    formId: formId
});
exports.addElementToArray = (formId, path, newElement) => ({
    type: el.EventType.AdvancedFormArrayElementAdded,
    formId,
    path,
    newElement
});
exports.removeElementFromArray = (formId, path) => ({
    type: el.EventType.AdvancedFormArrayElementRemoved,
    formId,
    path
});
//# sourceMappingURL=advancedForm.js.map