import { createFilterWrapper, debounceFilter } from "./utils";
import { FunctionArgs } from "@/types/hooks";

const useDebounceFn = <T extends FunctionArgs>(fn: T, ms = 200): T => {
  return createFilterWrapper(debounceFilter(ms), fn);
};

export default useDebounceFn;
