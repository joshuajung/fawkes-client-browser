/// <reference types="react" />
import * as React from "react";
import * as ce from "../../../helpers/componentEnhancer";
export interface ParentProps {
    formId: string;
    onSubmit: (data) => void;
    initialValues?: object;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
