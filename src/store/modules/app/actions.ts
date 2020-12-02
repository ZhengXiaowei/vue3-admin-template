import { ActionTree } from "vuex";
import { RootState } from "@/store";
import { Actions, ActionType, MutationType, State } from "./_type";
import { filterRoutesByRoles } from "@/helper/permission";
import asyncRoutes from "@/router/async";

const actions: ActionTree<State, RootState> & Actions = {
  [ActionType.generatorRoutes]({ commit }, roles) {
    return new Promise(async (resolve) => {
      let resultRoutes = filterRoutesByRoles(asyncRoutes, roles) || [];
      await commit(MutationType.setRoutes, resultRoutes);
      resolve(resultRoutes);
    });
  },
  [ActionType.getUserRoles]({ commit }) {
    return new Promise(async (resolve) => {
      const roles = ["admin"];
      await commit(MutationType.setRoles, roles);
      resolve(roles);
    });
  },
};

export default actions;
