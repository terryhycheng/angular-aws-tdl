export interface AuthData {
  username: String;
  password: String;
  email?: String;
}

export type ReturnToken = { id: number; username: string; iat: number };
