/// <reference types="react" />
import * as React from "react";
import * as ce from "../../../helpers/componentEnhancer";
import * as stl from "../../../store/types";
export interface ParentProps {
    table: stl.AdvancedTable;
    newItemLinkPath: string;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
