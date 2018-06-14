import * as el from "../helpers/eventLibrary";
import { Alert } from "../store/types";
import { ThunkCall } from "../helpers/middlewareTypes";
export declare const request: (alert: Alert) => ThunkCall;
export declare const dismiss: (id: string) => el.AlertDismissed;
