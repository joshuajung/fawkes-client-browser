"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const el = require("../helpers/eventLibrary");
const apiActions = require("./api");
exports.load = (apiConfig, advancedObject, newQueryOptions, listKeyPrefix) => (dispatch, getState) => {
    const listKey = advancedObject.objectName + "-" + (listKeyPrefix || "default");
    const listInStore = getState().advancedRecordList.instances.find(t => t.key === listKey);
    const oldQueryOptions = (listInStore && listInStore.data && listInStore.data.options) || {};
    const queryOptions = Object.assign({}, oldQueryOptions, newQueryOptions);
    if (queryOptions.filterBy)
        queryOptions.filterBy = queryOptions.filterBy.filter(f => f && f.propertyName && f.operator && f.constants);
    if (queryOptions.orderBy)
        queryOptions.orderBy = queryOptions.orderBy.filter(o => o && o.propertyName);
    dispatch(apiActions.request(advancedObject.apiPath + "/getRecordList", apiConfig, {
        method: "POST",
        requestStartedActionType: el.EventType.AdvancedRecordListLoadRequestStarted,
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
    }));
};
exports.toggleFilterPanel = (key) => ({
    type: el.EventType.AdvancedTableFilterPanelToggled,
    key: key
});
//# sourceMappingURL=advancedRecordList.js.map