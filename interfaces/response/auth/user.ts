export interface IAuthReponseSignIn {
  token: string;
  userInfo: IUserInfo;
}

export interface IUserInfo {
  userId: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  point: number;
  gender: number;
  birthDay: string;
}

export interface IAuthRequestSignIn {
  username: string;
  regionCode: string;
  password?: string;
}
