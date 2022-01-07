<template>
  <div class="add-admin-modal">
    <a-modal
      :title="$t('ADD_ADMIN_MODAL_TITLE')"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :footer="null"
      :wrapClassName="darkMode == true ? 'app-dark-modal' : undefined"
    >
      <div>
        <ValidationObserver ref="addAdminRef">
          <a-alert
            v-if="serverError"
            :message="serverError"
            type="error"
            show-icon
            style="margin-bottom: 12px"
          />
          <a-form @submit.prevent="handleOk">
            <ValidationProvider
              name="name"
              rules="required|min:6"
              v-slot="{ errors }"
            >
              <a-form-item
                :validate-status="errors[0] ? 'error' : null"
                :help="errors[0]"
              >
                <a-input
                  v-model="name"
                  id="name"
                  :placeholder="$t('NAME_PLACEHOLDER')"
                >
                  <a-icon
                    slot="prefix"
                    type="idcard"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>
              </a-form-item>
            </ValidationProvider>
            <ValidationProvider
              name="email"
              rules="required|email|min:13"
              v-slot="{ errors }"
            >
              <a-form-item
                :validate-status="errors[0] ? 'error' : null"
                :help="errors[0]"
              >
                <a-input
                  v-model="email"
                  id="email"
                  :placeholder="$t('EMAIL_PLACEHOLDER')"
                >
                  <a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input>
              </a-form-item>
            </ValidationProvider>
            <ValidationProvider
              name="password"
              :rules="{
                required: true,
                regex: /^[a-zA-Z0-9!@#$%^&*()-_=+]{6,30}$/,
              }"
              v-slot="{ errors }"
            >
              <a-form-item
                :validate-status="errors[0] ? 'error' : null"
                :help="errors[0]"
              >
                <a-input-password
                  v-model="password"
                  id="password"
                  :placeholder="$t('PASSWORD_PLACEHOLDER')"
                >
                  <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input-password>
              </a-form-item>
            </ValidationProvider>
            <ValidationProvider
              name="confirmPassword"
              :rules="{
                required: true,
                confirmed: 'password',
              }"
              v-slot="{ errors }"
            >
              <a-form-item
                :validate-status="errors[0] ? 'error' : null"
                :help="errors[0]"
              >
                <a-input-password
                  v-model="confirmPassword"
                  id="confirmPassword"
                  :placeholder="$t('CONFIRM_PASSWORD_PLACEHOLDER')"
                >
                  <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0, 0, 0, 0.25)"
                  />
                </a-input-password>
              </a-form-item>
            </ValidationProvider>
            <a-form-item style="text-align: right">
              <a-button html-type="button" @click="handleCancel">
                {{ $t("CANCEL_BTN") }}
              </a-button>
              <a-button
                :loading="confirmLoading"
                type="primary"
                html-type="submit"
                style="margin-left: 20px"
              >
                {{ $t("CONFIRM_ADD_ADMIN_BTN") }}
              </a-button>
            </a-form-item>
          </a-form>
        </ValidationObserver>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    visible: { type: Boolean, default: false },
  },
  data() {
    return {
      confirmLoading: false,
      serverError: "",
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    ...mapState({
      darkMode: (state) => state.settings.darkMode,
    }),
  },
  methods: {
    handleOk() {
      this.$refs.addAdminRef.validate().then(async (success) => {
        if (!success) {
          return;
        }
        try {
          this.serverError = "";
          this.confirmLoading = true;
          await this.$http.post("/api/admin/create-admin", {
            email: this.email,
            password: this.password,
            name: this.name,
          });
          this.confirmLoading = false;
          this.openNotificationWithIcon(
            "success",
            "SUCCESS_NOTI_TEXT",
            "ADD_ADMIN_SUCCESS_MESSAGE"
          );
          this.$emit("onOk");
          this.handleCancel();
        } catch (err) {
          this.confirmLoading = false;
          this.serverError = err.message;
        }
      });
    },
    handleCancel() {
      this.email = "";
      this.name = "";
      this.password = "";
      this.confirmPassword = "";
      this.$emit("onCancel");
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
