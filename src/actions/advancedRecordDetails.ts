// External imports
import { advancedObjectHelper } from "fawkes-server/build/support"

// Internal imports
import * as el from "../helpers/eventLibrary"
import * as apiActions from "./api"
import { ThunkCall } from "../helpers/middlewareTypes"
import { ApiConfig } from "../helpers/moduleInterface"

export const select = (
  apiConfig: ApiConfig,
  advancedObject: advancedObjectHelper.AdvancedObject,
  recordIds: Array<string>
): ThunkCall => (dispatch, getState) => {
  // Check if identical request is already in progress, then abort
  const uncoveredRecordIds = []
  recordIds.forEach(recordId => {
    const covered = !!getState().advancedRecordDetails.runningRequests.find(
      rr =>
        rr.advancedObjectName === advancedObject.objectName &&
        rr.recordIds.indexOf(recordId) !== -1
    )
    if (!covered) uncoveredRecordIds.push(recordId)
  })
  if (uncoveredRecordIds.length === 0) return
  // Request
  dispatch(
    apiActions.request(
      advancedObject.apiPath + "/getRecordDetails",
      apiConfig,
      {
        method: "POST",
        requestStartedActionType:
          el.EventType.AdvancedRecordDetailsSelectRequestStarted,
        requestEndedActionType:
          el.EventType.AdvancedRecordDetailsSelectRequestEnded,
        payload: {
          advancedObjectName: advancedObject.objectName,
          recordIds: recordIds
        },
        body: {
          recordIds
        },
        requestStartedAlertMessage: l => l.alert.loading(),
        requestSuccessfulAlertMessage: l => l.alert.loadSuccessful(),
        requestFailedAlertMessage: l => l.alert.loadFailed()
      }
    )
  )
}

export const update = (
  apiConfig: ApiConfig,
  history: any,
  advancedObject: advancedObjectHelper.AdvancedObject,
  recordId: string,
  body: any
): ThunkCall => (dispatch, getState) => {
  dispatch(
    apiActions.request(advancedObject.apiPath + "/setRecords", apiConfig, {
      method: "POST",
      requestStartedActionType:
        el.EventType.AdvancedRecordDetailsUpdateRequestStarted,
      requestEndedActionType:
        el.EventType.AdvancedRecordDetailsUpdateRequestEnded,
      requestSuccessfulRedirectPath: result =>
        "/" + advancedObject.objectName + "/record/" + result.result[0],
      payload: {
        advancedObjectName: advancedObject.objectName,
        recordId
      },
      body: { records: [body] },
      requestStartedAlertMessage: l => l.alert.loading(),
      requestSuccessfulAlertMessage: l => l.alert.loadSuccessful(),
      requestSuccessfulSideEffect: () =>
        recordId
          ? dispatch(select(apiConfig, advancedObject, [recordId]))
          : false,
      requestFailedAlertMessage: l => l.alert.loadFailed(),
      history: history
    })
  )
}
