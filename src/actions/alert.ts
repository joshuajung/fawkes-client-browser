// External imports

// Internal imports
import * as el from "../helpers/eventLibrary"
import { Alert } from "../store/types"
import { ThunkCall } from "../helpers/middlewareTypes"
import * as config from "../config"

export const request = (alert: Alert): ThunkCall => dispatch => {
  if (alert.autoDismissTimeout !== null && isNaN(alert.autoDismissTimeout)) {
    alert.autoDismissTimeout = config.ui.defaultAlertAutoDismissTimeout
  }
  dispatch(present(alert))
  if (alert.autoDismissTimeout !== null) {
    window.setTimeout(() => {
      dispatch(dismissStale())
    }, alert.autoDismissTimeout + 100)
  }
}

const present = (alert: Alert): el.AlertPresented => ({
  type: el.EventType.AlertPresented,
  alert: { ...alert, lastUpdated: new Date() }
})

export const dismiss = (id: string): el.AlertDismissed => ({
  type: el.EventType.AlertDismissed,
  alertId: id
})

const dismissStale = (): ThunkCall => (dispatch, getState) => {
  const staleAlerts = getState().application.alerts.filter(
    alert =>
      alert.autoDismissTimeout &&
      alert.lastUpdated.getTime() + alert.autoDismissTimeout < new Date().getTime() &&
      !alert.dismissed
  )
  staleAlerts.forEach(staleAlert => dispatch(dismiss(staleAlert.id)))
}
