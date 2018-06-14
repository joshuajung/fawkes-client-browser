/// <reference types="react" />
import { ThunkCall } from "../helpers/middlewareTypes";
import { GetState } from "../store/store";
import { Language } from "../helpers/localization";
import { ApiConfig } from "../helpers/moduleInterface";
export declare const request: (path: string, apiConfig: ApiConfig, options: {
    method: string;
    requestStartedActionType: string;
    requestEndedActionType: string;
    body?: object;
    requestStartedAlertMessage?: (language: Language) => string | JSX.Element;
    requestSuccessfulAlertMessage?: (language: Language) => string | JSX.Element;
    requestFailedAlertMessage?: (language: Language) => string | JSX.Element;
    requestSuccessfulRedirectPath?: (result: any) => string;
    willStartRequest?: (getState: GetState) => boolean;
    requestSuccessfulSideEffect?: () => any;
    resultModifier?: (any: any) => any;
    payload?: any;
    history?: any;
}) => ThunkCall;
