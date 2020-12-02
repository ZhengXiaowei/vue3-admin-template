import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "ant-design-vue";

import { HTTP } from "@/helper/enum";
import { IResponse } from "@/types/api";

const instance: AxiosInstance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
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
    }
    return success ? Promise.resolve(result) : Promise.reject(result);
  },
  (error) => {
    if (error?.response?.status === HTTP.serverError)
      message.error("服务器开小差了，请稍后再试！");
    if (axios.isCancel(error)) return Promise.resolve(error.message);
    return Promise.reject(error);
  }
);

export default instance;
