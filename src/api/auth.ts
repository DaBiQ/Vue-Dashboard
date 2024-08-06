import { request } from '@/utils/service/';
import type { AxiosResponse } from 'axios';

interface AuthResponse {
  data: {
    authorization: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  };
}

function handleError(error: any): never {
  console.error('API call error:', error);
  if (error.response) {
    window.$message.error(error.response.data.message || 'An error occurred');
  } else {
    window.$message.error(error.message || 'An error occurred');
  }
  throw error; // rethrow to ensure the error is not swallowed
}

export default {
  login: (data: { username: string; password: string }): Promise<AxiosResponse<AuthResponse>> => 
    request.post('/Account/Login', data) as Promise<AxiosResponse<AuthResponse>>,
  logout: (): Promise<AxiosResponse<void>> => 
    request.get('/Account/Logout') as Promise<AxiosResponse<void>>,
  refreshToken: (refreshToken: string): Promise<AxiosResponse<AuthResponse>> => 
    request.get('/Account/RefreshState', { params: { refreshToken } }) as Promise<AxiosResponse<AuthResponse>>,
};