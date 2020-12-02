import { AugmentedActionContext } from "./_module";
import { RouteConfig } from "@/types/route";
import { RouteRecordRaw } from "vue-router";
import { IUser } from "@/types/api";

type State = {
  store: Storage;
  pageTitle: string;
  roles: string[];
  routes: RouteConfig[];
  addRoutes: RouteConfig[];
  user: Partial<IUser>;
};

// mutation 定义
enum MutationType {
  setRoles = "setRoles",
  setRoutes = "setRoutes",
  setUser = "setUser",
}

type Mutations<S = State> = {
  [MutationType.setRoles](state: S, roles: string[]): void;
  [MutationType.setRoutes](state: S, routes: RouteConfig[]): void;
  [MutationType.setUser](state: S, user: Partial<IUser>): void;
};

// action 定义
enum ActionType {
  generatorRoutes = "generatorRoutes",
  getUserRoles = "getUserRoles",
}

type Actions = {
  [ActionType.generatorRoutes](
    { commit }: AugmentedActionContext,
    roles: string[]
  ): Promise<RouteConfig[]>;
  [ActionType.getUserRoles]({
    commit,
  }: AugmentedActionContext): Promise<string[]>;
};

type Getters = {
  permissionRoutes(state: State): RouteRecordRaw[];
  userRoles(state: State): string[];
  user(state: State): Partial<IUser>;
  pageTitle(state: State): string;
};

export { State, Mutations, MutationType, Actions, ActionType, Getters };
