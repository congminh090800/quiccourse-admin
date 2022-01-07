<template>
  <div id="admin-detail-page">
    <a-breadcrumb style="margin-bottom: 20px">
      <a-breadcrumb-item>
        <a-icon type="home" />
      </a-breadcrumb-item>
      <a-breadcrumb-item
        ><router-link to="/admin">{{
          $t("BREADCRUMB_ADMIN_LIST")
        }}</router-link></a-breadcrumb-item
      >
      <a-breadcrumb-item
        ><router-link :to="`/admin/detail/${id}`">{{
          $t("BREADCRUMB_ADMIN_DETAIL")
        }}</router-link></a-breadcrumb-item
      >
    </a-breadcrumb>
    <a-spin :spinning="loading">
      <a-card :title="$t('ADMIN_DETAIL_TITLE')">
        <div class="detail-item">
          {{ $t("ADMIN_DETAIL_ID") }}: {{ data._id }}
        </div>
        <div class="detail-item">
          {{ $t("ADMIN_DETAIL_NAME") }}: {{ data.name }}
        </div>
        <div class="detail-item">
          {{ $t("ADMIN_DETAIL_EMAIL") }}: {{ data.email }}
        </div>
        <div class="detail-item">
          {{ $t("ADMIN_DETAIL_CREATED_AT") }}: {{ data.createdAt }}
        </div>
        <div class="detail-item">
          {{ $t("ADMIN_DETAIL_IS_DELETED") }} :
          <span>
            <a-switch
              checked-children="TRUE"
              un-checked-children="FALSE"
              :checked="data.deleted_flag"
              disabled
            ></a-switch
          ></span>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      loading: false,
      data: {},
    };
  },
  async mounted() {
    await this.getDetail();
  },
  methods: {
    async getDetail() {
      try {
        this.loading = true;
        const res = await this.$http.get(`/api/admin/admin-detail/${this.id}`);
        this.data = res.data.data;
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
  },
};
</script>

<style lang="less" scoped>
#admin-detail-page {
  .detail-item {
    margin-bottom: 10px;
    font-size: 16px;
  }
}
</style>
