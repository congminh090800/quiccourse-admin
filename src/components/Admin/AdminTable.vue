<template>
  <div class="admin-table">
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template v-for="(val, index) in keyTitles" :slot="`title${index}`">
        <span :key="index">
          {{ $t(val) }}
        </span>
      </template>
      <span slot="renderAction">
        <div style="padding: 4px; cursor: pointer">
          <a-icon type="solution" style="font-size: 20px; color: green" />
        </div>
      </span>
    </a-table>
  </div>
</template>

<script>
const keyTitles = [
  "ADMIN_TABLE_NAME",
  "ADMIN_TABLE_EMAIL",
  "ADMIN_TABLE_CREATE_TIME",
  "ADMIN_TABLE_ACTION",
];
const columns = [
  {
    key: "name",
    dataIndex: "name",
    scopedSlots: { customRender: "renderName", title: "title0" },
  },
  {
    key: "email",
    dataIndex: "email",
    scopedSlots: { customRender: "renderEmail", title: "title1" },
  },
  {
    key: "createdAt",
    dataIndex: "createdAt",
    scopedSlots: { customRender: "renderCreatedAt", title: "title2" },
  },
  {
    width: "10%",
    key: "action",
    scopedSlots: { customRender: "renderAction", title: "title3" },
  },
];
export default {
  components: {},
  data() {
    return {
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
      loading: true,
      columns,
      keyTitles,
      notiContent: {
        msgType: "error",
        title: "",
        message: "",
        showNoti: false,
      },
    };
  },
  async mounted() {
    await this.getAdmins();
  },
  methods: {
    async handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      await this.getAdmins();
    },
    async getAdmins() {
      try {
        this.loading = true;
        const res = await this.$http.get("/api/admin/search-admin", {
          params: {
            limit: this.pagination.pageSize,
            offset: (this.pagination.current - 1) * this.pagination.pageSize,
          },
        });
        this.data = res.data.data.docs;
        const paging = { ...this.pagination };
        paging.total = res.data.data.total;
        this.pagination = paging;
        this.loading = false;
      } catch (err) {
        this.openNotificationWithIcon("error", "FAIL_NOTI_TEXT", err.message);
        this.loading = false;
      }
    },
    openNotificationWithIcon(type, title, message) {
      this.$notification[type]({
        message: this.$t(title),
        description: message,
      });
    },
  },
};
</script>

<style></style>
