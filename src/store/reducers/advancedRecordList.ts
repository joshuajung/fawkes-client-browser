// External imports
import { replaceInArray } from "../../helpers/stateTools"

// Internal imports
import * as el from "../../helpers/eventLibrary"
import * as stl from "../types"

export interface AdvancedRecordListReducerState {
  instances: Array<stl.AdvancedRecordList>
}

export const defaultState: AdvancedRecordListReducerState = {
  instances: []
}

export const reducer = (
  state: AdvancedRecordListReducerState = defaultState,
  event: el.KnownEvent
): AdvancedRecordListReducerState => {
  switch (event.type) {
    case el.EventType.AdvancedRecordListLoadRequestEnded:
      if (
        event.result.error ||
        event.result.body.code !== "ADVANCED_OBJECT_GET_RECORD_LIST_RESULT"
      ) {
        return state
      }
      return {
        ...state,
        instances: replaceInArray(
          state.instances,
          t => t.key === event.payload.key,
          t => ({
            ...t,
            data: event.result.body.result,
            retrievedAt: new Date()
          }),
          {
            key: event.payload.key,
            data: event.result.body.result,
            retrievedAt: new Date()
          }
        )
      }
    default:
      return state
  }
}
