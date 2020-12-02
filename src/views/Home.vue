<template>
  <div class="home">
    <p>Home Page</p>
    <div>
      <a-input placeholder="请输入待复制的内容"
               v-model:value="copyText"
               style="width: 200px" />
      <a-button type="primary"
                @click="onCopy">点我复制</a-button>
    </div>
    <div>
      <a-button type="primary"
                @click="onCreateQrCode">生成二维码</a-button>
      <div v-qrcode="qrText"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import useQRCode from "@/hooks/useQRCode";

const Home = defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    let copyText = ref("");
    let qrText = ref("");

    const onCreateQrCode = () => {
      qrText.value = Math.random().toString();
    };

    return { copyText, qrText, onCreateQrCode };
  },
  methods: {
    onCopy() {
      if (this.copyText) return this.$message.warn("不输点什么，怎么复制");
      this.$copyText(this.copyText).then((_) => {
        this.$message.success("复制成功");
      });
    },
  },
});

export default Home;
</script>
