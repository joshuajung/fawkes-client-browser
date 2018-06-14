// External imports
import { advancedObjectHelper } from "fawkes-server/build/support"

// Internal imports
import * as el from "../helpers/eventLibrary"
import * as apiActions from "./api"
import { ThunkCall } from "../helpers/middlewareTypes"
import { ApiConfig } from "../helpers/moduleInterface"

export const load = (
  apiConfig: ApiConfig,
  advancedObject: advancedObjectHelper.AdvancedObject,
  newQueryOptions: advancedObjectHelper.AdvancedObjectGetRecordListOptions,
  listKeyPrefix?: string
): ThunkCall => (dispatch, getState) => {
  // Create List Key
  const listKey = advancedObject.objectName + "-" + (listKeyPrefix || "default")
  // Integrate new query options
  const listInStore = getState().advancedRecordList.instances.find(
    t => t.key === listKey
  )
  const oldQueryOptions: advancedObjectHelper.AdvancedObjectGetRecordListOptions =
    (listInStore && listInStore.data && listInStore.data.options) || {}
  const queryOptions = { ...oldQueryOptions, ...newQueryOptions }

  if (queryOptions.filterBy)
    queryOptions.filterBy = queryOptions.filterBy.filter(
      f => f && f.propertyName && f.operator && f.constants
    )
  if (queryOptions.orderBy)
    queryOptions.orderBy = queryOptions.orderBy.filter(o => o && o.propertyName)
  // Request
  dispatch(
    apiActions.request(advancedObject.apiPath + "/getRecordList", apiConfig, {
      method: "POST",
      requestStartedActionType:
        el.EventType.AdvancedRecordListLoadRequestStarted,
      requestEndedActionType: el.EventType.AdvancedRecordListLoadRequestEnded,
      payload: {
        key: listKey
      },
      body: {
        options: queryOptions
      },
      requestStartedAlertMessage: l => l.alert.loading(),
      requestSuccessfulAlertMessage: l => l.alert.loadSuccessful(),
      requestFailedAlertMessage: l => l.alert.loadFailed()
    })
  )
}

export const toggleFilterPanel = (
  key: string
): el.AdvancedTableFilterPanelToggled => ({
  type: el.EventType.AdvancedTableFilterPanelToggled,
  key: key
})
