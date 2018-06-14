"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stateTools_1 = require("../../helpers/stateTools");
const el = require("../../helpers/eventLibrary");
exports.defaultState = {
    records: [],
    runningRequests: []
};
exports.reducer = (state = exports.defaultState, event) => {
    switch (event.type) {
        case el.EventType.AdvancedRecordDetailsSelectRequestStarted:
            return Object.assign({}, state, { runningRequests: [
                    ...state.runningRequests,
                    {
                        guid: event.payload.requestGuid,
                        advancedObjectName: event.payload.advancedObjectName,
                        recordIds: event.payload.recordIds
                    }
                ] });
        case el.EventType.AdvancedRecordDetailsSelectRequestEnded:
            if (event.result.error) {
                return state;
            }
            const newState = Object.assign({}, state);
            event.result.body.result.records.forEach(recordInResult => {
                newState.records = stateTools_1.replaceInArray(newState.records, r => r.advancedObjectName === event.payload.advancedObjectName &&
                    r.advancedRecordId === recordInResult.id.value, r => (Object.assign({}, r, { retrievedAt: new Date(), data: recordInResult })), {
                    advancedObjectName: event.payload.advancedObjectName,
                    advancedRecordId: recordInResult.id.value,
                    retrievedAt: new Date(),
                    data: recordInResult
                });
            });
            newState.runningRequests = state.runningRequests.filter(req => req.guid === event.payload.requestGuid);
            return newState;
        default:
            return state;
    }
};
//# sourceMappingURL=advancedRecordDetails.js.map