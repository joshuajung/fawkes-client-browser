import * as el from "../../helpers/eventLibrary";
import * as stl from "../types";
export interface AdvancedTableState {
    tables: Array<stl.AdvancedTable>;
}
export declare const defaultState: AdvancedTableState;
export declare const reducer: (state: AdvancedTableState, event: el.KnownEvent) => AdvancedTableState;
