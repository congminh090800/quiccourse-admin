<template>
  <a-layout-sider
    class="page-side-bar"
    v-model="localCollapsed"
    :trigger="null"
    collapsible
  >
    <div style="height: 60px" class="logo">
      <div class="logo-text">Quiccourse</div>
    </div>
    <a-menu
      @select="onSelect"
      style="max-width: 200px; height: calc(100% - 64px)"
      :selectedKeys="[selectedKey]"
      mode="inline"
      :theme="darkMode ? 'dark' : 'light'"
    >
      <a-menu-item key="admin">
        <a-icon type="idcard" />
        <span>{{ $t("ADMIN_TEXT") }}</span>
      </a-menu-item>
      <a-menu-item key="user">
        <a-icon type="user" />
        <span>{{ $t("USER_TEXT") }}</span>
      </a-menu-item>
      <a-menu-item key="class">
        <a-icon type="book" />
        <span>{{ $t("CLASS_TEXT") }}</span>
      </a-menu-item>
      <a-menu-item key="logout">
        <a-icon type="import" />
        <span>{{ $t("LOG_OUT_TEXT") }}</span>
      </a-menu-item>
      <a-menu-item v-if="windowWidth <= 576 && !localCollapsed">
        <dark-mode-switch></dark-mode-switch>
      </a-menu-item>
      <a-menu-item v-if="windowWidth <= 576 && !localCollapsed">
        <select-lang></select-lang>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
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
    localCollapsed: function () {
      return this.collapsed;
    },
  },
  props: {
    collapsed: { type: Boolean, default: false },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      selectedKey: this.$route.fullPath.split("/")[1] || "admin",
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
    onSelect(val) {
      if (val.key === "logout") {
        this.$store.dispatch("auth/logout");
        this.$router.push("/login");
      } else {
        this.selectedKey = val.key;
        this.$router.push(`/${val.key}`);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page-side-bar {
  .logo {
    position: relative;
    .logo-text {
      font-weight: 700;
      font-size: 16px;
      width: 100%;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
