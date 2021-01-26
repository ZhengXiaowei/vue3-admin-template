import { getCurrentInstance } from "vue";

const useExpose = (apis: Record<string, any>) => {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy, apis);
  }
};

export default useExpose;
