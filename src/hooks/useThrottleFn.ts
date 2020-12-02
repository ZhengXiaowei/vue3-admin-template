import { FunctionArgs } from "@/types/hooks";
import { createFilterWrapper, throttleFilter } from "./utils";

const useThrottleFn = <T extends FunctionArgs>(
  fn: T,
  ms = 200,
  trailing = true
): T => {
  return createFilterWrapper(throttleFilter(ms, trailing), fn);
};

export default useThrottleFn;
