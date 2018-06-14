/// <reference types="react" />
import * as React from "react";
import { Varchar, DateTime, StupidDate, Float, Integer, Boolean } from "fawkes-server/build/support";
import * as ce from "../../../../helpers/componentEnhancer";
export interface ParentProps {
    changeField: (newValue: CompatibleData) => void;
    value: CompatibleData;
    options: Array<{
        value: string;
        label: string;
    }>;
    includeEmptyOption: boolean;
    label?: string;
    placeholder?: string;
    infoIcon?: string;
    isRequired?: boolean;
}
export declare type CompatibleData = Varchar | DateTime | StupidDate | Float | Integer | Boolean;
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
