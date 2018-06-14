// External imports
import {
  compose,
  createStore,
  applyMiddleware,
  combineReducers,
  Store,
  Reducer
} from "redux"
import { persistStore, autoRehydrate } from "redux-persist"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"

// Internal imports
import * as config from "../config"
import * as user from "./reducers/user"
import * as application from "./reducers/application"
import * as ui from "./reducers/ui"
import * as advancedRecordList from "./reducers/advancedRecordList"
import * as advancedRecordDetails from "./reducers/advancedRecordDetails"
import * as advancedForm from "./reducers/advancedForm"
import * as advancedTable from "./reducers/advancedTable"

export interface State {
  application: typeof application.defaultState
  ui: typeof ui.defaultState
  user: typeof user.defaultState
  advancedRecordList: typeof advancedRecordList.defaultState
  advancedRecordDetails: typeof advancedRecordDetails.defaultState
  advancedForm: typeof advancedForm.defaultState
  advancedTable: typeof advancedTable.defaultState
  module: object
}

const reducers = (moduleReducer?: Reducer<{}>) =>
  combineReducers({
    application: application.reducer,
    ui: ui.reducer,
    user: user.reducer,
    advancedRecordList: advancedRecordList.reducer,
    advancedRecordDetails: advancedRecordDetails.reducer,
    advancedForm: advancedForm.reducer,
    advancedTable: advancedTable.reducer,
    module: moduleReducer
  })

export function configureStore(moduleReducer?: Reducer<{}>): Store<State> {
  let middlewareToApply = []
  middlewareToApply.push(thunkMiddleware)
  if (config.environment.enableReduxLogger)
    middlewareToApply.push(
      createLogger({
        predicate: (getState, action) => {
          return (
            config.environment.reduxLoggerBlacklist.indexOf(action.type) === -1
          )
        }
      })
    )
  const storeMiddleware = applyMiddleware(...middlewareToApply)

  let enhancersToApply = []
  enhancersToApply.push(storeMiddleware)
  if (!config.environment.disableRehydration)
    enhancersToApply.push(autoRehydrate())
  const store = createStore(
    reducers(moduleReducer),
    {},
    compose(...enhancersToApply)
  ) as Store<State>

  if (!config.environment.disableRehydration) {
    persistStore(store, {
      whitelist: ["user"]
    })
  }

  return store
}

export type GetState = () => State
