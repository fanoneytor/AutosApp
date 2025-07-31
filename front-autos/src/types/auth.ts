export interface LoginResponse {
  token: string;
  role: Role;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
