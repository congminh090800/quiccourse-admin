import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/main.less";
import store from "./store";
import i18n from "./i18n";
import * as rules from "vee-validate/dist/rules";
import http from "./http";
import VueAxios from "vue-axios";
import {
  configure,
  extend,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
configure({
  defaultMessage: (field, values) => {
    values._field_ = i18n.t(`fields.${field}`);
    if (values._field_.indexOf(`fields.`) !== -1) {
      values._field_ = values._field_.replace("fields.", "");
    }
    if (values._rule_ == "decimal" && !values["0"]) {
      values._rule_ = "decimal_any";
    }
    return i18n.t(`messages.${values._rule_}`, values);
  },
});

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
extend("decimal", {
  validate: (value, [decimals = "*", separator = "."]) => {
    if (value === null || value === undefined || value === "") {
      return {
        valid: false,
      };
    }
    if (Number(decimals) === 0) {
      return {
        valid: /^-?\d*$/.test(value),
      };
    }
    const regexPart = decimals === "*" ? "+" : `{1,${decimals}}`;
    const regex = new RegExp(
      `^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`
    );

    return {
      valid: regex.test(value),
    };
  },
});
extend("maxAmount", {
  validate: (value, max) => {
    return { valid: Number(max) >= value };
  },
});

extend("positiveNumber", {
  validate: (value, isPositive) => {
    const number = parseFloat(value);
    return { valid: isPositive && number > 0 };
  },
});

Vue.use(Antd);

Vue.use(VueAxios, http);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
