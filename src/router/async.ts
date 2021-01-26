import { RouteConfig } from "@/types/route";
import {
  FeatureCopy,
  FeatureDrag,
  FeatureQrCode,
  FeatureVerify,
  Functional,
} from "./children";

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

export const Feature: RouteConfig = {
  name: "Feature",
  path: "/feature",
  meta: {
    title: "Feature",
  },
  children: [
    FeatureCopy,
    FeatureQrCode,
    FeatureDrag,
    FeatureVerify,
    Functional,
  ],
  component: () => import("@/views/feature/index.vue"),
};

const asyncRoutes: RouteConfig[] = [Home, Feature, About];

export default asyncRoutes;
