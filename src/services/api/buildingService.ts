import { apiClient, ApiResponse } from './client';
import { BuildingDto, BuildingCreateDto } from '@/types/api';

class BuildingService {
  async getAll(): Promise<ApiResponse<BuildingDto[]>> {
    return apiClient.get<BuildingDto[]>('/api/Building');
  }

  async getById(id: number): Promise<ApiResponse<BuildingDto>> {
    return apiClient.get<BuildingDto>(`/api/Building/${id}`);
  }

  async create(building: BuildingCreateDto): Promise<ApiResponse<BuildingDto>> {
    return apiClient.post<BuildingDto>('/api/Building', building);
  }

  async update(id: number, building: Partial<BuildingDto>): Promise<ApiResponse<BuildingDto>> {
    return apiClient.put<BuildingDto>(`/api/Building/${id}`, building);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/Building/${id}`);
  }
}

export const buildingService = new BuildingService();
