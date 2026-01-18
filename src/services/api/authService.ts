import { apiClient, ApiResponse } from './client';
import { storeToken, removeToken, getStoredToken } from './config';
import { LoginDto, LoginResponse, RegisterDto } from '@/types/api';

class AuthService {
  // Admin login
  async login(credentials: LoginDto): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
    
    if (response.data?.token) {
      storeToken(response.data.token);
    }
    
    return response;
  }

  // Create admin user
  async createAdmin(data: RegisterDto): Promise<ApiResponse<unknown>> {
    return apiClient.post('/api/auth/create-admin', data);
  }

  // Student registration
  async studentRegister(data: RegisterDto): Promise<ApiResponse<unknown>> {
    return apiClient.post('/api/student/auth/register', data);
  }

  // Student login
  async studentLogin(credentials: LoginDto): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<LoginResponse>('/api/student/auth/login', credentials);
    
    if (response.data?.token) {
      storeToken(response.data.token);
    }
    
    return response;
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
