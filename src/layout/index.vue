<template>
  <a-layout class="web-wrapper">
    <app-header />
    <a-layout>
      <a-layout-sider v-if="roles.length"
                      class="web-side"
                      theme="light"
                      :width="240">
        <a-menu class="web-menu"
                mode="inline"
                theme="dark"
                v-model:openKeys="openKeys"
                :selected-keys="menuActive">
          <template v-for="route in filterRoutes">
            <template v-if="route.children && route.children.length">
              <app-sub-menu class="nav-item"
                            :menus="route"
                            :parent-path="route.path"
                            :key="route.path" />
            </template>
            <template v-else>
              <router-link :key="route.path"
                           :to="route.path"
                           custom
                           v-slot="{navigate}">
                <a-menu-item>
                  <p @click.stop="navigate">{{route.meta.title}}</p>
                </a-menu-item>
              </router-link>
            </template>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="web-container">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform"
                      mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";

import appHeader from "./components/AppHeader.vue";
import appSubMenu from "./components/AppSubMenu";

import useApp from "@/hooks/useApp";
import { pathResolve } from "@/helper/index";
import { formatNavRoutes } from "@/helper/permission";

import { RouteConfig } from "@/types/route";

const LayoutComponent = defineComponent({
  components: {
    appHeader,
    appSubMenu,
  },
  setup() {
    const { store, route, router } = useApp();

    const data = reactive({
      navRoutes: computed(() => store.getters.permissionRoutes),
      roles: computed(() => store.getters.userRoles),
      menuActive: computed(() => {
        const {
          meta: { activeMenu },
          path,
          name,
        } = route;
        if (activeMenu) return [activeMenu];
        return [path];
      }),
    });

    const filterRoutes = computed(() =>
      formatNavRoutes(data.navRoutes as RouteConfig[])
    );

    const formatRoutes = (path: string, base: string = "/") =>
      pathResolve(path, base);

    const formatIconPath = (icon: string) => {
      const icon_url = require("@/assets/" + icon);
      return icon_url;
    };

    const onCalcOpenKeys = () => {
      const routeArr = route.path.split("/");
      let openKeys: string[] = [];
      routeArr.forEach((r) => {
        routeArr.pop();
        let target = routeArr.join("/");
        openKeys.push(target);
      });
      return openKeys;
    };
    const openKeys = ref(onCalcOpenKeys());

    return {
      ...toRefs(data),
      openKeys,
      filterRoutes,
      formatRoutes,
    };
  },
});

export default LayoutComponent;
</script>
