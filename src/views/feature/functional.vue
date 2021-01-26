<template>
  <div class="page-feature-functional">
    <h2>函数式组件</h2>
    <div>
      <a-input placeholder="请输入弹窗内容"
               v-model:value="inputVal"
               style="width: 200px" />
      <a-button type="primary"
                @click="onShow">弹窗</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { createModal, TestComponent } from "@/components/modal";

const Functional = defineComponent({
  setup() {
    let inputVal = ref("");

    const onShow = () => {
      createModal<{ message: string }>(TestComponent, {
        components: {
          title: "测试弹窗",
        },
        message: inputVal.value,
      });
    };

    return { inputVal, onShow };
  },
});

export default Functional;
</script>
