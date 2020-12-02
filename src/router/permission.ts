import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

import router from "./index";
import store from "@/store";

import Layout from "@/layout/index.vue";

import { ActionType } from "@/store/modules/app/_type";
import { NotFound } from "./modules/constant";
import { RouteConfig } from "@/types/route";

const WHITE_URL_LIST: string[] = ["/login"];

/**
 * 未登录的情况下 路由的处理
 * @param to
 * @param next
 */
const redirectRoutes = (
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (!!~WHITE_URL_LIST.indexOf(to.path)) next();
  else
    next({
      path: "/login",
      query: {
        redirect: encodeURIComponent(to.path),
      },
    });
};

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const user = store.state.app.user;
    if (user.token) {
      if (to.path === "/login") next({ path: "/", replace: true });
      else {
        const roles = store.state.app.roles;
        if (roles.length) next();
        else {
          const userRoles: string[] = await store.dispatch(
            ActionType.getUserRoles
          );
          const webRoutes: RouteConfig[] = await store.dispatch(
            ActionType.generatorRoutes,
            userRoles
          );
          const AppRoute: RouteConfig = {
            name: "home",
            path: "",
            redirect: webRoutes[0].path,
            component: Layout,
            children: webRoutes,
          };
          console.log(AppRoute);
          router.addRoute(AppRoute);
          // 添加全局Not Found Page
          router.addRoute(NotFound);
          next({ ...to, replace: true, name: to.name! });
        }
      }
    } else redirectRoutes(to, next);
  }
);

router.afterEach(() => {
  // NProgress.done();
});
