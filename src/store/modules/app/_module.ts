import {
  ActionContext,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { State, Actions, Getters, Mutations } from "./_type";
import { RootState } from "@/store";

export type AugmentedActionContext = {
  commit<M extends keyof Mutations>(
    key: M,
    payload: Parameters<Mutations[M]>[1]
  ): ReturnType<Mutations[M]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export type Store<S = State> = Omit<
  VuexStore<S>,
  "commit" | "dispatch" | "getters"
> & {
  commit<M extends keyof Mutations, P extends Parameters<Mutations[M]>[1]>(
    key: M,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[M]>;
} & {
  dispatch<A extends keyof Actions>(
    key: A,
    payload: Parameters<Actions[A]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[A]>;
} & {
  getters: {
    [G in keyof Getters]: ReturnType<Getters[G]>;
  };
};
