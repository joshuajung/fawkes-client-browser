// External imports

// Internal imports
import * as el from "./eventLibrary"
import { GetState } from "../store/store"

export type ThunkCallDispatchOnly = (dispatch: ((event: el.Event | ThunkCall) => void)) => void
export type ThunkCallFull = (
  dispatch: ((event: el.Event | ThunkCall) => void),
  getState: GetState
) => void
export type ThunkCall = ThunkCallDispatchOnly | ThunkCallFull

export enum MiddlewareIdentifier {
  Api,
  Alert
}

export type MiddlewareCall = ThunkCall
