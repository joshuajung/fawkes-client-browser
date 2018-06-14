import { advancedObjectHelper } from "fawkes-server/build/support";
import * as el from "../helpers/eventLibrary";
import { ThunkCall } from "../helpers/middlewareTypes";
import { ApiConfig } from "../helpers/moduleInterface";
export declare const load: (apiConfig: ApiConfig, advancedObject: advancedObjectHelper.AdvancedObject, newQueryOptions: advancedObjectHelper.AdvancedObjectGetRecordListOptions, listKeyPrefix?: string) => ThunkCall;
export declare const toggleFilterPanel: (key: string) => el.AdvancedTableFilterPanelToggled;
