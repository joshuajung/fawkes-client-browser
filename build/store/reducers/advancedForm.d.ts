import * as el from "../../helpers/eventLibrary";
import * as stl from "../types";
export interface AdvancedFormReducerState {
    forms: Array<stl.AdvancedForm>;
}
export declare const defaultState: AdvancedFormReducerState;
export declare const reducer: (state: AdvancedFormReducerState, event: el.KnownEvent) => AdvancedFormReducerState;
