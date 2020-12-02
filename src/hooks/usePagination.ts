import { ref, watch, reactive } from "vue";
import { IMeta } from "@/types/api";

/**
 * 判断是否加载下一页的hooks
 * TODO 还需要根据具体情况做调整
 */
const usePagination = () => {
  let meta = reactive<IMeta>({
    current_page: 0,
    is_end: true,
    last_page: 0,
    next_page: 0,
    next_page_url: "",
    per_page: 10,
    prev_page_url: "",
    total: 0,
  });

  let loading = ref(false);
  let current = ref(1);
  let tablePageOptions = reactive({
    current: current.value,
    pageSize: meta.per_page,
    total: meta.total,
  });

  watch(
    () => meta.current_page,
    (current_page) => {
      console.log("change");
      loading.value = current_page < meta.last_page;
      current.value = current_page + 1;
    }
  );

  watch(
    () => meta.total,
    (total) => {
      if (!total) {
        loading.value = false;
        meta.last_page = 0;
        meta.current_page = 0;
        current.value = 1;
      }
    }
  );

  return { loading, meta, current, tablePageOptions };
};

export default usePagination;
