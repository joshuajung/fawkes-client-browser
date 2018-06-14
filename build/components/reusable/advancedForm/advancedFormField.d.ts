/// <reference types="react" />
import * as React from "react";
import { AdvancedData, AdvancedDataType, AdvancedDataTypeOptions } from "fawkes-server/build/support";
import * as ce from "../../../helpers/componentEnhancer";
import * as advancedFormHelper from "../../../helpers/advancedForm";
export interface ParentProps {
    formId: string;
    path: string;
    dataType: AdvancedDataType;
    dataTypeOptions?: AdvancedDataTypeOptions;
    presenter: advancedFormHelper.AdvancedFormFieldPresenter;
    presenterProps?: object;
    onChangeSideEffects?: (newValue: AdvancedData) => void;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
