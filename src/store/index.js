import Vue from "vue";
import Vuex from "vuex";
import settings from "./settings";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
const persistenceOptions = {
  key: ["vuex", "hcmus-cours-admin"].join("-"),
  storage: window.localStorage,
};

const store = new Vuex.Store({
  modules: {
    settings,
  },
  plugins: [new VuexPersistence(persistenceOptions).plugin],
});

export default store;
