import { AdvancedRecordDetailsReducerState } from "../store/reducers/advancedRecordDetails";
import { AdvancedRecordDetails } from "../store/types";
import { AdvancedData } from "fawkes-server/build/support";
export declare function replaceInArray<E>(array: Array<E>, selector: (element: E) => boolean, modifier: (element: E) => E, orAdd?: E): Array<E>;
export declare function findAdvancedRecord(advancedRecordDetailsState: AdvancedRecordDetailsReducerState, advancedObjectName: string, advancedRecordId: string, retrievedAfter?: Date): AdvancedRecordDetails;
export declare function findAdvancedRecordProperty(advancedRecordDetailsState: AdvancedRecordDetailsReducerState, advancedObjectName: string, advancedRecordId: string, propertyName: string, retrievedAfter?: Date): AdvancedData;
export declare function setImmutable(object: object, path: string, value: any): object;
export declare function unsetImmutable(object: object, path: string): object;
