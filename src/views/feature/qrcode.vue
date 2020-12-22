<template>
  <div class="page-feature-qrcode">
    <h2>二维码生成</h2>
    <div>
      <a-button type="primary"
                @click="onCreateQrCode">生成二维码</a-button>
      <div v-qrcode="qrText"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const FeatureQrCode = defineComponent({
  setup() {
    let qrText = ref("");

    const onCreateQrCode = () => {
      qrText.value = Math.random().toString();
    };

    return { qrText, onCreateQrCode };
  },
});

export default FeatureQrCode;
</script>