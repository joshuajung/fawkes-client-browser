// External imports
import { get, set, unset, cloneDeep, isArray, isNil } from "lodash"
import { AdvancedRecordDetailsReducerState } from "../store/reducers/advancedRecordDetails"
import { AdvancedRecordDetails } from "../store/types"
import { AdvancedData } from "fawkes-server/build/support"

// Internal imports

export function replaceInArray<E>(
  array: Array<E>,
  selector: (element: E) => boolean,
  modifier: (element: E) => E,
  orAdd?: E
): Array<E> {
  let rowsAffected = 0
  let newArray = []
  array.forEach(element => {
    if (selector(element)) {
      rowsAffected++
      const newValue = modifier(element)
      if (!isNil(newValue)) {
        newArray.push(newValue)
      }
    } else newArray.push(element)
  })
  if (rowsAffected === 0 && !isNil(orAdd)) {
    newArray.push(orAdd)
  }
  return newArray
}

export function findAdvancedRecord(
  advancedRecordDetailsState: AdvancedRecordDetailsReducerState,
  advancedObjectName: string,
  advancedRecordId: string,
  retrievedAfter?: Date
): AdvancedRecordDetails {
  return advancedRecordDetailsState.records.find(
    record =>
      record.advancedObjectName === advancedObjectName &&
      record.advancedRecordId == advancedRecordId &&
      record.retrievedAt >= (retrievedAfter || 0)
  )
}

export function findAdvancedRecordProperty(
  advancedRecordDetailsState: AdvancedRecordDetailsReducerState,
  advancedObjectName: string,
  advancedRecordId: string,
  propertyName: string,
  retrievedAfter?: Date
): AdvancedData {
  const record = findAdvancedRecord(
    advancedRecordDetailsState,
    advancedObjectName,
    advancedRecordId,
    retrievedAfter
  )
  if (isNil(record)) return undefined
  const property = record.data[propertyName]
  return property
}

export function setImmutable(object: object, path: string, value: any) {
  const newObject = cloneDeep(object)
  set(newObject, path, value)
  return newObject
}

export function unsetImmutable(object: object, path: string) {
  // This is an enhanced version of lodash's unset that removes empty elements in Arrays after unsetting them
  function splitLastPathNode(
    path: string
  ): { parentPath: string; removedNode: string } {
    const pathArray = path.split(".")
    const removedNode = pathArray.pop()
    return { parentPath: pathArray.join("."), removedNode }
  }
  const newObject = cloneDeep(object)
  unset(newObject, path)
  const lastNode = splitLastPathNode(path)
  const parentElement = get(newObject, lastNode.parentPath)
  if (isArray(parentElement)) {
    parentElement.splice(parseInt(lastNode.removedNode), 1)
    set(newObject, lastNode.parentPath, parentElement)
  }
  return newObject
}
