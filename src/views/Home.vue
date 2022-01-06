<template>
  <a-layout style="min-height: 100%" class="home">
    <Sidebar :collapsed="collapsed"></Sidebar>
    <a-layout>
      <Header :collapsed="collapsed" @onCollapsible="onCollapsible"></Header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Header from "../components/common/Header.vue";
import Sidebar from "../components/common/Sidebar.vue";
export default {
  name: "Home",
  components: { Header, Sidebar },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    onCollapsible() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
