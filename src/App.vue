<template>
  <div :id="`app-${darkMode ? 'dark' : 'light'}`">
    <Header></Header>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import Header from "./components/common/Header.vue";
export default {
  name: "App",
  components: { Header },
  computed: {
    ...mapState({
      darkMode: (state) => state.settings.darkMode,
    }),
  },
};
</script>
<style></style>
