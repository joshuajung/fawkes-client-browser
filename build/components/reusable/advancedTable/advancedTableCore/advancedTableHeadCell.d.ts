/// <reference types="react" />
import * as React from "react";
import { advancedObjectHelper, AdvancedDataType } from "fawkes-server/build/support";
import * as ce from "../../../../helpers/componentEnhancer";
import { AdvancedTablePropertyToDisplay } from "../../../../helpers/advancedTable";
export interface ParentProps {
    property: advancedObjectHelper.AdvancedObjectPropertyPublic;
    propertyDisplayOptions: AdvancedTablePropertyToDisplay;
    dataType: AdvancedDataType;
    currentOrderBy: Array<advancedObjectHelper.AdvancedObjectGetRecordListOrderByOption>;
    setOrderBy: (orderBy: Array<advancedObjectHelper.AdvancedObjectGetRecordListOrderByOption>) => void;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
