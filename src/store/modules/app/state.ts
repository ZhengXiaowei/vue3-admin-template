import { State } from "./_type";
import { IUser } from "@/types/api";

/**
 * TODO: 待优化
 * json字符串格式化
 */
String.prototype.parse = function<T>(this: string): T | null {
  let result: T | null = null;
  if (this) result = JSON.parse(this);
  return result;
};

const store = localStorage;

const state: State = {
  store: store,
  pageTitle: "Vue3管理模板",
  roles: [],
  routes: [],
  addRoutes: [],
  user: store.getItem("user")?.parse<IUser>() ?? {},
};

export default state;
