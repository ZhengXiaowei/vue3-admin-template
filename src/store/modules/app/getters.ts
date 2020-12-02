import { GetterTree } from "vuex";
import { RootState } from "@/store";
import { Getters, State } from "./_type";

const getters: GetterTree<State, RootState> & Getters = {
  permissionRoutes: (state) => state.routes,
  userRoles: (state) => state.roles,
  user: (state) => state.user,
  pageTitle: (state) => state.pageTitle,
};

export default getters;
