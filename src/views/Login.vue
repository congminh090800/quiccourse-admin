<template>
  <div id="login-page">
    <div class="login-form" style="height: 50%; width: 320px">
      <div style="margin-bottom: 20px">
        Hint admin: admin@gmail.com / 123456
      </div>
      <div class="settings-header">
        <select-lang></select-lang>
        <dark-mode-switch style="margin-left: 8px"></dark-mode-switch>
      </div>
      <ValidationObserver ref="loginRef">
        <a-alert
          v-if="serverError"
          :message="serverError"
          type="error"
          show-icon
          style="margin-bottom: 12px"
        />
        <a-form @submit.prevent="handleSubmit">
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
          <a-form-item style="text-align: right">
            <a-button :loading="loading" type="primary" html-type="submit">
              {{ $t("LOGIN_TEXT") }}
            </a-button>
          </a-form-item>
        </a-form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import DarkModeSwitch from "../components/common/DarkModeSwitch.vue";
import SelectLang from "../components/common/SelectLang.vue";

export default {
  components: { SelectLang, DarkModeSwitch },
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      serverError: "",
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginRef.validate().then(async (success) => {
        if (!success) {
          return;
        }
        try {
          this.serverError = "";
          this.loading = true;
          await this.$store.dispatch("auth/login", {
            email: this.email,
            password: this.password,
          });
          this.loading = false;
          this.$router.push("/");
        } catch (err) {
          this.loading = false;
          this.serverError = err.message;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#login-page {
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%; -50%;);
    .settings-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 16px;
    }
  }
}
</style>
