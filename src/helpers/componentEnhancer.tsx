// External imports
import { connect, Dispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import * as React from "react"
import { AnyAction } from "redux"

// Internal imports
import { State } from "../store/store"
import {
  lookup,
  LanguageSelector,
  availableLanguages,
  GenericLanguageSelector,
  Language
} from "./localization"
import { MiddlewareCall } from "./middlewareTypes"
import * as stl from "../store/types"
import Module from "../helpers/moduleInterface"
import silence from "../helpers/silence"
import * as config from "../config"

export type StateMappingsWithModuleState<ModuleState, ParentProps> = ((
  state: State & { module: ModuleState },
  props: ParentProps & EnhancedPropsPrivate
) => object)
export type StateMappings<ParentProps> = StateMappingsWithModuleState<
  null,
  ParentProps
>
export type DispatchMappings<ParentProps> = ((
  dispatch: Dispatch<State>,
  props: ParentProps & EnhancedPropsPrivate
) => object)
// LookupLite returns "any" to avoid type warnings
export type LookupLite = (selector: LanguageSelector) => any
export interface LookupProps {
  cl?: LookupLite
  language?: string
  mountedAt?: Date
}
export interface ModuleProps {
  module?: Module
}
export interface RouterProps {
  match: {
    isExact: boolean
    params: any
    path: string
    url: string
  }
  history: any
}
export type EnhancedPropsPrivate = LookupProps & ModuleProps & RouterProps
export type EnhancedPropsPublic = ModuleProps
export interface State extends State {}
export type ActionOrCall = AnyAction | MiddlewareCall
export type Dispatch = (actionOrCall: ActionOrCall) => void
export { LanguageSelector, stl, silence, GenericLanguageSelector, Language }

export interface EnhanceOptions<ModuleState, ParentProps> {
  formName?: string
  stateMappings?: StateMappingsWithModuleState<ModuleState, ParentProps>
  dispatchMappings?: DispatchMappings<ParentProps>
}

export function enhance<Props>(
  Component: React.ComponentType<Props>,
  options: EnhanceOptions<null, Props> = {}
): React.ComponentType<Props & EnhancedPropsPublic> {
  // Unwrap options
  const { stateMappings = s => ({}), dispatchMappings = d => ({}) } = options
  const enhancedStateMappings: StateMappings<any> = (state, props) => ({
    ...stateMappings(state, props),
    cl: (selector: LanguageSelector) =>
      lookup(
        selector,
        state.user.language,
        availableLanguages,
        config.ui.fallbackLanguage
      ),
    language: state.user.language || config.ui.fallbackLanguage
  })
  // Attach additional HOCs
  let enhancedComponent = connect(enhancedStateMappings, dispatchMappings)(
    Component
  )
  enhancedComponent = withRouter(enhancedComponent)
  // Return enhanced HOC
  return enhancedComponent
}
