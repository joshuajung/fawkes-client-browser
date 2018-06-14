// External imports

// Internal imports
import Language from "../languages/interface"
import enUs from "../languages/enUs"
import * as configuration from "../config"

export type GenericLanguageSelector<LanguageType> = (
  language: LanguageType
) => string | JSX.Element
export type LanguageSelector = GenericLanguageSelector<Language>
export { Language }

export const availableLanguages = {
  "en-us": enUs
}

export function lookup<LanguageType>(
  selector: GenericLanguageSelector<LanguageType>,
  language: string,
  availableLanguages: {},
  fallbackLanguage: string
): string | JSX.Element {
  const realSelector = selector as GenericLanguageSelector<LanguageType>
  // Is language available?
  if (typeof availableLanguages[language] === "undefined") {
    language = fallbackLanguage
  }
  try {
    const lookUpResult = realSelector(availableLanguages[language])
    return lookUpResult
  } catch (error) {
    if (configuration.environment.logMissingLanguage)
      console.warn(
        "Missing localization: " +
          selector.toString() +
          " in language " +
          language +
          "."
      )
    // Try to find variable in fallback language
    try {
      const lookUpResultFallback = realSelector(
        availableLanguages[fallbackLanguage]
      )
      return lookUpResultFallback
    } catch (error) {
      // The variable was not found, return selector instead
      return selector.toString()
    }
  }
}
