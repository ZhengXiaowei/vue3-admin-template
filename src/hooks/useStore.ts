import store, { Store } from "@/store";

const useStore = (): Store => {
  return store as Store;
};

export default useStore;
