import * as el from "../../helpers/eventLibrary";
import * as stl from "../types";
export interface AdvancedRecordDetailsReducerState {
    records: Array<stl.AdvancedRecordDetails>;
    runningRequests: Array<{
        guid: string;
        advancedObjectName: string;
        recordIds: Array<string>;
    }>;
}
export declare const defaultState: AdvancedRecordDetailsReducerState;
export declare const reducer: (state: AdvancedRecordDetailsReducerState, event: el.KnownEvent) => AdvancedRecordDetailsReducerState;
