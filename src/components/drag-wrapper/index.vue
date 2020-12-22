<template>
  <Container @drop="onDrop">
    <Draggable v-for="(item, i) in source"
               :key="i">
      <slot :data="item" />
    </Draggable>
  </Container>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

import { Container, Draggable, DropResult } from "@/plugins/smooth-dnd";

const DragWrapper = defineComponent({
  components: {
    Container,
    Draggable,
  },
  props: {
    source: {
      type: Object as PropType<any[]>,
      default: {},
    },
  },
  setup(props) {},
  methods: {
    onDrop(dropResult: DropResult) {
      const result = this.doDropDataAction(this.source, dropResult);
      this.$emit("after-drag", result);
    },
    doDropDataAction(list: any[], dropResult: DropResult) {
      const { removedIndex, addedIndex, payload } = dropResult;
      if (removedIndex === null && addedIndex === null) return list;

      const result = [...list];
      let itemToAdd = payload;

      if (removedIndex !== null) itemToAdd = result.splice(removedIndex, 1)[0];

      if (addedIndex !== null) result.splice(addedIndex, 0, itemToAdd);

      return result;
    },
  },
});

export default DragWrapper;
</script>