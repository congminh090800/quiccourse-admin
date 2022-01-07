<template>
  <div class="user-table">
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
      <template slot="renderIsBlocked" slot-scope="data, record">
        <a-switch
          checked-children="TRUE"
          un-checked-children="FALSE"
          :checked="data"
          @change="changeStatus(record)"
          :loading="changingStatus"
        ></a-switch>
      </template>
      <template slot="renderAuthenticationType" slot-scope="data">
        <span>{{ !data ? "native" : data }}</span>
      </template>
      <span slot="renderAction" slot-scope="data, record">
        <div
          style="padding: 4px; cursor: pointer"
          @click="() => $router.push(`/user/detail/${record._id}`)"
        >
          <a-icon type="solution" style="font-size: 20px; color: green" />
        </div>
      </span>
    </a-table>
  </div>
</template>

<script>
const keyTitles = [
  "USER_TABLE_NAME",
  "USER_TABLE_EMAIL",
  "USER_TABLE_ACCOUNT_TYPE",
  "USER_TABLE_STUDENT_ID",
  "USER_TABLE_IS_BLOCKED",
  "USER_TABLE_CREATE_TIME",
  "USER_TABLE_ACTION",
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
    key: "authenticationType",
    dataIndex: "authenticationType",
    scopedSlots: { customRender: "renderAuthenticationType", title: "title2" },
  },
  {
    key: "studentId",
    dataIndex: "studentId",
    scopedSlots: { customRender: "renderStudentId", title: "title3" },
  },
  {
    key: "isBlocked",
    dataIndex: "isBlocked",
    scopedSlots: { customRender: "renderIsBlocked", title: "title4" },
  },
  {
    key: "createdAt",
    dataIndex: "createdAt",
    scopedSlots: { customRender: "renderCreatedAt", title: "title5" },
  },
  {
    key: "action",
    scopedSlots: { customRender: "renderAction", title: "title6" },
  },
];
export default {
  components: {},
  props: {
    sortTime: { type: String, default: "" },
    searchName: { type: String, default: "" },
    searchEmail: { type: String, default: "" },
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
      changingStatus: false,
    };
  },
  async mounted() {
    await this.getUsers();
  },
  watch: {
    sortTime: async function () {
      this.pagination.current = 1;
      await this.getUsers();
    },
    searchName: async function () {
      this.pagination.current = 1;
      await this.getUsers();
    },
    searchEmail: async function () {
      this.pagination.current = 1;
      await this.getUsers();
    },
  },
  methods: {
    async handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      await this.getUsers();
    },
    async getUsers() {
      try {
        this.loading = true;
        const res = await this.$http.get("/api/admin/users", {
          params: {
            limit: this.pagination.pageSize,
            offset: (this.pagination.current - 1) * this.pagination.pageSize,
            name: this.searchName,
            email: this.searchEmail,
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
        description: this.$t(message),
        class: this.$store.state.settings.darkMode
          ? "app-dark-notification"
          : undefined,
      });
    },
    async changeStatus(record) {
      try {
        const isBlocked = record.isBlocked;
        this.changingStatus = true;
        if (!isBlocked) {
          await this.$http.patch("/api/admin/users/lock-account", {
            id: record.id,
          });
        } else {
          await this.$http.patch("/api/admin/users/unlock-account", {
            id: record.id,
          });
        }
        this.openNotificationWithIcon(
          "success",
          "SUCCESS_NOTI_TEXT",
          isBlocked ? "UNLOCK_SUCCESS_MESSAGE" : "LOCK_SUCCESS_MESSAGE"
        );
        await this.getUsers();
        this.changingStatus = false;
      } catch (err) {
        this.openNotificationWithIcon("error", "FAIL_NOTI_TEXT", err.message);
        this.changingStatus = false;
      }
    },
  },
};
</script>

<style></style>
