import { EventFilter, FunctionArgs } from "@/types/hooks";

export function createFilterWrapper<T extends FunctionArgs>(
  filter: EventFilter,
  fn: T
) {
  function wrapper(this: any, ...args: any[]) {
    filter(() => fn.apply(this, args), { fn, args, thisArgs: this });
  }

  return (wrapper as any) as T;
}

const bypassFilter: EventFilter = (invoke) => invoke();

export const throttleFilter = (ms: number, trailing = true) => {
  if (ms <= 0) return bypassFilter;

  let lastExecute = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const filter: EventFilter = (invoke) => {
    const elapsed = Date.now() - lastExecute;

    clear();

    if (elapsed > ms) {
      lastExecute = Date.now();
      invoke();
    } else if (trailing) {
      timer = setTimeout(() => {
        clear();
        invoke();
      }, ms);
    }
  };

  return filter;
};

export const debounceFilter = (ms: number) => {
  if (ms <= 0) return bypassFilter;

  let timer: ReturnType<typeof setTimeout> | undefined;

  const filter: EventFilter = (invoke) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(invoke, ms);
  };

  return filter;
};
