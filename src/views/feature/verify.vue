<template>
  <div class="page-feature-verify">
    <h2>滑块验证码</h2>
    <touch-verify-code ref="touchCode"
                       @success="onTouchSuccess"
                       @failed="onTouchError" />
    <a-button class="reset"
              type="primary"
              @click="onReset">重置滑块</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TouchVerifyCode from "@/components/touch-verify-code/index.vue";

const FeatureVerify = defineComponent({
  components: {
    TouchVerifyCode,
  },
  setup() {
    const touchCode = ref<InstanceType<typeof TouchVerifyCode>>();

    const onReset = () => {
      touchCode.value?.onReset();
    };

    return { touchCode, onReset };
  },
  methods: {
    onTouchSuccess() {
      this.$message.success("验证成功");
    },
    onTouchError() {
      this.$message.error("验证失败，请重试");
    },
  },
});

export default FeatureVerify;
</script>

<style lang="scss" scoped>
.page-feature-verify {
  .reset {
    margin-top: 10px;
  }
}
</style>