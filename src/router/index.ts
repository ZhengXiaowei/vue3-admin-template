import { createRouter, createWebHistory } from "vue-router";
import constantRoutes from "./modules/constant";

const routes = constantRoutes;

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes,
});

export default router;
