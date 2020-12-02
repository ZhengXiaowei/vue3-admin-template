import { Module } from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

import type { State } from "./_type";
import type { Store } from "./_module";

import { RootState } from "@/store";

const appModule: Module<State, RootState> = {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export { State, Store };

export default appModule;
