"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const support_1 = require("fawkes-server/build/support");
const config = require("../config");
const alertComponent = require("./alert");
const stl = require("../store/types");
const silence_1 = require("../helpers/silence");
silence_1.default(null);
exports.request = (path, apiConfig, options) => (dispatch, getState) => {
    options.willStartRequest = options.willStartRequest || (() => true);
    options.resultModifier = options.resultModifier || (result => result);
    if (options.willStartRequest(getState) === false)
        return false;
    const event = {
        type: options.requestStartedActionType,
        payload: Object.assign({}, options.payload, { requestGuid: support_1.cryptoHelper.createGuid() })
    };
    dispatch(event);
    let alert;
    alert = new stl.Alert({});
    if (options.requestStartedAlertMessage) {
        alert = Object.assign({}, alert, { message: options.requestStartedAlertMessage, type: stl.AlertType.Info, progress: 0.1, autoDismissTimeout: null });
        dispatch(alertComponent.request(alert));
    }
    const url = apiConfig.apiRootUrl + path;
    if (config.environment.logApiRequests)
        console.log("API request: " + path + " (" + options.method + ")");
    let headers = {};
    headers[apiConfig.accessTokenHeaderName] = getState().user.accessToken;
    axios_1.default({
        method: options.method,
        url: url,
        data: support_1.toJsonDeep(options.body),
        headers: headers,
        responseType: "json"
    }).then(response => {
        const parsedResult = options.resultModifier(support_1.fromJsonDeep(response.data));
        const event = {
            type: options.requestEndedActionType,
            payload: options.payload,
            result: {
                body: parsedResult,
                error: null,
                httpStatus: response.status,
                retrieved: new Date()
            }
        };
        dispatch(event);
        if (options.requestSuccessfulAlertMessage) {
            alert = Object.assign({}, alert, { message: options.requestSuccessfulAlertMessage, type: stl.AlertType.Success, progress: 1, autoDismissTimeout: undefined });
        }
        else {
            alert = Object.assign({}, alert, { dismissed: true });
        }
        if (options.requestSuccessfulSideEffect) {
            options.requestSuccessfulSideEffect(parsedResult);
        }
        if (options.requestSuccessfulRedirectPath && options.history) {
            const redirectTarget = options.requestSuccessfulRedirectPath(parsedResult);
            options.history.push(redirectTarget);
            window.scrollTo(0, 0);
        }
        dispatch(alertComponent.request(alert));
    }, error => {
        const event = {
            type: options.requestEndedActionType,
            payload: options.payload,
            result: {
                error: error,
                retrieved: new Date()
            }
        };
        dispatch(event);
        if (options.requestFailedAlertMessage) {
            alert = Object.assign({}, alert, { message: options.requestFailedAlertMessage, type: stl.AlertType.Error, progress: 1, autoDismissTimeout: 5000 });
        }
        else {
            alert = Object.assign({}, alert, { dismissed: true });
        }
        dispatch(alertComponent.request(alert));
    });
    return true;
};
//# sourceMappingURL=api.js.map