/// <reference types="react" />
import * as React from "react";
import { AdvancedDataType } from "fawkes-server/build/support";
import * as ce from "../../../../helpers/componentEnhancer";
export interface ParentProps {
    formId: string;
    path: string;
    dataType: AdvancedDataType;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
