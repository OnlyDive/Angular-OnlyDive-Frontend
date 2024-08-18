export interface AuthResponse{
  jwtToken: string;
  refreshToken: string;
  user: string;
  expires: string;
}
