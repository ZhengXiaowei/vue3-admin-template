<template>
  <div class="channel-operator">
    <SearchOutlined />
    <a-select class="channel-filter"
              show-search
              :value="channel"
              @change="onChannelChange">
      <a-select-option value="jack">
        Jack
      </a-select-option>
      <a-select-option value="lucy">
        Lucy
      </a-select-option>
      <a-select-option value="tom">
        Tom
      </a-select-option>
    </a-select>
    <a-popconfirm placement="bottomLeft"
                  @confirm="onConfirmCreate">
      <template v-slot:title>
        <span>确定创建<i class="theme">新站点</i>吗？</span>
      </template>
      <a-button type="primary"
                shape="circle">
        <template v-slot:icon>
          <PlusOutlined />
        </template>
      </a-button>
    </a-popconfirm>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

import { SearchOutlined, PlusOutlined } from "@ant-design/icons-vue";

const AppHeaderChannel = defineComponent({
  components: {
    SearchOutlined,
    PlusOutlined,
  },
  props: {
    channel: String,
  },
  setup(props, { emit }) {
    const onConfirmCreate = () => {
      console.log("确认创建新站点");
    };

    const onChannelChange = (value: string) => {
      console.log(value);
      emit("update:channel", value);
    };

    return {
      onConfirmCreate,
      onChannelChange,
    };
  },
});

export default AppHeaderChannel;
</script>