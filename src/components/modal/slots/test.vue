<template>
  <div>
    <p>{{message || "默认内容"}}</p>
    <a-button type="primary"
              @click="onCloseAndDestroy">关闭并销毁</a-button>
  </div>
</template>

<script lang="ts">
import { baseProps } from "@/components/base-props";
import { Button } from "ant-design-vue";
import { defineComponent } from "vue";

const TestComponent = defineComponent({
  components: {
    [Button.name]: Button,
  },
  props: {
    ...baseProps,
    message: String,
  },
  setup(props) {
    const onCloseAndDestroy = () => {
      props.onClose?.();
      setTimeout(() => {
        props.onClosed?.();
      }, 500);
    };

    return { onCloseAndDestroy };
  },
});

export default TestComponent;
</script>
