/// <reference types="react" />
import * as React from "react";
import * as ce from "../../../helpers/componentEnhancer";
export interface ParentProps {
    title: string;
    href?: any;
    onClick?: any;
    items?: Array<{
        title: string;
        href?: any;
        onClick?: any;
    }>;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
