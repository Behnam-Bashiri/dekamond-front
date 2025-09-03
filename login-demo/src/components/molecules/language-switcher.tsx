import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Simple language switcher toggling between Persian (fa) and English (en).
 * Adjusts the application's language using i18next.
 */
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLang = lang === "fa" ? "en" : "fa";
    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="p-2 rounded-md border"
      aria-label="Toggle language"
    >
      {lang === "fa" ? "EN" : "FA"}
    </button>
  );
};

export default LanguageSwitcher;
