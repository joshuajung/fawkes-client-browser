/// <reference types="react" />
import * as React from "react";
import * as ce from "../../helpers/componentEnhancer";
export interface ParentProps {
    icon?: string | Array<string>;
    label?: string;
    isActive?: boolean;
    isSubmit?: boolean;
    classNames?: Array<string>;
    onClick?: (e) => any;
    href?: string;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
