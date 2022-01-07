import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "./locales/en.json";
import vi from "./locales/vi.json";
import { localize } from "vee-validate";
Vue.use(VueI18n);

const localStorage = JSON.parse(
  window.localStorage.getItem("vuex-quiccourse-admin")
);
const i18n = new VueI18n({
  locale:
    localStorage?.settings.lang || process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  silentTranslationWarn: true,
  messages: {
    en,
    vi,
  },
});
localize({ en, vi });
export default i18n;
