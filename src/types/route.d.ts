import { RouteRecordRaw } from "vue-router";

type RouteMeta = {
  title: string;
  icon: string;
  roles: string[];
  activeMenu: string;
};

export type RouteConfig = RouteRecordRaw & {
  hidden?: boolean;
  children?: RouteConfig[];
  meta?: Partial<RouteMeta>;
};
