/// <reference types="react" />
import * as React from "react";
import { Varchar } from "fawkes-server/build/support";
import * as ce from "../../../../../helpers/componentEnhancer";
export interface ParentProps {
    value: Varchar;
    link?: string;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
