import { RouteRecordRaw } from "vue-router";

// 获取所有路由模块
const routes = require.context(".", false, /\.ts$/);

let configRoutes: RouteRecordRaw[] = [];

// 合并所有模块
routes.keys().forEach((key) => {
  // 过滤掉主入口文件
  if (key === "./index.ts") return;
  configRoutes = configRoutes.concat(routes(key).default);
});

export default configRoutes;
