export interface IRegister {
  password: string
  email: string;
  username: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IJWTPayload {
  id: number;
}