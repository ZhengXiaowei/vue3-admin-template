<template>
  <div class="page-feature-copy">
    <h2>复制</h2>
    <div>
      <a-input placeholder="请输入待复制的内容"
               v-model:value="copyText"
               style="width: 200px" />
      <a-button type="primary"
                @click="onCopy">点我复制</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const FeatureCopy = defineComponent({
  setup() {
    let copyText = ref("");

    return { copyText };
  },
  methods: {
    onCopy() {
      if (!this.copyText) return this.$message.warn("不输点什么，怎么复制");
      this.$copyText(this.copyText).then((_) => {
        this.$message.success("复制成功");
      });
    },
  },
});

export default FeatureCopy;
</script>