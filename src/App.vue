<template>
  <div :id="`app-${darkMode ? 'dark' : 'light'}`">
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState({
      darkMode: (state) => state.settings.darkMode,
    }),
  },
};
</script>
<style></style>
