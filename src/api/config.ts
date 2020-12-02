import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "ant-design-vue";
import store from "@/store";
import router from "@/router";

import { HTTP } from "@/helper/enum";
import { IResponse } from "@/types/api";

const instance: AxiosInstance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    let user = store.state.app.user;
    if (user.token) config.headers["x-token"] = user.token;
    return config;
  }
);

instance.interceptors.response.use(
  (
    res: AxiosResponse<IResponse<any>>
  ): Promise<AxiosResponse<IResponse<any>>> => {
    let result = res.data;
    let success = false;
    switch (result.code) {
      case HTTP.success:
        success = true;
        break;
      case HTTP.loginExpire:
        router.replace("/login");
        break;
    }
    return success
      ? Promise.resolve(result)
      : (message.error(result.msg), Promise.reject(result));
  },
  (error) => {
    if (error?.response?.status === HTTP.serverError)
      message.error("服务器开小差了，请稍后再试！");
    if (axios.isCancel(error)) return Promise.resolve(error.message);
    return Promise.reject(error);
  }
);

export default instance;
