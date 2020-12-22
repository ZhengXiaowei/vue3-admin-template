import { App } from "vue";
import store from "@/store";

/**
 * 创建一些全局数据
 * @param app
 */
const createGlobalData = async (app: App<Element>) => {
  try {
  } catch (error) {
    console.log("global data error", error);
  }
};

export default createGlobalData;
