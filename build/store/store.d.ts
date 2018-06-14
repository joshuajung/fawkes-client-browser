import { Store, Reducer } from "redux";
import * as user from "./reducers/user";
import * as application from "./reducers/application";
import * as ui from "./reducers/ui";
import * as advancedRecordList from "./reducers/advancedRecordList";
import * as advancedRecordDetails from "./reducers/advancedRecordDetails";
import * as advancedForm from "./reducers/advancedForm";
import * as advancedTable from "./reducers/advancedTable";
export interface State {
    application: typeof application.defaultState;
    ui: typeof ui.defaultState;
    user: typeof user.defaultState;
    advancedRecordList: typeof advancedRecordList.defaultState;
    advancedRecordDetails: typeof advancedRecordDetails.defaultState;
    advancedForm: typeof advancedForm.defaultState;
    advancedTable: typeof advancedTable.defaultState;
    module: object;
}
export declare function configureStore(moduleReducer?: Reducer<{}>): Store<State>;
export declare type GetState = () => State;
