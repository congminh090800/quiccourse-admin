<template>
  <div id="class-page">
    <div class="search-class-header">
      <a-input
        class="search-class-header-item"
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
        class="search-class-header-item"
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
    <class-table :sortTime="sortTime" :searchName="searchName"></class-table>
  </div>
</template>

<script>
import ClassTable from "../../components/Classroom/ClassTable.vue";
export default {
  components: { ClassTable },
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
#class-page {
  padding: 16px;
  .search-class-header {
    margin-bottom: 20px;
    .search-class-header-item {
      margin-right: 20px;
      margin-top: 20px;
    }
  }
}
</style>
