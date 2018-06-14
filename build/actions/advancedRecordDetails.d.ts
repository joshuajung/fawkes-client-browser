import { advancedObjectHelper } from "fawkes-server/build/support";
import { ThunkCall } from "../helpers/middlewareTypes";
import { ApiConfig } from "../helpers/moduleInterface";
export declare const select: (apiConfig: ApiConfig, advancedObject: advancedObjectHelper.AdvancedObject, recordIds: string[]) => ThunkCall;
export declare const update: (apiConfig: ApiConfig, history: any, advancedObject: advancedObjectHelper.AdvancedObject, recordId: string, body: any) => ThunkCall;
