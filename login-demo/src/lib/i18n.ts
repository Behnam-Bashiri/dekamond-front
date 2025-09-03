import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fa from "@/locales/fa.json";
import en from "@/locales/en.json";

/**
 * Initializes the i18next internationalization library with English and Persian resources.
 * Sets the default language to Persian and updates the document direction based on the active language.
 */
const storedLang = typeof window !== "undefined" ? localStorage.getItem("i18nextLng") || "fa" : "fa";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fa: { translation: fa },
      en: { translation: en },
    },
    lng: storedLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Update document attributes and persist choice on language changes
i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.dir = lng === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("i18nextLng", lng);
  }
});

// Set initial attributes based on current language
if (typeof document !== "undefined") {
  document.documentElement.dir = storedLang === "fa" ? "rtl" : "ltr";
  document.documentElement.lang = storedLang;
}

export default i18n;
