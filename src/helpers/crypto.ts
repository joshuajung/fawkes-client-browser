import * as crypto from "crypto"
import { v4 as createGuid } from "uuid"
import * as hashObject from "object-hash"

function createRandomString(maxLength: number = 64): string {
  const buf = crypto.randomBytes(maxLength / 2)
  return buf.toString("hex").substr(0, maxLength)
}

export { createGuid, createRandomString, hashObject }
