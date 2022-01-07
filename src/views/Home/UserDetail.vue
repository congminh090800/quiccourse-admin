<template>
  <div id="user-detail-page">
    <a-breadcrumb style="margin-bottom: 20px">
      <a-breadcrumb-item>
        <a-icon type="home" />
      </a-breadcrumb-item>
      <a-breadcrumb-item
        ><router-link to="/user">{{
          $t("BREADCRUMB_USER_LIST")
        }}</router-link></a-breadcrumb-item
      >
      <a-breadcrumb-item
        ><router-link :to="`/user/detail/${id}`">{{
          $t("BREADCRUMB_USER_DETAIL")
        }}</router-link></a-breadcrumb-item
      >
    </a-breadcrumb>
    <a-spin :spinning="loading">
      <a-card :title="$t('USER_DETAIL_TITLE')">
        <div class="detail-item">
          <img
            width="120"
            height="120"
            :src="
              data.avatar
                ? `${baseUrl}api/images/${data.avatar}`
                : require('@/assets/default_avatar.png')
            "
          />
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_ID") }}: {{ data._id }}
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_NAME") }}: {{ data.name }}
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_EMAIL") }}: {{ data.email }}
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_PHONE") }}: {{ data.phone }}
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_BIRTHDAY") }}: {{ data.birthDate }}
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_GENDER") }}:
          {{
            data.gender === "male"
              ? $t("USER_DETAIL_GENDER_MALE")
              : $t("USER_DETAIL_GENDER_FEMALE")
          }}
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_ACCOUNT_TYPE") }}:
          {{ !data.authenticationType ? "native" : data.authenticationType }}
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_STUDENT_ID") }}:
          <span
            v-if="!data.studentId"
            style="font-style: italic; font-weight: 600"
          >
            {{ $t("USER_DETAIL_STUDENT_NOT_MAP") }}</span
          >
          <span v-else>{{ data.studentId }}</span>
          <span style="margin-left: 20px" v-if="!editing">
            <a-button
              style="background-color: green; border: none"
              type="primary"
              @click="() => (editing = !editing)"
              >{{ $t("CHANGE_BTN") }}</a-button
            >
            <a-button
              style="margin-left: 8px"
              type="danger"
              :loading="mapping"
              :disabled="!data.studentId"
              @click="unmapStudentId()"
              >{{ $t("UNMAP_BTN") }}</a-button
            >
          </span>
        </div>
        <div v-if="editing" class="detail-item">
          <ValidationObserver ref="mapRef">
            <a-form @submit.prevent="handleSubmit" layout="inline">
              <ValidationProvider
                name="studentId"
                rules="required|min:6|max:13|alpha_num"
                v-slot="{ errors }"
              >
                <a-form-item
                  style="width: 250px"
                  :validate-status="errors[0] ? 'error' : null"
                  :help="errors[0]"
                >
                  <a-input
                    v-model="studentId"
                    id="studentId"
                    :placeholder="$t('STUDENT_ID_PLACEHOLDER')"
                  >
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-button
                    :loading="mapping"
                    type="primary"
                    html-type="submit"
                  >
                    {{ $t("CONFIRM_BTN") }}
                  </a-button>
                  <a-button
                    style="margin-left: 8px"
                    html-type="button"
                    @click="() => (editing = !editing)"
                  >
                    {{ $t("CANCEL_BTN") }}
                  </a-button>
                </a-form-item>
              </ValidationProvider>
            </a-form>
          </ValidationObserver>
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_IS_BLOCKED") }} :
          <span>
            <a-switch
              checked-children="TRUE"
              un-checked-children="FALSE"
              :checked="data.isBlocked"
              @change="changeStatus()"
              :loading="changingStatus"
            ></a-switch
          ></span>
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_IS_UNACTIVE") }} :
          <span>
            <a-switch
              checked-children="TRUE"
              un-checked-children="FALSE"
              :checked="data.isUnactive"
              disabled
            ></a-switch
          ></span>
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_CREATED_AT") }}: {{ data.createdAt }}
        </div>
        <div class="detail-item">
          {{ $t("USER_DETAIL_IS_DELETED") }} :
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
      changingStatus: false,
      data: {},
      baseUrl: process.env.VUE_APP_BASE_URL,
      editing: false,
      studentId: "",
      mapping: false,
    };
  },
  async mounted() {
    await this.getDetail();
  },
  methods: {
    async getDetail() {
      try {
        this.loading = true;
        const res = await this.$http.get(`/api/admin/users/${this.id}`);
        this.data = res.data.data;
        this.loading = false;
      } catch (err) {
        this.openNotificationWithIcon("error", "FAIL_NOTI_TEXT", err.message);
        this.loading = false;
      }
    },
    async changeStatus() {
      try {
        const isBlocked = this.data.isBlocked;
        this.changingStatus = true;
        if (!isBlocked) {
          await this.$http.patch("/api/admin/users/lock-account", {
            id: this.data._id,
          });
        } else {
          await this.$http.patch("/api/admin/users/unlock-account", {
            id: this.data._id,
          });
        }
        this.openNotificationWithIcon(
          "success",
          "SUCCESS_NOTI_TEXT",
          isBlocked ? "UNLOCK_SUCCESS_MESSAGE" : "LOCK_SUCCESS_MESSAGE"
        );
        await this.getDetail();
        this.changingStatus = false;
      } catch (err) {
        this.openNotificationWithIcon("error", "FAIL_NOTI_TEXT", err.message);
        this.changingStatus = false;
      }
    },
    handleSubmit() {
      this.$refs.mapRef.validate().then(async (success) => {
        if (!success) {
          return;
        }
        try {
          this.mapping = true;
          await this.$http.patch("/api/admin/users/map-student-id", {
            id: this.data._id,
            studentId: this.studentId,
          });
          this.mapping = false;
          this.editing = false;
          this.getDetail();
          this.openNotificationWithIcon(
            "success",
            "SUCCESS_NOTI_TEXT",
            "MAP_STUDENT_ID_SUCCESS_MESSAGE"
          );
        } catch (err) {
          this.mapping = false;
          this.openNotificationWithIcon("error", "FAIL_NOTI_TEXT", err.message);
        }
      });
    },
    async unmapStudentId() {
      try {
        this.mapping = true;
        await this.$http.patch("/api/admin/users/map-student-id", {
          id: this.data._id,
        });
        this.mapping = false;
        this.getDetail();
        this.openNotificationWithIcon(
          "success",
          "SUCCESS_NOTI_TEXT",
          "UNMAP_STUDENT_ID_SUCCESS_MESSAGE"
        );
      } catch (err) {
        this.mapping = false;
        this.openNotificationWithIcon("error", "FAIL_NOTI_TEXT", err.message);
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
#user-detail-page {
  .detail-item {
    margin-bottom: 10px;
    font-size: 16px;
  }
}
</style>
