<template>
  <a-layout-header class="page-header" style="padding: 0">
    <a-icon
      class="trigger coll-btn"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="onCollapsible"
    />
    <dark-mode-switch
      class="right-item"
      v-if="windowWidth > 576"
    ></dark-mode-switch>
    <select-lang class="right-item" v-if="windowWidth > 576"></select-lang>
  </a-layout-header>
</template>

<script>
import DarkModeSwitch from "./DarkModeSwitch.vue";
import SelectLang from "./SelectLang.vue";
import { mapState } from "vuex";
export default {
  components: { DarkModeSwitch, SelectLang },
  computed: {
    ...mapState({
      darkMode: (state) => state.settings.darkMode,
    }),
  },
  props: {
    collapsed: { type: Boolean, default: false },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  created() {
    window.addEventListener("resize", this.onWindowSizeChange);
  },
  destroyed() {
    window.removeEventListener("resize", this.onWindowSizeChange);
  },
  methods: {
    onWindowSizeChange() {
      this.windowWidth = window.innerWidth;
    },
    onCollapsible() {
      this.$emit("onCollapsible");
    },
  },
};
</script>

<style lang="less" scoped>
.page-header {
  display: flex;
  align-items: center;
  .coll-btn {
    flex-grow: 1;
    text-align: left;
    padding-left: 8px;
  }
  .right-item {
    margin-right: 16px;
  }
}
</style>
