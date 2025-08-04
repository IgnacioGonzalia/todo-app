import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "./en.json";
import es from "./es.json";

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

const deviceLanguage = Localization.getLocales()[0]?.languageCode || "en";
console.log("Device language detected:", deviceLanguage);

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },

  compatibilityJSON: "v4",
});

export default i18n;
