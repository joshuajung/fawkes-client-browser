// External imports
import {
  AdvancedData,
  AdvancedDataType,
  AdvancedDataTypeOptions,
  advancedDataConstructor
} from "fawkes-server/build/support"

// Internal imports
import * as el from "../helpers/eventLibrary"
// import * as advancedFormHelper from "../helpers/advancedForm"

export const registerForm = (
  id: string,
  initialValues?: object
): el.AdvancedFormRegistered => ({
  type: el.EventType.AdvancedFormRegistered,
  formId: id,
  initialValues: initialValues
})
export const unregisterForm = (id: string): el.AdvancedFormUnregistered => ({
  type: el.EventType.AdvancedFormUnregistered,
  formId: id
})
export const changeField = (
  formId: string,
  path: string,
  newValue: AdvancedData
): el.AdvancedFormFieldChanged => ({
  type: el.EventType.AdvancedFormFieldChanged,
  formId: formId,
  path: path,
  newValue: newValue
})
export const registerField = (
  formId: string,
  path: string,
  dataType: AdvancedDataType,
  dataTypeOptions: AdvancedDataTypeOptions
): el.AdvancedFormFieldRegistered => {
  const constructor = advancedDataConstructor(dataType)
  const initialValue = new constructor(undefined, undefined, dataTypeOptions)
  return {
    type: el.EventType.AdvancedFormFieldRegistered,
    path: path,
    formId: formId,
    initialValue: initialValue
  }
}
export const unregisterField = (
  formId: string,
  path: string
): el.AdvancedFormFieldUnregistered => ({
  type: el.EventType.AdvancedFormFieldUnregistered,
  path: path,
  formId: formId
})
export const addElementToArray = (
  formId: string,
  path: string,
  newElement: object
): el.AdvancedFormArrayElementAdded => ({
  type: el.EventType.AdvancedFormArrayElementAdded,
  formId,
  path,
  newElement
})
export const removeElementFromArray = (
  formId: string,
  path: string
): el.AdvancedFormArrayElementRemoved => ({
  type: el.EventType.AdvancedFormArrayElementRemoved,
  formId,
  path
})
