<template>
  <div class="header-view">
    <a-page-header class="page-header" title="Course admin">
      <template slot="extra">
        <select-lang style="margin-right: 8px"></select-lang>
        <dark-mode-switch></dark-mode-switch>
      </template>
    </a-page-header>
    <div class="side-bar">
      <a-menu
        style="max-width: 250px; height: calc(100vh - 64px)"
        :default-selected-keys="['1']"
        mode="inline"
        :theme="darkMode ? 'dark' : 'light'"
        :inline-collapsed="collapsed"
      >
        <a-menu-item key="1">
          <a-icon type="idcard" />
          <span>Admins</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="user" />
          <span>Users</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="book" />
          <span>Courses</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="import" />
          <span>Log out</span>
        </a-menu-item>
      </a-menu>
      <div class="collapsed-btn">
        <a-button type="primary" @click="toggleCollapsed">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
      </div>
    </div>
  </div>
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
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="less" scoped>
.header-view {
  .side-bar {
    display: flex;
    .collapsed-btn {
      margin-top: 4px;
    }
  }
}
</style>
