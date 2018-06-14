/// <reference types="react" />
import * as react from "react";
import { AdvancedData } from "fawkes-server/build/support";
export declare type AdvancedFormFieldPresenter = react.ComponentType<{
    value: AdvancedData;
    changeField?: (newValue: AdvancedData) => void;
} & any>;
export declare type AdvancedFormArrayPresenter = react.ComponentType<{
    formId: string;
    path: string;
} & any>;
