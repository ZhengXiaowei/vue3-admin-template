const path = require("path");

/**
 * json字符串格式化
 */
String.prototype.parse = function<T>(this: string): T | null {
  let result: T | null = null;
  if (this) result = JSON.parse(this);
  return result;
};

/**
 * 事件监听
 * @param el 监听dom
 * @param cb 回调
 * @param type 监听事件 默认click
 */
export const listener = (
  el: HTMLElement | Element,
  cb: Function,
  type: string = "click"
) => {
  el.addEventListener(type, (e) => cb(e), false);
};

/**
 * 移除监听事件
 * @param el
 * @param cb
 * @param type
 */
export const removeListener = (
  el: HTMLElement | Element,
  cb: Function,
  type: string = "click"
) => {
  el.removeEventListener(type, () => cb(), false);
};

/**
 * 判断url
 * @param url
 */
export const validateURL = (url: string) => {
  return /^(https?:|mailto:|tel:)/.test(url);
};

/**
 * url处理
 * @param paths
 * @param base
 */
export const pathResolve = (paths: string, base: string = "/") => {
  if (validateURL(paths)) return paths;
  if (validateURL(base)) return base;
  return path.resolve(base, paths);
};
