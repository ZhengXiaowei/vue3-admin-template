import { defineComponent } from "vue";
import { Modal } from "ant-design-vue";

import usePopupState from "@/hooks/component/usePopupState";
import useProps from "@/hooks/component/useProps";

const defineInstance = defineComponent({
  setup(props, { slots }) {
    const { state, toggle } = usePopupState();
    const { stateComponent, stateProps } = useProps(state);

    return () => (
      <Modal
        {...{
          ...{ visible: state.visible, ...stateComponent.value },
          "onUpdate:visible": toggle,
        }}
      >
        {slots.default?.(stateProps.value) ?? null}
      </Modal>
    );
  },
});

export default defineInstance;
