import { nextTick, reactive } from "vue";
import useExpose from "./useExpose";

const usePopupState = () => {
  const state = reactive({
    visible: false,
  });

  const toggle = (show: boolean) => {
    state.visible = show;
  };

  const open = (props: Record<string, any>) => {
    Object.assign(state, props);

    nextTick(() => {
      toggle(true);
    });
  };

  const close = () => {
    toggle(false);
  };

  useExpose({ open, close, toggle });

  return {
    open,
    close,
    state,
    toggle,
  };
};

export default usePopupState;
