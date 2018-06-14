// External imports
import { AdvancedData } from "fawkes-server/build/support"

// Internal imports
import * as stl from "../store/types"

export interface Event {
  type: EventType | string
}
export interface ApiRequestStartedEvent extends Event {
  payload: any
}
export interface ApiRequestEndedEvent extends Event {
  payload: any
  result: {
    body?: any
    error?: Error
    httpStatus?: number
    retrieved: Date
  }
}

export enum EventType {
  AdvancedFormArrayElementAdded = "AdvancedFormArrayElementAdded",
  AdvancedFormArrayElementRemoved = "AdvancedFormArrayElementRemoved",
  AdvancedFormFieldChanged = "AdvancedFormFieldChanged",
  AdvancedFormFieldRegistered = "AdvancedFormFieldRegistered",
  AdvancedFormFieldUnregistered = "AdvancedFormFieldUnregistered",
  AdvancedFormRegistered = "AdvancedFormRegistered",
  AdvancedFormUnregistered = "AdvancedFormUnregistered",
  AdvancedTableFilterPanelToggled = "AdvancedTableFilterPanelToggled",
  AdvancedRecordListLoadRequestEnded = "AdvancedRecordListLoadRequestEnded",
  AdvancedRecordListLoadRequestStarted = "AdvancedRecordListLoadRequestStarted",
  AdvancedRecordDetailsSelectRequestEnded = "AdvancedRecordDetailsSelectRequestEnded",
  AdvancedRecordDetailsSelectRequestStarted = "AdvancedRecordDetailsSelectRequestStarted",
  AdvancedRecordDetailsUpdateRequestEnded = "AdvancedRecordDetailsUpdateRequestEnded",
  AdvancedRecordDetailsUpdateRequestStarted = "AdvancedRecordDetailsUpdateRequestStarted",
  AlertDismissed = "AlertDismissed",
  AlertPresented = "AlertPresented",
  LanguageChanged = "LanguageChanged",
  RegisterRequestStarted = "RegisterRequestStarted",
  RegisterRequestEnded = "RegisterRequestEnded",
  LogInRequestEnded = "LogInRequestEnded",
  LogInRequestStarted = "LogInRequestStarted",
  LogOutRequestEnded = "LogOutRequestEnded",
  LogOutRequestStarted = "LogOutRequestStarted",
  NavbarBurgerToggled = "NavbarBurgerToggled",
  PersistRehydrate = "persist/REHYDRATE",
  MiscApiRequestStarted = "MiscApiRequestStarted",
  MiscApiRequestEnded = "MiscApiRequestEnded",
  Unknown = "Unknown"
}
export type KnownEvent =
  | AdvancedFormArrayElementAdded
  | AdvancedFormArrayElementRemoved
  | AdvancedFormFieldChanged
  | AdvancedFormFieldRegistered
  | AdvancedFormFieldUnregistered
  | AdvancedFormRegistered
  | AdvancedFormUnregistered
  | AdvancedTableFilterPanelToggled
  | AdvancedRecordListLoadRequestEnded
  | AdvancedRecordListLoadRequestStarted
  | AdvancedRecordDetailsSelectRequestEnded
  | AdvancedRecordDetailsSelectRequestStarted
  | AdvancedRecordDetailsUpdateRequestEnded
  | AdvancedRecordDetailsUpdateRequestStarted
  | AlertDismissed
  | AlertPresented
  | LanguageChanged
  | RegisterRequestStarted
  | RegisterRequestEnded
  | LogInRequestEnded
  | LogInRequestStarted
  | LogOutRequestEnded
  | LogOutRequestStarted
  | NavbarBurgerToggled
  | PersistRehydrate
  | MiscApiRequestStarted
  | MiscApiRequestEnded
  | Unknown

export interface AdvancedFormArrayElementAdded extends Event {
  type: EventType.AdvancedFormArrayElementAdded
  formId: string
  path: string
  newElement: object
}
export interface AdvancedFormArrayElementRemoved extends Event {
  type: EventType.AdvancedFormArrayElementRemoved
  formId: string
  path: string
}
export interface AdvancedFormFieldChanged extends Event {
  type: EventType.AdvancedFormFieldChanged
  formId: string
  path: string
  newValue: AdvancedData
}
export interface AdvancedFormFieldRegistered extends Event {
  type: EventType.AdvancedFormFieldRegistered
  path: string
  formId: string
  initialValue: AdvancedData
}
export interface AdvancedFormFieldUnregistered extends Event {
  type: EventType.AdvancedFormFieldUnregistered
  path: string
  formId: string
}
export interface AdvancedFormRegistered extends Event {
  type: EventType.AdvancedFormRegistered
  formId: string
  initialValues?: object
}
export interface AdvancedFormUnregistered extends Event {
  type: EventType.AdvancedFormUnregistered
  formId: string
}
export interface AdvancedTableFilterPanelToggled extends Event {
  type: EventType.AdvancedTableFilterPanelToggled
  key: string
}
export interface AdvancedRecordListLoadRequestEnded
  extends ApiRequestEndedEvent {
  type: EventType.AdvancedRecordListLoadRequestEnded
}
export interface AdvancedRecordListLoadRequestStarted
  extends ApiRequestStartedEvent {
  type: EventType.AdvancedRecordListLoadRequestStarted
}
export interface AdvancedRecordDetailsUpdateRequestEnded
  extends ApiRequestEndedEvent {
  type: EventType.AdvancedRecordDetailsUpdateRequestEnded
}
export interface AdvancedRecordDetailsUpdateRequestStarted
  extends ApiRequestStartedEvent {
  type: EventType.AdvancedRecordDetailsUpdateRequestStarted
}
export interface AdvancedRecordDetailsSelectRequestEnded
  extends ApiRequestEndedEvent {
  type: EventType.AdvancedRecordDetailsSelectRequestEnded
}
export interface AdvancedRecordDetailsSelectRequestStarted
  extends ApiRequestStartedEvent {
  type: EventType.AdvancedRecordDetailsSelectRequestStarted
}
export interface AlertDismissed extends Event {
  type: EventType.AlertDismissed
  alertId: string
}
export interface AlertPresented extends Event {
  type: EventType.AlertPresented
  alert: stl.Alert & stl.Identifiable
}
export interface LanguageChanged extends Event {
  type: EventType.LanguageChanged
  newLanguage: string
}
export interface Unknown extends Event {
  type: EventType.Unknown
}
export interface RegisterRequestStarted extends ApiRequestStartedEvent {
  type: EventType.RegisterRequestStarted
}
export interface RegisterRequestEnded extends ApiRequestEndedEvent {
  type: EventType.RegisterRequestEnded
}
export interface LogInRequestEnded extends ApiRequestEndedEvent {
  type: EventType.LogInRequestEnded
}
export interface LogInRequestStarted extends ApiRequestStartedEvent {
  type: EventType.LogInRequestStarted
}
export interface LogOutRequestEnded extends ApiRequestEndedEvent {
  type: EventType.LogOutRequestEnded
}
export interface LogOutRequestStarted extends ApiRequestStartedEvent {
  type: EventType.LogOutRequestStarted
}
export interface NavbarBurgerToggled extends Event {
  type: EventType.NavbarBurgerToggled
}
export interface PersistRehydrate extends Event {
  type: EventType.PersistRehydrate
}
export interface MiscApiRequestStarted extends ApiRequestStartedEvent {
  type: EventType.MiscApiRequestStarted
}
export interface MiscApiRequestEnded extends ApiRequestEndedEvent {
  type: EventType.MiscApiRequestEnded
}
