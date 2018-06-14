/// <reference types="react" />
import * as React from "react";
import { Lookup } from "fawkes-server/build/support";
import * as ce from "../../../../helpers/componentEnhancer";
export interface ParentProps {
    changeField: (newValue: CompatibleData) => void;
    value: CompatibleData;
    label?: string;
    infoIcon?: string;
    shouldShowGoToLookupRecordButton?: boolean;
    isRequired?: boolean;
}
export declare type CompatibleData = Lookup;
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
