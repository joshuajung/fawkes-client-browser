import * as el from "../../helpers/eventLibrary";
export interface UiReducerState {
    navbarBurgerOpen: boolean;
}
export declare const defaultState: UiReducerState;
export declare const reducer: (state: UiReducerState, event: el.KnownEvent) => UiReducerState;
