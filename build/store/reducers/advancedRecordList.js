"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stateTools_1 = require("../../helpers/stateTools");
const el = require("../../helpers/eventLibrary");
exports.defaultState = {
    instances: []
};
exports.reducer = (state = exports.defaultState, event) => {
    switch (event.type) {
        case el.EventType.AdvancedRecordListLoadRequestEnded:
            if (event.result.error ||
                event.result.body.code !== "ADVANCED_OBJECT_GET_RECORD_LIST_RESULT") {
                return state;
            }
            return Object.assign({}, state, { instances: stateTools_1.replaceInArray(state.instances, t => t.key === event.payload.key, t => (Object.assign({}, t, { data: event.result.body.result, retrievedAt: new Date() })), {
                    key: event.payload.key,
                    data: event.result.body.result,
                    retrievedAt: new Date()
                }) });
        default:
            return state;
    }
};
//# sourceMappingURL=advancedRecordList.js.map