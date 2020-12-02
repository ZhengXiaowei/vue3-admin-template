<template>
  <a-sub-menu class="nav-item"
              :key="menus.path"
              :title="menus.meta.title">
    <template v-for="child in menus.children">
      <template v-if="child.children">
        <app-sub-menu :menus="child"
                      :parent-path="formatRoutes(child.path, parentPath)"
                      :key="formatRoutes(child.path, parentPath)" />
      </template>
      <template v-else>
        <router-link :key="formatRoutes(child.path, parentPath)"
                     :to="formatRoutes(child.path, parentPath)"
                     custom
                     v-slot={navigate}>
          <a-menu-item>
            <p @click.stop="navigate">{{child.meta.title}}</p>
          </a-menu-item>
        </router-link>
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { pathResolve } from "@/helper";

const AppSubMenu = defineComponent({
  name: "AppSubMenu",
  props: {
    menus: {
      type: Object,
      default: () => [],
    },
    parentPath: String,
  },
  setup(props) {
    const formatRoutes = (path: string, base: string = "/") =>
      pathResolve(path, base);

    return {
      formatRoutes,
    };
  },
});

export default AppSubMenu;
</script>