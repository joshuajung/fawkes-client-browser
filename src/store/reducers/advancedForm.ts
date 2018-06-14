// External imports
// import { StupidDate } from "fawkes-server/build/support"
import {
  replaceInArray,
  setImmutable,
  unsetImmutable
} from "../../helpers/stateTools"
import { get, isUndefined } from "lodash"

// Internal imports
import * as el from "../../helpers/eventLibrary"
import * as stl from "../types"
// import * advancedFormHelper from "../../helpers/advancedForm"

export interface AdvancedFormReducerState {
  forms: Array<stl.AdvancedForm>
}

export const defaultState: AdvancedFormReducerState = {
  forms: []
}

export const reducer = (
  state: AdvancedFormReducerState = defaultState,
  event: el.KnownEvent
): AdvancedFormReducerState => {
  switch (event.type) {
    case el.EventType.AdvancedFormRegistered:
      const newForm = {
        id: event.formId,
        fields: event.initialValues || {}
      }
      return {
        ...state,
        forms: replaceInArray(
          state.forms,
          f => f.id === event.formId,
          f => newForm,
          newForm
        )
      }
    case el.EventType.AdvancedFormUnregistered:
      return {
        ...state,
        forms: state.forms.filter(f => f.id !== event.formId)
      }
    case el.EventType.AdvancedFormFieldRegistered:
      return {
        ...state,
        forms: replaceInArray(
          state.forms,
          form => form.id === event.formId,
          form => ({
            ...form,
            fields: isUndefined(get(form.fields, event.path))
              ? setImmutable(form.fields, event.path, event.initialValue)
              : form.fields
          })
        )
      }
    case el.EventType.AdvancedFormFieldUnregistered:
      return {
        ...state,
        forms: replaceInArray(
          state.forms,
          form => form.id === event.formId,
          form => ({ ...form, fields: unsetImmutable(form.fields, event.path) })
        )
      }
    case el.EventType.AdvancedFormFieldChanged:
      return {
        ...state,
        forms: replaceInArray(
          state.forms,
          form => form.id === event.formId,
          form => ({
            ...form,
            fields: setImmutable(form.fields, event.path, event.newValue)
          })
        )
      }
    case el.EventType.AdvancedFormArrayElementAdded:
      return {
        ...state,
        forms: replaceInArray(
          state.forms,
          form => form.id === event.formId,
          form => ({
            ...form,
            fields: setImmutable(form.fields, event.path, [
              ...get(form.fields, event.path),
              event.newElement
            ])
          })
        )
      }
    case el.EventType.AdvancedFormArrayElementRemoved:
      return {
        ...state,
        forms: replaceInArray(
          state.forms,
          form => form.id === event.formId,
          form => ({ ...form, fields: unsetImmutable(form.fields, event.path) })
        )
      }
    default:
      return state
  }
}
