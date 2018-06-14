"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function replaceInArray(array, selector, modifier, orAdd) {
    let rowsAffected = 0;
    let newArray = [];
    array.forEach(element => {
        if (selector(element)) {
            rowsAffected++;
            const newValue = modifier(element);
            if (!lodash_1.isNil(newValue)) {
                newArray.push(newValue);
            }
        }
        else
            newArray.push(element);
    });
    if (rowsAffected === 0 && !lodash_1.isNil(orAdd)) {
        newArray.push(orAdd);
    }
    return newArray;
}
exports.replaceInArray = replaceInArray;
function findAdvancedRecord(advancedRecordDetailsState, advancedObjectName, advancedRecordId, retrievedAfter) {
    return advancedRecordDetailsState.records.find(record => record.advancedObjectName === advancedObjectName &&
        record.advancedRecordId == advancedRecordId &&
        record.retrievedAt >= (retrievedAfter || 0));
}
exports.findAdvancedRecord = findAdvancedRecord;
function findAdvancedRecordProperty(advancedRecordDetailsState, advancedObjectName, advancedRecordId, propertyName, retrievedAfter) {
    const record = findAdvancedRecord(advancedRecordDetailsState, advancedObjectName, advancedRecordId, retrievedAfter);
    if (lodash_1.isNil(record))
        return undefined;
    const property = record.data[propertyName];
    return property;
}
exports.findAdvancedRecordProperty = findAdvancedRecordProperty;
function setImmutable(object, path, value) {
    const newObject = lodash_1.cloneDeep(object);
    lodash_1.set(newObject, path, value);
    return newObject;
}
exports.setImmutable = setImmutable;
function unsetImmutable(object, path) {
    function splitLastPathNode(path) {
        const pathArray = path.split(".");
        const removedNode = pathArray.pop();
        return { parentPath: pathArray.join("."), removedNode };
    }
    const newObject = lodash_1.cloneDeep(object);
    lodash_1.unset(newObject, path);
    const lastNode = splitLastPathNode(path);
    const parentElement = lodash_1.get(newObject, lastNode.parentPath);
    if (lodash_1.isArray(parentElement)) {
        parentElement.splice(parseInt(lastNode.removedNode), 1);
        lodash_1.set(newObject, lastNode.parentPath, parentElement);
    }
    return newObject;
}
exports.unsetImmutable = unsetImmutable;
//# sourceMappingURL=stateTools.js.map