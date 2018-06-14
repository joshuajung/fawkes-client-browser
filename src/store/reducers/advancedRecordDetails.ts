// External imports
import { replaceInArray } from "../../helpers/stateTools"

// Internal imports
import * as el from "../../helpers/eventLibrary"
import * as stl from "../types"

export interface AdvancedRecordDetailsReducerState {
  records: Array<stl.AdvancedRecordDetails>
  runningRequests: Array<{
    guid: string
    advancedObjectName: string
    recordIds: Array<string>
  }>
}

export const defaultState: AdvancedRecordDetailsReducerState = {
  records: [],
  runningRequests: []
}

export const reducer = (
  state: AdvancedRecordDetailsReducerState = defaultState,
  event: el.KnownEvent
): AdvancedRecordDetailsReducerState => {
  switch (event.type) {
    case el.EventType.AdvancedRecordDetailsSelectRequestStarted:
      return {
        ...state,
        runningRequests: [
          ...state.runningRequests,
          {
            guid: event.payload.requestGuid,
            advancedObjectName: event.payload.advancedObjectName,
            recordIds: event.payload.recordIds
          }
        ]
      }
    case el.EventType.AdvancedRecordDetailsSelectRequestEnded:
      if (event.result.error) {
        return state
      }
      const newState = { ...state }
      event.result.body.result.records.forEach(recordInResult => {
        newState.records = replaceInArray(
          newState.records,
          r =>
            r.advancedObjectName === event.payload.advancedObjectName &&
            r.advancedRecordId === recordInResult.id.value,
          r => ({
            ...r,
            retrievedAt: new Date(),
            data: recordInResult
          }),
          {
            advancedObjectName: event.payload.advancedObjectName,
            advancedRecordId: recordInResult.id.value,
            retrievedAt: new Date(),
            data: recordInResult
          }
        )
      })
      newState.runningRequests = state.runningRequests.filter(
        req => req.guid === event.payload.requestGuid
      )
      return newState
    default:
      return state
  }
}
