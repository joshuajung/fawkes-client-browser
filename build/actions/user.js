"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const support_1 = require("fawkes-server/build/support");
const el = require("../helpers/eventLibrary");
const apiActions = require("./api");
exports.logInWithEmail = (apiConfig, email, password, history) => apiActions.request("/user/logInWithEmail", apiConfig, {
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
});
exports.logInWithToken = (apiConfig, loginToken, history) => apiActions.request("/user/logInWithToken", apiConfig, {
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
});
exports.logInWithAppleIdentifier = (apiConfig, history) => apiActions.request("/user/createOrLogInWithAppleIdentifier", apiConfig, {
    method: "POST",
    requestStartedActionType: el.EventType.LogInRequestStarted,
    requestEndedActionType: el.EventType.LogInRequestEnded,
    body: {
        appleIdentifier: support_1.cryptoHelper.createGuid()
    },
    history: history
});
exports.register = (apiConfig, email, password, history) => apiActions.request("/user/createWithEmail", apiConfig, {
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
});
exports.sendLoginLink = (apiConfig, email, clientUrl, history) => apiActions.request("/user/sendLoginLink", apiConfig, {
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
});
exports.sendResetPasswordLink = (apiConfig, email, clientUrl, history) => apiActions.request("/user/sendResetPasswordLink", apiConfig, {
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
});
exports.resetPasswordWithToken = (apiConfig, newPassword, token, history) => apiActions.request("/user/setNewPasswordWithToken", apiConfig, {
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
});
exports.logOut = (apiConfig) => apiActions.request("/user/logOut", apiConfig, {
    method: "POST",
    requestStartedActionType: el.EventType.LogOutRequestStarted,
    requestEndedActionType: el.EventType.LogOutRequestEnded,
    requestStartedAlertMessage: l => l.logOut.alert.loggingOut(),
    requestSuccessfulAlertMessage: l => l.logOut.alert.logoutSuccessful(),
    requestFailedAlertMessage: l => l.logOut.alert.logoutFailed()
});
//# sourceMappingURL=user.js.map