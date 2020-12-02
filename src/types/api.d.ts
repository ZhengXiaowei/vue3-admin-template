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
