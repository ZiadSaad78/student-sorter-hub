import { apiClient, ApiResponse } from './client';

class UserService {
  async delete(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/users/${id}`);
  }
}

export const userService = new UserService();
