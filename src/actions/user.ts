// External imports
import { Varchar } from "fawkes-server/build/support"

// Internal imports
import * as el from "../helpers/eventLibrary"
import * as apiActions from "./api"
import { ThunkCall } from "../helpers/middlewareTypes"
import { ApiConfig } from "../helpers/moduleInterface"

export const logInWithEmail = (
  apiConfig: ApiConfig,
  email: Varchar,
  password: Varchar,
  history: any
): ThunkCall =>
  apiActions.request("/user/logInWithEmail", apiConfig, {
    method: "POST",
    requestStartedActionType: el.EventType.LogInRequestStarted,
    requestEndedActionType: el.EventType.LogInRequestEnded,
    body: {
      email: email,
      password: password
    },
    requestStartedAlertMessage: l => l.loginForm.alert.loggingIn(),
    requestSuccessfulAlertMessage: l => l.loginForm.alert.loginSuccessful(),
    requestFailedAlertMessage: l => l.loginForm.alert.loginFailed(),
    requestSuccessfulRedirectPath: result => "/",
    history: history
  })
export const logInWithToken = (
  apiConfig: ApiConfig,
  loginToken: string,
  history: any
): ThunkCall =>
  apiActions.request("/user/logInWithToken", apiConfig, {
    method: "POST",
    requestStartedActionType: el.EventType.LogInRequestStarted,
    requestEndedActionType: el.EventType.LogInRequestEnded,
    body: {
      token: loginToken
    },
    requestStartedAlertMessage: l => l.loginForm.alert.loggingIn(),
    requestSuccessfulAlertMessage: l => l.loginForm.alert.loginSuccessful(),
    requestFailedAlertMessage: l => l.loginForm.alert.loginFailed(),
    requestSuccessfulRedirectPath: result => "/",
    history: history
  })
export const register = (
  apiConfig: ApiConfig,
  email: Varchar,
  password: Varchar,
  history: any
): ThunkCall =>
  apiActions.request("/user/createWithEmail", apiConfig, {
    method: "POST",
    requestStartedActionType: el.EventType.RegisterRequestStarted,
    requestEndedActionType: el.EventType.RegisterRequestEnded,
    body: {
      email: email,
      password: password
    },
    requestStartedAlertMessage: l => l.alert.loading(),
    requestSuccessfulAlertMessage: l => l.alert.loadSuccessful(),
    requestSuccessfulRedirectPath: result => "/",
    requestFailedAlertMessage: l => l.alert.loadFailed(),
    history: history
  })
export const sendLoginLink = (
  apiConfig: ApiConfig,
  email: Varchar,
  clientUrl: string,
  history: any
): ThunkCall =>
  apiActions.request("/user/sendLoginLink", apiConfig, {
    method: "POST",
    requestStartedActionType: el.EventType.MiscApiRequestStarted,
    requestEndedActionType: el.EventType.MiscApiRequestEnded,
    body: {
      email: email,
      loginLinkBaseUrl: clientUrl + "/logInWithToken/"
    },
    requestStartedAlertMessage: l => l.alert.loading(),
    requestSuccessfulAlertMessage: l => l.alert.loadSuccessful(),
    requestFailedAlertMessage: l => l.alert.loadFailed(),
    history: history
  })
export const sendResetPasswordLink = (
  apiConfig: ApiConfig,
  email: Varchar,
  clientUrl: string,
  history: any
): ThunkCall =>
  apiActions.request("/user/sendResetPasswordLink", apiConfig, {
    method: "POST",
    requestStartedActionType: el.EventType.MiscApiRequestStarted,
    requestEndedActionType: el.EventType.MiscApiRequestEnded,
    body: {
      email: email,
      resetPasswordLinkBaseUrl: clientUrl + "/resetPasswordWithToken/"
    },
    requestStartedAlertMessage: l => l.alert.loading(),
    requestSuccessfulAlertMessage: l => l.alert.loadSuccessful(),
    requestSuccessfulRedirectPath: result => "/",
    requestFailedAlertMessage: l => l.alert.loadFailed(),
    history: history
  })
export const resetPasswordWithToken = (
  apiConfig: ApiConfig,
  newPassword: Varchar,
  token: string,
  history: any
): ThunkCall =>
  apiActions.request("/user/setNewPasswordWithToken", apiConfig, {
    method: "POST",
    requestStartedActionType: el.EventType.MiscApiRequestStarted,
    requestEndedActionType: el.EventType.MiscApiRequestEnded,
    body: {
      token: token,
      newPassword: newPassword
    },
    requestStartedAlertMessage: l => l.alert.loading(),
    requestSuccessfulAlertMessage: l => l.alert.loadSuccessful(),
    requestSuccessfulRedirectPath: result => "/",
    requestFailedAlertMessage: l => l.alert.loadFailed(),
    history: history
  })
export const logOut = (apiConfig: ApiConfig): ThunkCall =>
  apiActions.request("/user/logOut", apiConfig, {
    method: "POST",
    requestStartedActionType: el.EventType.LogOutRequestStarted,
    requestEndedActionType: el.EventType.LogOutRequestEnded,
    requestStartedAlertMessage: l => l.logOut.alert.loggingOut(),
    requestSuccessfulAlertMessage: l => l.logOut.alert.logoutSuccessful(),
    requestFailedAlertMessage: l => l.logOut.alert.logoutFailed()
  })
