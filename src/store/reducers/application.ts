// External imports

// Internal imports
import * as el from "../../helpers/eventLibrary"
import * as stl from "../types"
import { replaceInArray } from "../../helpers/stateTools"

export interface ApplicationReducerState {
  rehydrationComplete: boolean
  alerts: Array<stl.Alert>
}

export const defaultState: ApplicationReducerState = {
  rehydrationComplete: false,
  alerts: []
}

export const reducer = (
  state: ApplicationReducerState = defaultState,
  event: el.KnownEvent
): ApplicationReducerState => {
  // Actual reducer
  switch (event.type) {
    case el.EventType.PersistRehydrate:
      return {
        ...state,
        rehydrationComplete: true
      }
    case el.EventType.AlertPresented:
      return {
        ...state,
        alerts: replaceInArray(
          state.alerts,
          alert => alert.id === event.alert.id,
          alert => event.alert,
          event.alert
        )
      }
    case el.EventType.AlertDismissed:
      return {
        ...state,
        alerts: replaceInArray(
          state.alerts,
          a => a.id === event.alertId,
          a => {
            a.dismissed = true
            return a
          }
        )
      }
    default:
      return state
  }
}
