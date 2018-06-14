// External imports

// Internal imports
import * as el from "../../helpers/eventLibrary"
import * as stl from "../types"
import { replaceInArray } from "../../helpers/stateTools"

export interface AdvancedTableState {
  tables: Array<stl.AdvancedTable>
}

export const defaultState: AdvancedTableState = {
  tables: []
}

export const reducer = (
  state: AdvancedTableState = defaultState,
  event: el.KnownEvent
): AdvancedTableState => {
  switch (event.type) {
    case el.EventType.AdvancedRecordListLoadRequestEnded:
      if (
        !event.result.error &&
        event.result.body.code === "ADVANCED_OBJECT_GET_RECORD_LIST_RESULT"
      ) {
        return {
          ...state,
          tables: replaceInArray(
            state.tables,
            t => t.key === event.payload.key,
            t => t,
            {
              key: event.payload.key,
              ui: { filtersExpanded: false }
            }
          )
        }
      } else {
        return state
      }
    case el.EventType.AdvancedTableFilterPanelToggled:
      return {
        ...state,
        tables: replaceInArray(
          state.tables,
          t => t.key === event.key,
          t => ({
            ...t,
            ui: { ...t.ui, filtersExpanded: !t.ui.filtersExpanded }
          })
        )
      }
    default:
      return state
  }
}
