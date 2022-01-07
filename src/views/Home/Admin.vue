<template>
  <div id="admin-page">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a-icon type="home" />
      </a-breadcrumb-item>
      <a-breadcrumb-item
        ><router-link to="/admin">{{
          $t("BREADCRUMB_ADMIN_LIST")
        }}</router-link></a-breadcrumb-item
      >
    </a-breadcrumb>
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
      <span class="search-admin-header-item add-btn">
        <a-button
          type="primary"
          icon="plus"
          @click="() => (modalVisible = true)"
        >
          {{ $t("ADD_ADMIN_BTN") }}
        </a-button>
      </span>
    </div>
    <admin-table :sortTime="sortTime" :searchName="searchName"></admin-table>
    <add-admin-modal
      :visible="modalVisible"
      @onCancel="onCancel"
      @onOk="onOk"
    ></add-admin-modal>
  </div>
</template>

<script>
import AddAdminModal from "../../components/Admin/AddAdminModal.vue";
import AdminTable from "../../components/Admin/AdminTable.vue";
export default {
  components: { AdminTable, AddAdminModal },
  data() {
    return {
      searchName: "",
      sortTime: "no",
      modalVisible: false,
      refreshTimes: 0,
    };
  },
  methods: {
    onChange(val) {
      this.sortTime = val;
    },
    onCancel() {
      this.modalVisible = false;
    },
    onOk() {
      this.sortTime = "ASC";
      this.sortTime = "DESC";
    },
  },
};
</script>

<style lang="less" scoped>
#admin-page {
  padding: 16px;
  .search-admin-header {
    display: flex;
    margin-bottom: 20px;
    .search-admin-header-item {
      margin-right: 20px;
      margin-top: 20px;
    }
    .add-btn {
      flex-grow: 1;
      text-align: right;
    }
  }
}
</style>
