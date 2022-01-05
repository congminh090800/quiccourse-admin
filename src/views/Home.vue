<template>
  <div class="home">
    Home Page
    <div>
      <a-button type="primary" @click="switchDarkTheme()"> Primary </a-button>
    </div>
    <div>
      <a-button type="danger"> Danger </a-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState({
      darkMode: (state) => state.settings.darkMode,
    }),
  },
  methods: {
    switchDarkTheme() {
      this.$store.dispatch("settings/updateDarkMode", !this.darkMode);
    },
  },
};
</script>
