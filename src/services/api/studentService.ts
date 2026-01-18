import { apiClient, ApiResponse } from './client';
import { StudentDto } from '@/types/api';

class StudentService {
  async getAll(): Promise<ApiResponse<StudentDto[]>> {
    return apiClient.get<StudentDto[]>('/api/Student');
  }

  async getById(id: number): Promise<ApiResponse<StudentDto>> {
    return apiClient.get<StudentDto>(`/api/Student/${id}`);
  }

  async create(student: Partial<StudentDto>): Promise<ApiResponse<StudentDto>> {
    return apiClient.post<StudentDto>('/api/Student', student);
  }

  async update(id: number, student: Partial<StudentDto>): Promise<ApiResponse<StudentDto>> {
    return apiClient.put<StudentDto>(`/api/Student/${id}`, student);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/Student/${id}`);
  }

  async selfUpdate(student: Partial<StudentDto>): Promise<ApiResponse<StudentDto>> {
    return apiClient.put<StudentDto>('/api/Student/self-update', student);
  }
}

export const studentService = new StudentService();
