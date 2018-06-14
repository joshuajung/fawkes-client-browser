import { AdvancedData, AdvancedDataType, AdvancedDataTypeOptions } from "fawkes-server/build/support";
import * as el from "../helpers/eventLibrary";
export declare const registerForm: (id: string, initialValues?: object) => el.AdvancedFormRegistered;
export declare const unregisterForm: (id: string) => el.AdvancedFormUnregistered;
export declare const changeField: (formId: string, path: string, newValue: AdvancedData) => el.AdvancedFormFieldChanged;
export declare const registerField: (formId: string, path: string, dataType: AdvancedDataType, dataTypeOptions: AdvancedDataTypeOptions) => el.AdvancedFormFieldRegistered;
export declare const unregisterField: (formId: string, path: string) => el.AdvancedFormFieldUnregistered;
export declare const addElementToArray: (formId: string, path: string, newElement: object) => el.AdvancedFormArrayElementAdded;
export declare const removeElementFromArray: (formId: string, path: string) => el.AdvancedFormArrayElementRemoved;
