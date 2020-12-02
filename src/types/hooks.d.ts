export type Fn2 = () => void;

export type FunctionArgs<Args extends any[] = any[], Return = void> = (
  ...args: Args
) => Return;

export type EventFilter<Args extends any[] = any[], This = any> = (
  invoke: Fn2,
  options: FunctionWrapperOptions<Args, This>
) => void;

export interface FunctionWrapperOptions<
  Args extends any[] = any[],
  This = any
> {
  fn: FunctionArgs<Args, This>;
  args: Args;
  thisArgs: This;
}
