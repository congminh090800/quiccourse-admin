<template>
  <a-select @change="selectLang" :value="lang" style="width: 120px">
    <a-select-option value="vi">
      {{ $t("VIETNAMESE_TEXT") }}
    </a-select-option>
    <a-select-option value="en">
      {{ $t("ENGLISH_TEXT") }}
    </a-select-option>
  </a-select>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      lang: (state) => state.settings.lang,
    }),
  },
  methods: {
    selectLang(val) {
      console.log(val);
      this.$store.dispatch("settings/updateLang", val.trim().toLowerCase());
    },
  },
};
</script>

<style></style>
