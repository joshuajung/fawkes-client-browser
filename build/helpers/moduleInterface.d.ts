/// <reference types="react" />
import { Reducer } from "redux";
import { ComponentType } from "react";
import { advancedObjectHelper } from "fawkes-server/build/support";
export default interface Module {
    clientUrl: string;
    rootElementId: string;
    reducer?: Reducer<{}>;
    brand: ComponentType;
    navbarItems: Array<ComponentType>;
    customRoutes?: Array<{
        path: string;
        component: ComponentType;
    }>;
    customRootComponent?: ComponentType<any>;
    advancedObjects: Array<advancedObjectHelper.AdvancedObject>;
    api: ApiConfig;
}
export interface ApiConfig {
    apiRootUrl: string;
    accessTokenHeaderName: string;
}
