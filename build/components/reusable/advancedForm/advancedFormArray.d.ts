/// <reference types="react" />
import * as React from "react";
import * as ce from "../../../helpers/componentEnhancer";
import * as advancedFormHelper from "../../../helpers/advancedForm";
export interface ParentProps {
    formId: string;
    path: string;
    presenter: advancedFormHelper.AdvancedFormArrayPresenter;
    presenterProps?: object;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
