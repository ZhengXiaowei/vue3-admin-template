<template>
  <div class="page-home">
    <h2>已有功能</h2>
    <div class="features-list">
      <ul>
        <li v-for="feat in features"
            :key="feat.value"
            @click="onRouteChange(feat.value)">{{ feat.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useApp from "@/hooks/useApp";

const Home = defineComponent({
  name: "Home",
  setup() {
    const { router } = useApp();
    let features = ref([
      {
        label: "复制",
        value: "copy",
      },
      {
        label: "二维码生成",
        value: "qrcode",
      },
      {
        label: "拖拽排序",
        value: "drag",
      },
      {
        label: "滑块验证码",
        value: "verify",
      },
    ]);

    const onRouteChange = (path: string) => {
      router.push(`/feature/${path}`);
    };

    return {
      features,
      onRouteChange,
    };
  },
});

export default Home;
</script>

<style lang="scss" scoped>
.page-home {
  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
    font-size: 16px;
    color: $theme-color;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
</style>
