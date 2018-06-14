/// <reference types="react" />
import * as React from "react";
import { Varchar, DateTime, StupidDate, Float, Integer } from "fawkes-server/build/support";
import * as ce from "../../../../helpers/componentEnhancer";
export interface ParentProps {
    changeField: (newValue: CompatibleData) => void;
    value: CompatibleData;
    label?: string;
    placeholder?: string;
    infoIcon?: string;
    isRequired?: boolean;
    typeOverride?: string;
}
export declare type CompatibleData = Varchar | DateTime | StupidDate | Float | Integer;
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
