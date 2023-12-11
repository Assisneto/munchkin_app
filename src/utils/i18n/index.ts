import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { translations } from "./translations";

type LanguageKeys = keyof typeof translations;

const i18n = new I18n(translations);
console.log(Object.keys(translations));

i18n.defaultLocale = "en";
i18n.locale = Localization.getLocales()[0].languageCode;

export function changeLanguage(lang: LanguageKeys) {
  i18n.locale = lang;
}

export default i18n;
