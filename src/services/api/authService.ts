import { apiClient, ApiResponse } from './client';
import { storeToken, removeToken, getStoredToken } from './config';
import { LoginDto, LoginResponse, RegisterDto } from '@/types/api';

class AuthService {
  async login(credentials: LoginDto): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
    
    if (response.data?.token) {
      storeToken(response.data.token);
    }
    
    return response;
  }

  async createAdmin(data: RegisterDto): Promise<ApiResponse<unknown>> {
    return apiClient.post('/api/auth/create-admin', data);
  }

  logout(): void {
    removeToken();
  }

  isAuthenticated(): boolean {
    return !!getStoredToken();
  }

  getToken(): string | null {
    return getStoredToken();
  }
}

export const authService = new AuthService();
