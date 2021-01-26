import { ref, watch } from "vue";

const useProps = (state: Record<string, any>) => {
  let stateComponent = ref<Record<string, any>>({});
  let stateProps = ref<Record<string, any>>({});

  watch(
    () => state,
    (value) => {
      let stateCopy: Record<string, any> = { ...value };
      stateComponent.value = stateCopy?.components ?? {};
      delete stateCopy?.components;
      delete stateCopy?.show;
      stateProps.value = stateCopy;
    },
    { deep: true }
  );

  return { stateComponent, stateProps };
};

export default useProps;
