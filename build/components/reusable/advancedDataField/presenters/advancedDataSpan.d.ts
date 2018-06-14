/// <reference types="react" />
import * as React from "react";
import { Text, Varchar, DateTime, StupidDate, Float, Integer, Boolean } from "fawkes-server/build/support";
import * as ce from "../../../../helpers/componentEnhancer";
export interface ParentProps {
    value: CompatibleData;
    label?: string;
}
export declare type CompatibleData = Varchar | Text | DateTime | StupidDate | Float | Integer | Boolean;
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
