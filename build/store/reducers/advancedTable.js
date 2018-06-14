"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const el = require("../../helpers/eventLibrary");
const stateTools_1 = require("../../helpers/stateTools");
exports.defaultState = {
    tables: []
};
exports.reducer = (state = exports.defaultState, event) => {
    switch (event.type) {
        case el.EventType.AdvancedRecordListLoadRequestEnded:
            if (!event.result.error &&
                event.result.body.code === "ADVANCED_OBJECT_GET_RECORD_LIST_RESULT") {
                return Object.assign({}, state, { tables: stateTools_1.replaceInArray(state.tables, t => t.key === event.payload.key, t => t, {
                        key: event.payload.key,
                        ui: { filtersExpanded: false }
                    }) });
            }
            else {
                return state;
            }
        case el.EventType.AdvancedTableFilterPanelToggled:
            return Object.assign({}, state, { tables: stateTools_1.replaceInArray(state.tables, t => t.key === event.key, t => (Object.assign({}, t, { ui: Object.assign({}, t.ui, { filtersExpanded: !t.ui.filtersExpanded }) }))) });
        default:
            return state;
    }
};
//# sourceMappingURL=advancedTable.js.map