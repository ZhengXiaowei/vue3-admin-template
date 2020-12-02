<template>
  <a-popover trigger="click">
    <template v-slot:content>
      <div class="setting-group">
        <p class="cursor">
          <PoweroffOutlined />安全退出
        </p>
      </div>
    </template>
    <div class="user-wrap">
      <UserOutlined />
      <p class="user">推广员：{{name}}</p>
      <CaretDownFilled />
    </div>
  </a-popover>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  UserOutlined,
  CaretDownFilled,
  PoweroffOutlined,
} from "@ant-design/icons-vue";

const AppHeaderUser = defineComponent({
  components: {
    UserOutlined,
    CaretDownFilled,
    PoweroffOutlined,
  },
  props: {
    name: String,
  },
});

export default AppHeaderUser;
</script>
