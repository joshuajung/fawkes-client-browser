/// <reference types="react" />
import * as React from "react";
import { advancedObjectHelper } from "fawkes-server/build/support";
import * as ce from "../../../../helpers/componentEnhancer";
import * as stl from "../../../../store/types";
import { AdvancedTablePropertyToDisplay } from "../../../../helpers/advancedTable";
export interface ParentProps {
    advancedObject: advancedObjectHelper.AdvancedObject;
    advancedRecordList: stl.AdvancedRecordList;
    propertiesToDisplay: Array<AdvancedTablePropertyToDisplay>;
    loadList: (queryOptions: advancedObjectHelper.AdvancedObjectGetRecordListOptions) => void;
}
declare const _default: React.ComponentType<ParentProps & ce.ModuleProps>;
export default _default;
