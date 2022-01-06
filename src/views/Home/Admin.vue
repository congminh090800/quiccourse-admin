<template>
  <div id="admin-page">
    <div class="search-admin-header">
      <a-input
        class="search-admin-header-item"
        style="width: 250px"
        :placeholder="$t('SEARCH_NAME_PLACEHOLDER')"
        v-model="searchName"
      >
        <a-icon slot="suffix" type="search"
      /></a-input>
      <a-select
        :value="sortTime"
        @select="onChange"
        style="width: 250px"
        class="search-admin-header-item"
      >
        <a-select-option value="no" hidden>
          {{ $t("CREATED_AT_PLACEHOLDER") }}
        </a-select-option>
        <a-select-option value="ASC">
          {{ $t("ASCENDING_SELECT_OPTION") }}
        </a-select-option>
        <a-select-option value="DESC">
          {{ $t("DESCREASING_SELECT_OPTION") }}
        </a-select-option>
      </a-select>
    </div>
    <admin-table :sortTime="sortTime" :searchName="searchName"></admin-table>
  </div>
</template>

<script>
import AdminTable from "../../components/Admin/AdminTable.vue";
export default {
  components: { AdminTable },
  data() {
    return {
      searchName: "",
      sortTime: "no",
    };
  },
  methods: {
    onChange(val) {
      this.sortTime = val;
    },
  },
};
</script>

<style lang="less" scoped>
#admin-page {
  padding: 16px;
  .search-admin-header {
    margin-bottom: 20px;
    .search-admin-header-item {
      margin-right: 20px;
      margin-top: 20px;
    }
  }
}
</style>
