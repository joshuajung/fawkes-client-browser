import { advancedObjectHelper } from "fawkes-server/build/support";
export interface AdvancedRecordList {
    key: string;
    retrievedAt: Date;
    data: advancedObjectHelper.AdvancedObjectGetRecordListResult;
}
