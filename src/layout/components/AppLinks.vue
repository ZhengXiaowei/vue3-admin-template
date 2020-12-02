<template>
  <div>
    <template v-if="is_href_link">
      <a :href="url"
         target="_blank"
         rel="noopener">
        <slot />
      </a>
    </template>
    <template v-else>
      <router-link class="menu-link"
                   :to="url">
        <slot />
      </router-link>
    </template>
  </div>
</template>

<script lang="ts">
import { validateURL } from "@/helper";
import { computed, defineComponent } from "vue";

const AppLink = defineComponent({
  props: {
    url: String,
  },
  setup(props) {
    const is_href_link = computed(() => validateURL(props.url ?? ""));

    return {
      is_href_link,
    };
  },
});

export default AppLink;
</script>