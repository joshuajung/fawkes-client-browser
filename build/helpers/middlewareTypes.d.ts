import * as el from "./eventLibrary";
import { GetState } from "../store/store";
export declare type ThunkCallDispatchOnly = (dispatch: ((event: el.Event | ThunkCall) => void)) => void;
export declare type ThunkCallFull = (dispatch: ((event: el.Event | ThunkCall) => void), getState: GetState) => void;
export declare type ThunkCall = ThunkCallDispatchOnly | ThunkCallFull;
export declare enum MiddlewareIdentifier {
    Api = 0,
    Alert = 1,
}
export declare type MiddlewareCall = ThunkCall;
