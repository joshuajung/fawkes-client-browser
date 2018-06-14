import * as el from "../../helpers/eventLibrary";
import * as stl from "../types";
export interface ApplicationReducerState {
    rehydrationComplete: boolean;
    alerts: Array<stl.Alert>;
}
export declare const defaultState: ApplicationReducerState;
export declare const reducer: (state: ApplicationReducerState, event: el.KnownEvent) => ApplicationReducerState;
