import * as el from "../../helpers/eventLibrary";
import { UserInfo } from "fawkes-server/build/support";
export interface UserReducerState {
    accessToken?: string;
    userInfo?: UserInfo;
    language?: string;
}
export declare const defaultState: UserReducerState;
export declare const reducer: (state: UserReducerState, event: el.KnownEvent) => UserReducerState;
