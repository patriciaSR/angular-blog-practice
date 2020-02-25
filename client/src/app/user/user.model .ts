export interface User {
  message: string;
  token: string;
  userData: UserData;
}

export interface UserData {
  _id: string;
  firstname: string;
  lastname?: string;
  username: string;
  email: string;
  image?: string;
  role: string;
}
