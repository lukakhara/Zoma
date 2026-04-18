import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";


i18n
  .use(
    resourcesToBackend(
      (language: string) => import(`./locales/${language}/translation.json`),
    ),
  )
  .use(initReactI18next)
  .init({
    lng: "ka",
    fallbackLng: "ka",
    interpolation: {
      escapeValue: false,
    },
  });
