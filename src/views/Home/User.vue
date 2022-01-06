<template>
  <div id="user-page">
    <div class="search-user-header">
      <a-input
        class="search-user-header-item"
        style="width: 250px"
        :placeholder="$t('SEARCH_NAME_PLACEHOLDER')"
        v-model="searchName"
      >
        <a-icon slot="suffix" type="search"
      /></a-input>
      <a-input
        class="search-user-header-item"
        style="width: 250px"
        :placeholder="$t('SEARCH_EMAIL_PLACEHOLDER')"
        v-model="searchEmail"
      >
        <a-icon slot="suffix" type="search"
      /></a-input>
      <a-select
        :value="sortTime"
        @select="onChange"
        style="width: 250px"
        class="search-user-header-item"
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
    <user-table
      :sortTime="sortTime"
      :searchName="searchName"
      :searchEmail="searchEmail"
    ></user-table>
  </div>
</template>

<script>
import UserTable from "../../components/User/UserTable.vue";
export default {
  components: { UserTable },
  data() {
    return {
      searchName: "",
      searchEmail: "",
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
#user-page {
  padding: 16px;
  .search-user-header {
    margin-bottom: 20px;
    .search-user-header-item {
      margin-right: 20px;
      margin-top: 20px;
    }
  }
}
</style>
