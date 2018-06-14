/// <reference types="react" />
import * as React from "react";
import { advancedObjectHelper } from "fawkes-server/build/support";
import * as ce from "../../../helpers/componentEnhancer";
export interface ParentProps {
    advancedObject: advancedObjectHelper.AdvancedObject;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
