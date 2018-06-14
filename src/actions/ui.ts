// External imports

// Internal imports
import * as el from "../helpers/eventLibrary"

export const changeLanguage = (newLanguage: string): el.LanguageChanged => ({
  type: el.EventType.LanguageChanged,
  newLanguage: newLanguage
})

export const toggleNavbarBurger = (): el.NavbarBurgerToggled => ({
  type: el.EventType.NavbarBurgerToggled
})
