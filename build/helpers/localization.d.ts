/// <reference types="react" />
import Language from "../languages/interface";
export declare type GenericLanguageSelector<LanguageType> = (language: LanguageType) => string | JSX.Element;
export declare type LanguageSelector = GenericLanguageSelector<Language>;
export { Language };
export declare const availableLanguages: {
    "en-us": Language;
};
export declare function lookup<LanguageType>(selector: GenericLanguageSelector<LanguageType>, language: string, availableLanguages: {}, fallbackLanguage: string): string | JSX.Element;
