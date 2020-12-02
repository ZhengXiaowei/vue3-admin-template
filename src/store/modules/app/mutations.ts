import { MutationTree } from "vuex";
import { State, Mutations, MutationType } from "./_type";

const mutations: MutationTree<State> & Mutations = {
  [MutationType.setRoles](state, roles) {
    state.roles = roles;
  },
  [MutationType.setRoutes](state, routes) {
    state.routes = routes;
  },
  [MutationType.setUser](state, user) {
    state.user = user;
    state.store.setItem("user", JSON.stringify(user));
  },
};

export default mutations;
