
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  bearerToken?: string;
  expiresIn?: string;
  BearerToken?: string;
  ExpiresIn?: string;
}