<template>
  <div class="class-table">
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :scroll="{ x: true }"
    >
      <template v-for="(val, index) in keyTitles" :slot="`title${index}`">
        <span :key="index">
          {{ $t(val) }}
        </span>
      </template>
      <template slot="renderOwner" slot-scope="data">
        <span>{{ data.name }}</span>
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
  "CLASS_TABLE_NAME",
  "CLASS_TABLE_CODE",
  "CLASS_TABLE_OWNER",
  "CLASS_TABLE_CREATE_TIME",
  "CLASS_TABLE_ACTION",
];
const columns = [
  {
    key: "name",
    dataIndex: "name",
    scopedSlots: { customRender: "renderName", title: "title0" },
  },
  {
    key: "code",
    dataIndex: "code",
    scopedSlots: { customRender: "renderCode", title: "title1" },
  },
  {
    key: "owner",
    dataIndex: "owner",
    scopedSlots: { customRender: "renderOwner", title: "title2" },
  },
  {
    key: "createdAt",
    dataIndex: "createdAt",
    scopedSlots: { customRender: "renderCreatedAt", title: "title3" },
  },
  {
    width: "10%",
    key: "action",
    scopedSlots: { customRender: "renderAction", title: "title4" },
  },
];
export default {
  components: {},
  props: {
    sortTime: { type: String, default: "" },
    searchName: { type: String, default: "" },
  },
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
    await this.getClasses();
  },
  watch: {
    sortTime: async function () {
      this.pagination.current = 1;
      await this.getClasses();
    },
    searchName: async function () {
      this.pagination.current = 1;
      await this.getClasses();
    },
  },
  methods: {
    async handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      await this.getClasses();
    },
    async getClasses() {
      try {
        this.loading = true;
        const res = await this.$http.get("/api/admin/courses", {
          params: {
            limit: this.pagination.pageSize,
            offset: (this.pagination.current - 1) * this.pagination.pageSize,
            name: this.searchName,
            timeOrder: this.sortTime === "ASC" ? "ASC" : "DESC",
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
        class: this.$store.state.settings.darkMode
          ? "app-dark-notification"
          : undefined,
      });
    },
  },
};
</script>

<style></style>
