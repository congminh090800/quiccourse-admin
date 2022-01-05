import { UPDATE_DARK_MODE, UPDATE_LANG } from "./constants";
export default {
  updateDarkMode(context, payload) {
    context.commit(UPDATE_DARK_MODE, payload);
  },
  updateLang(context, payload) {
    context.commit(UPDATE_LANG, payload);
  },
};
