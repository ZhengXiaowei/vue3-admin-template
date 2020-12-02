import { RouteConfig } from "@/types/route";

export const Login: RouteConfig = {
  name: "Login",
  path: "/login",
  hidden: true,
  meta: {
    title: "登录",
  },
  component: () => import("@/views/Login.vue"),
};

export const NotFound: RouteConfig = {
  name: "NotFound",
  path: "/:pathMatch(.*)*",
  hidden: true,
  component: () => import("@/views/404.vue"),
};

const constantRoutes: RouteConfig[] = [Login];

export default constantRoutes;
