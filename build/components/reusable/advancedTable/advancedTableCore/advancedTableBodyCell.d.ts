/// <reference types="react" />
import * as React from "react";
import { advancedObjectHelper } from "fawkes-server/build/support";
import * as ce from "../../../../helpers/componentEnhancer";
import { AdvancedTablePropertyToDisplay } from "../../../../helpers/advancedTable";
export interface ParentProps {
    advancedObject: advancedObjectHelper.AdvancedObject;
    advancedRecordId: string;
    listRetrievedAt: Date;
    propertyName: string;
    displayProperties: AdvancedTablePropertyToDisplay;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
