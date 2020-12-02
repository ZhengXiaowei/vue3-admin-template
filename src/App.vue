<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

const App = defineComponent({
  setup() {
    const locale = ref(zhCN);
    return { locale };
  },
});

export default App;
</script>