import { apiClient, ApiResponse } from './client';
import { RoomDto, RoomCreateDto } from '@/types/api';

class RoomService {
  async getAll(): Promise<ApiResponse<RoomDto[]>> {
    return apiClient.get<RoomDto[]>('/api/Room');
  }

  async getById(id: number): Promise<ApiResponse<RoomDto>> {
    return apiClient.get<RoomDto>(`/api/Room/${id}`);
  }

  async create(room: RoomCreateDto): Promise<ApiResponse<RoomDto>> {
    return apiClient.post<RoomDto>('/api/Room', room);
  }

  async update(id: number, room: Partial<RoomDto>): Promise<ApiResponse<RoomDto>> {
    return apiClient.put<RoomDto>(`/api/Room/${id}`, room);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/Room/${id}`);
  }

  // Room assignment - uses query params not body
  async assignStudent(studentId: number, roomId: number): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/RoomAssignment/assign?studentId=${studentId}&roomId=${roomId}`);
  }

  async removeAssignment(assignmentId: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/RoomAssignment/${assignmentId}`);
  }
}

export const roomService = new RoomService();
