<template>
  <div id="admin-page">
    <admin-table></admin-table>
  </div>
</template>

<script>
import AdminTable from "../../components/Admin/AdminTable.vue";
export default {
  components: { AdminTable },
};
</script>

<style lang="less" scoped>
#admin-page {
  padding: 16px;
}
</style>
