/// <reference types="react" />
import { Dispatch } from "react-redux";
import * as React from "react";
import { AnyAction } from "redux";
import { State } from "../store/store";
import { LanguageSelector, GenericLanguageSelector, Language } from "./localization";
import { MiddlewareCall } from "./middlewareTypes";
import * as stl from "../store/types";
import Module from "../helpers/moduleInterface";
import silence from "../helpers/silence";
export declare type StateMappingsWithModuleState<ModuleState, ParentProps> = ((state: State & {
    module: ModuleState;
}, props: ParentProps & EnhancedPropsPrivate) => object);
export declare type StateMappings<ParentProps> = StateMappingsWithModuleState<null, ParentProps>;
export declare type DispatchMappings<ParentProps> = ((dispatch: Dispatch<State>, props: ParentProps & EnhancedPropsPrivate) => object);
export declare type LookupLite = (selector: LanguageSelector) => any;
export interface LookupProps {
    cl?: LookupLite;
    language?: string;
    mountedAt?: Date;
}
export interface ModuleProps {
    module?: Module;
}
export interface RouterProps {
    match: {
        isExact: boolean;
        params: any;
        path: string;
        url: string;
    };
    history: any;
}
export declare type EnhancedPropsPrivate = LookupProps & ModuleProps & RouterProps;
export declare type EnhancedPropsPublic = ModuleProps;
export interface State extends State {
}
export declare type ActionOrCall = AnyAction | MiddlewareCall;
export declare type Dispatch = (actionOrCall: ActionOrCall) => void;
export { LanguageSelector, stl, silence, GenericLanguageSelector, Language };
export interface EnhanceOptions<ModuleState, ParentProps> {
    formName?: string;
    stateMappings?: StateMappingsWithModuleState<ModuleState, ParentProps>;
    dispatchMappings?: DispatchMappings<ParentProps>;
}
export declare function enhance<Props>(Component: React.ComponentType<Props>, options?: EnhanceOptions<null, Props>): React.ComponentType<Props & EnhancedPropsPublic>;
