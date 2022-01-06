<template>
  <div class="add-admin-modal">
    <a-modal
      :title="$t('ADD_ADMIN_MODAL_TITLE')"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div></div>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
  },
  data() {
    return {
      ModalText: "Content of the modal",
      confirmLoading: false,
    };
  },
  methods: {
    handleOk() {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.$emit("onCancel");
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      this.$emit("onCancel");
    },
  },
};
</script>
