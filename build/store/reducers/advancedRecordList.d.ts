import * as el from "../../helpers/eventLibrary";
import * as stl from "../types";
export interface AdvancedRecordListReducerState {
    instances: Array<stl.AdvancedRecordList>;
}
export declare const defaultState: AdvancedRecordListReducerState;
export declare const reducer: (state: AdvancedRecordListReducerState, event: el.KnownEvent) => AdvancedRecordListReducerState;
