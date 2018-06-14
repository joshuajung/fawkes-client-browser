/// <reference types="react" />
import * as React from "react";
import { Boolean } from "fawkes-server/build/support";
import * as ce from "../../../../helpers/componentEnhancer";
export interface ParentProps {
    changeField: (newValue: CompatibleData) => void;
    value: CompatibleData;
    label: string;
    isRequired?: boolean;
}
export declare type CompatibleData = Boolean;
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
