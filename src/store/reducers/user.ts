// External imports

// Internal imports
import * as el from "../../helpers/eventLibrary"
import { UserInfo } from "fawkes-server/build/support"

export interface UserReducerState {
  accessToken?: string
  userInfo?: UserInfo
  language?: string
}

export const defaultState: UserReducerState = {
  accessToken: undefined,
  userInfo: undefined,
  language: undefined
}

export const reducer = (
  state: UserReducerState = defaultState,
  event: el.KnownEvent
): UserReducerState => {
  switch (event.type) {
    case el.EventType.LanguageChanged:
      return { ...state, language: event.newLanguage }
    case el.EventType.RegisterRequestEnded:
      if (!event.result.error && event.result.body.code === "USER_CREATED") {
        return {
          ...state,
          accessToken: event.result.body.accessToken,
          userInfo: event.result.body.userInfo
        }
      }
    case el.EventType.LogInRequestEnded:
      if (
        !event.result.error &&
        event.result.body.code === "LOGIN_SUCCESSFUL"
      ) {
        return {
          ...state,
          accessToken: event.result.body.accessToken,
          userInfo: event.result.body.userInfo
        }
      } else {
        return state
      }
    case el.EventType.LogOutRequestEnded:
      return { ...state, accessToken: defaultState.accessToken }
    default:
      return state
  }
}
