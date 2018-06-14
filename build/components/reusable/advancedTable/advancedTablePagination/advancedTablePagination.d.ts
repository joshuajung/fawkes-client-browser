/// <reference types="react" />
import * as React from "react";
import * as ce from "../../../../helpers/componentEnhancer";
export interface ParentProps {
    count: number;
    currentPageIndex: number;
    pageSize: number;
    goToPage: (pageIndex: number) => void;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
