"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const el = require("../helpers/eventLibrary");
const apiActions = require("./api");
exports.select = (apiConfig, advancedObject, recordIds) => (dispatch, getState) => {
    const uncoveredRecordIds = [];
    recordIds.forEach(recordId => {
        const covered = !!getState().advancedRecordDetails.runningRequests.find(rr => rr.advancedObjectName === advancedObject.objectName &&
            rr.recordIds.indexOf(recordId) !== -1);
        if (!covered)
            uncoveredRecordIds.push(recordId);
    });
    if (uncoveredRecordIds.length === 0)
        return;
    dispatch(apiActions.request(advancedObject.apiPath + "/getRecordDetails", apiConfig, {
        method: "POST",
        requestStartedActionType: el.EventType.AdvancedRecordDetailsSelectRequestStarted,
        requestEndedActionType: el.EventType.AdvancedRecordDetailsSelectRequestEnded,
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
    }));
};
exports.update = (apiConfig, history, advancedObject, recordId, body) => (dispatch, getState) => {
    dispatch(apiActions.request(advancedObject.apiPath + "/setRecords", apiConfig, {
        method: "POST",
        requestStartedActionType: el.EventType.AdvancedRecordDetailsUpdateRequestStarted,
        requestEndedActionType: el.EventType.AdvancedRecordDetailsUpdateRequestEnded,
        requestSuccessfulRedirectPath: result => "/" + advancedObject.objectName + "/record/" + result.result[0],
        payload: {
            advancedObjectName: advancedObject.objectName,
            recordId
        },
        body: { records: [body] },
        requestStartedAlertMessage: l => l.alert.loading(),
        requestSuccessfulAlertMessage: l => l.alert.loadSuccessful(),
        requestSuccessfulSideEffect: () => recordId
            ? dispatch(exports.select(apiConfig, advancedObject, [recordId]))
            : false,
        requestFailedAlertMessage: l => l.alert.loadFailed(),
        history: history
    }));
};
//# sourceMappingURL=advancedRecordDetails.js.map