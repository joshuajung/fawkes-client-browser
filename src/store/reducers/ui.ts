// External imports

// Internal imports
import * as el from "../../helpers/eventLibrary"

export interface UiReducerState {
  navbarBurgerOpen: boolean
}

export const defaultState: UiReducerState = {
  navbarBurgerOpen: false
}

export const reducer = (
  state: UiReducerState = defaultState,
  event: el.KnownEvent
): UiReducerState => {
  switch (event.type) {
    case el.EventType.NavbarBurgerToggled:
      return { ...state, navbarBurgerOpen: !state.navbarBurgerOpen }
    default:
      return state
  }
}
