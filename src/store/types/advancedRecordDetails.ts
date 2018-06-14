// External imports
import { advancedRecordHelper } from "fawkes-server/build/support"

export interface AdvancedRecordDetails {
  advancedObjectName: string
  advancedRecordId: string
  retrievedAt: Date
  data: advancedRecordHelper.AdvancedRecord
}
