import { ModalFuncProps } from "ant-design-vue/lib/modal/Modal";

export interface IResponse<T> extends Promise<T> {
  code: number;
  data?: T;
  msg: string;
}

export interface IUser {
  uid: number | string;
  nickname: string;
  token: string;
}

export interface IBaseProps {
  components?: ModalFuncProps;
  [key: string]: any;
}
