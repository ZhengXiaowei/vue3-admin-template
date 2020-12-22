<template>
  <div class="page-feature-drag">
    <h2>拖拽排序</h2>
    <drag-wrapper :source="list"
                  @after-drag="onDrag">
      <template #default="{ data }">
        <p class="drag-item">{{ data.label }}</p>
      </template>
    </drag-wrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DragWrapper from "@/components/drag-wrapper/index.vue";

const FeatureDrag = defineComponent({
  components: {
    DragWrapper,
  },
  setup() {
    let list = ref([
      {
        label: "列表1",
        value: 1,
      },
      {
        label: "列表2",
        value: 2,
      },
      {
        label: "列表3",
        value: 3,
      },
      {
        label: "列表4",
        value: 4,
      },
    ]);

    return { list };
  },
  methods: {
    onDrag(result: { label: string; value: number }[]) {
      this.list = result;
    },
  },
});

export default FeatureDrag;
</script>

<style lang="scss" scoped>
.page-feature-drag {
  .drag-item {
    cursor: pointer;
    border: 1px solid #333;
    background: #fff;
    border-radius: 4px;
    width: 180px;
    margin-bottom: 5px;
    text-align: center;
    padding: 5px 10px;
  }
}
</style>