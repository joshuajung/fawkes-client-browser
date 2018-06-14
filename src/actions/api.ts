// External imports
import axios from "axios"
import {
  toJsonDeep,
  fromJsonDeep,
  cryptoHelper
} from "fawkes-server/build/support"

// Internal imports
import * as el from "../helpers/eventLibrary"
import { ThunkCall } from "../helpers/middlewareTypes"
import { GetState } from "../store/store"
import * as config from "../config"
import * as alertComponent from "./alert"
import { LanguageSelector, Language } from "../helpers/localization"
import * as stl from "../store/types"
import { ApiConfig } from "../helpers/moduleInterface"
import silence from "../helpers/silence"

silence(null as Language)

export const request = (
  path: string,
  apiConfig: ApiConfig,
  options: {
    method: string
    requestStartedActionType: el.EventType | string
    requestEndedActionType: el.EventType | string
    body?: object
    requestStartedAlertMessage?: LanguageSelector
    requestSuccessfulAlertMessage?: LanguageSelector
    requestFailedAlertMessage?: LanguageSelector
    requestSuccessfulRedirectPath?: (result: any) => string
    willStartRequest?: (getState: GetState) => boolean
    requestSuccessfulSideEffect?: () => any
    resultModifier?: (any) => any
    payload?: any
    history?: any
  }
): ThunkCall => (dispatch, getState) => {
  // Set default values
  options.willStartRequest = options.willStartRequest || (() => true)
  options.resultModifier = options.resultModifier || (result => result)

  // Abort, if willStartRequest returns false
  if (options.willStartRequest(getState) === false) return false

  // Start request
  const event: el.ApiRequestStartedEvent = {
    type: options.requestStartedActionType,
    payload: { ...options.payload, requestGuid: cryptoHelper.createGuid() }
  }
  dispatch(event)

  let alert: stl.Alert
  alert = new stl.Alert({})
  if (options.requestStartedAlertMessage) {
    alert = {
      ...alert,
      message: options.requestStartedAlertMessage,
      type: stl.AlertType.Info,
      progress: 0.1,
      autoDismissTimeout: null
    }
    dispatch(alertComponent.request(alert))
  }

  // Create URL
  const url = apiConfig.apiRootUrl + path
  // Log request
  if (config.environment.logApiRequests)
    console.log("API request: " + path + " (" + options.method + ")")

  // Prepare Headers
  let headers = {}
  headers[apiConfig.accessTokenHeaderName] = getState().user.accessToken

  axios({
    method: options.method,
    url: url,
    data: toJsonDeep(options.body),
    headers: headers,
    responseType: "json"
  }).then(
    response => {
      const parsedResult = options.resultModifier(fromJsonDeep(response.data))
      const event: el.ApiRequestEndedEvent = {
        type: options.requestEndedActionType,
        payload: options.payload,
        result: {
          body: parsedResult,
          error: null,
          httpStatus: response.status,
          retrieved: new Date()
        }
      }
      dispatch(event)
      if (options.requestSuccessfulAlertMessage) {
        alert = {
          ...alert,
          message: options.requestSuccessfulAlertMessage,
          type: stl.AlertType.Success,
          progress: 1,
          autoDismissTimeout: undefined
        }
      } else {
        alert = {
          ...alert,
          dismissed: true
        }
      }
      if (options.requestSuccessfulSideEffect) {
        options.requestSuccessfulSideEffect()
      }
      if (options.requestSuccessfulRedirectPath && options.history) {
        const redirectTarget = options.requestSuccessfulRedirectPath(
          parsedResult
        )
        options.history.push(redirectTarget)
        window.scrollTo(0, 0)
      }
      dispatch(alertComponent.request(alert))
    },
    error => {
      const event: el.ApiRequestEndedEvent = {
        type: options.requestEndedActionType,
        payload: options.payload,
        result: {
          error: error,
          retrieved: new Date()
        }
      }
      dispatch(event)
      if (options.requestFailedAlertMessage) {
        alert = {
          ...alert,
          message: options.requestFailedAlertMessage,
          type: stl.AlertType.Error,
          progress: 1,
          autoDismissTimeout: 5000
        }
      } else {
        alert = {
          ...alert,
          dismissed: true
        }
      }
      dispatch(alertComponent.request(alert))
    }
  )
  return true
}
