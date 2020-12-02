<template>
  <a-layout-header class="web-header">
    <p class="title-font web-title">{{title}}</p>
    <!-- logo -->
    <!-- <router-link to="/"
                 custom
                 v-slot="{navigate}">
      <div class="cursor logo-wrap"
           @click="navigate">
        <img src="@/assets/logo.png"
             alt="">
      </div>
    </router-link> -->
    <!-- 站点搜索/添加 -->
    <!-- <app-header-channel v-model:channel="current_site" /> -->
    <!-- 用户操作 -->
    <app-header-user v-if="user"
                     :name="user" />
  </a-layout-header>
</template>

<script lang="ts">
import useApp from "@/hooks/useApp";
import { computed, defineComponent, reactive, ref, toRefs } from "vue";

import AppHeaderChannel from "./AppHeaderChannel.vue";
import AppHeaderUser from "./AppHeaderUser.vue";

const AppHeader = defineComponent({
  components: {
    AppHeaderChannel,
    AppHeaderUser,
  },
  setup() {
    const { store } = useApp();

    const data = reactive({
      user: computed(() => store.getters.user.nickname),
      title: computed(() => store.getters.pageTitle),
    });

    return {
      ...toRefs(data),
    };
  },
});

export default AppHeader;
</script>
