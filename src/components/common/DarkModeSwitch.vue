<template>
  <a-switch
    :checked-children="$t('DARK_MODE_TEXT')"
    :un-checked-children="$t('LIGHT_MODE_TEXT')"
    :checked="darkMode"
    @change="changeTheme()"
  ></a-switch>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      darkMode: (state) => state.settings.darkMode,
    }),
  },
  methods: {
    changeTheme() {
      this.$store.dispatch("settings/updateDarkMode", !this.darkMode);
    },
  },
};
</script>

<style></style>
