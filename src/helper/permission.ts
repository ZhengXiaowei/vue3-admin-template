const path = require("path");
import { RouteConfig } from "@/types/route";

/**
 * 通过用户角色过滤有效路由
 * @param routes
 * @param roles
 */
export const filterRoutesByRoles = (
  routes: Array<RouteConfig>,
  roles: Array<string>
): Array<RouteConfig> => {
  const result: Array<RouteConfig> = [];
  routes.forEach((route) => {
    const temp = { ...route };
    if (checkRoutePermission(roles, temp)) {
      if (temp.children) {
        temp.children = filterRoutesByRoles(temp.children, roles);
        temp.redirect = path.resolve(temp.path, temp.children[0].path);
      }
      result.push(temp);
    }
  });

  return result;
};

/**
 * 判断目标路由是否符合当前用户权限
 * @param roles
 * @param route
 */
export const checkRoutePermission = (
  roles: Array<string>,
  route: RouteConfig
): boolean => {
  if (route.meta?.roles)
    return roles.some((role) => route.meta?.roles?.includes(role));
  return true;
};

/**
 * 格式化菜单路由
 * @param routes
 */
export const formatNavRoutes = (routes: RouteConfig[]) => {
  const validRoutes = routes.filter((route) => !route.hidden);
  const resultRoutes: RouteConfig[] = [];
  validRoutes.forEach((route) => {
    let tempRoute = { ...route };
    if (tempRoute.children) {
      if (tempRoute.children.length === 1) {
        // 如果路由长度只有1 则提取出来当根路由
        const children = tempRoute.children[0];
        tempRoute = {
          ...route,
          meta: children.meta,
          path: path.resolve(tempRoute.path, children.path),
        };
        delete tempRoute.children;
      } else tempRoute.children = formatNavRoutes(tempRoute.children);
    }
    resultRoutes.push(tempRoute);
  });
  return resultRoutes;
};
