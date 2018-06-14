"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stateTools_1 = require("../../helpers/stateTools");
const lodash_1 = require("lodash");
const el = require("../../helpers/eventLibrary");
exports.defaultState = {
    forms: []
};
exports.reducer = (state = exports.defaultState, event) => {
    switch (event.type) {
        case el.EventType.AdvancedFormRegistered:
            const newForm = {
                id: event.formId,
                fields: event.initialValues || {}
            };
            return Object.assign({}, state, { forms: stateTools_1.replaceInArray(state.forms, f => f.id === event.formId, f => newForm, newForm) });
        case el.EventType.AdvancedFormUnregistered:
            return Object.assign({}, state, { forms: state.forms.filter(f => f.id !== event.formId) });
        case el.EventType.AdvancedFormFieldRegistered:
            return Object.assign({}, state, { forms: stateTools_1.replaceInArray(state.forms, form => form.id === event.formId, form => (Object.assign({}, form, { fields: lodash_1.isUndefined(lodash_1.get(form.fields, event.path))
                        ? stateTools_1.setImmutable(form.fields, event.path, event.initialValue)
                        : form.fields }))) });
        case el.EventType.AdvancedFormFieldUnregistered:
            return Object.assign({}, state, { forms: stateTools_1.replaceInArray(state.forms, form => form.id === event.formId, form => (Object.assign({}, form, { fields: stateTools_1.unsetImmutable(form.fields, event.path) }))) });
        case el.EventType.AdvancedFormFieldChanged:
            return Object.assign({}, state, { forms: stateTools_1.replaceInArray(state.forms, form => form.id === event.formId, form => (Object.assign({}, form, { fields: stateTools_1.setImmutable(form.fields, event.path, event.newValue) }))) });
        case el.EventType.AdvancedFormArrayElementAdded:
            return Object.assign({}, state, { forms: stateTools_1.replaceInArray(state.forms, form => form.id === event.formId, form => (Object.assign({}, form, { fields: stateTools_1.setImmutable(form.fields, event.path, [
                        ...lodash_1.get(form.fields, event.path),
                        event.newElement
                    ]) }))) });
        case el.EventType.AdvancedFormArrayElementRemoved:
            return Object.assign({}, state, { forms: stateTools_1.replaceInArray(state.forms, form => form.id === event.formId, form => (Object.assign({}, form, { fields: stateTools_1.unsetImmutable(form.fields, event.path) }))) });
        default:
            return state;
    }
};
//# sourceMappingURL=advancedForm.js.map