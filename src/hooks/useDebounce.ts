import { Ref, ref, watch } from "vue";
import useDebounceFn from "./useDebounceFn";

const useDebounce = <T>(value: Ref<T>, ms = 200) => {
  if (ms <= 0) return value;

  const debounce = ref(value.value as T) as Ref<T>;

  const updater = useDebounceFn(() => (debounce.value = value.value), ms);

  watch(value, () => updater());

  return debounce;
};

export default useDebounce;
