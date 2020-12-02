import { RouteConfig } from "@/types/route";

export const Home: RouteConfig = {
  name: "Home",
  path: "/home",
  meta: {
    title: "Home",
  },
  component: () => import("@/views/Home.vue"),
};

export const About: RouteConfig = {
  name: "About",
  path: "/about",
  meta: {
    title: "About",
  },
  component: () => import("@/views/About.vue"),
};

const asyncRoutes: RouteConfig[] = [Home, About];

export default asyncRoutes;
