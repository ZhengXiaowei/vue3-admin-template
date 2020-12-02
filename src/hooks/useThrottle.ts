import { Ref, ref, watch } from "vue";
import useThrottleFn from "./useThrottleFn";

const useThrottle = <T>(value: Ref<T>, delay = 200) => {
  if (delay <= 0) return value;

  const throttle: Ref<T> = ref(value.value as T) as Ref<T>;

  const updater = useThrottleFn(() => {
    throttle.value = value.value;
  }, delay);

  watch(value, () => updater());

  return throttle;
};

export default useThrottle;
