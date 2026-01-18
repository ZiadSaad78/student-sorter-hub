import { apiClient, ApiResponse } from './client';
import { RoomDto, RoomCreateDto, RoomAssignmentDto } from '@/types/api';

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

  async update(id: number, room: RoomCreateDto): Promise<ApiResponse<RoomDto>> {
    return apiClient.put<RoomDto>(`/api/Room/${id}`, room);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/Room/${id}`);
  }

  async assignStudent(assignment: RoomAssignmentDto): Promise<ApiResponse<unknown>> {
    return apiClient.post('/api/RoomAssignment/assign', assignment);
  }

  async removeAssignment(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/RoomAssignment/${id}`);
  }
}

export const roomService = new RoomService();
