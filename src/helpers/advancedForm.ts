// External imports
import * as react from "react"
import { AdvancedData } from "fawkes-server/build/support"

// Internal imports

// Types and interfaces
export type AdvancedFormFieldPresenter = react.ComponentType<
  {
    value: AdvancedData
    // changeField is optional, as Presenters may also be read only
    changeField?: (newValue: AdvancedData) => void
  } & any
>
export type AdvancedFormArrayPresenter = react.ComponentType<
  {
    formId: string
    path: string
  } & any
>
/*
export const formResultToJson = input => {
  function toJson(input) {
    switch (input.constructor.name) {
      case "Object":
        const resultObject = {}
        const keys = Object.keys(input)
        keys.forEach(key => {
          resultObject[key] = toJson(input[key])
        })
        return resultObject
      case "Array":
        return input.map(arrayObject => toJson(arrayObject))
      default:
        return input.toJson()
    }
  }
  return toJson(input)
}*/
