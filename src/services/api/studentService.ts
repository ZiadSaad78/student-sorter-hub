import { apiClient, ApiResponse } from './client';
import { 
  StudentDto, 
  StudentProfileDetailsDto,
  StudentAssignmentDto,
  AcademicEducationDto, 
  SecondaryEducationDto,
  FamilyContactDto
} from '@/types/api';

class StudentService {
  // Student CRUD
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

  // Student Profile endpoints
  async getMyDetails(): Promise<ApiResponse<StudentProfileDetailsDto>> {
    return apiClient.get<StudentProfileDetailsDto>('/api/student/profile/details');
  }

  async getMyAssignments(): Promise<ApiResponse<StudentAssignmentDto[]>> {
    return apiClient.get<StudentAssignmentDto[]>('/api/student/profile/assignments');
  }

  // Academic Education
  async getAllAcademicEducation(): Promise<ApiResponse<AcademicEducationDto[]>> {
    return apiClient.get<AcademicEducationDto[]>('/api/AcademicEducation');
  }

  async getAcademicEducation(studentId: number): Promise<ApiResponse<AcademicEducationDto>> {
    return apiClient.get<AcademicEducationDto>(`/api/AcademicEducation/${studentId}`);
  }

  async createAcademicEducation(data: AcademicEducationDto): Promise<ApiResponse<AcademicEducationDto>> {
    return apiClient.post<AcademicEducationDto>('/api/AcademicEducation', data);
  }

  async updateAcademicEducation(studentId: number, data: AcademicEducationDto): Promise<ApiResponse<AcademicEducationDto>> {
    return apiClient.put<AcademicEducationDto>(`/api/AcademicEducation/${studentId}`, data);
  }

  // Secondary Education
  async getAllSecondaryEducation(): Promise<ApiResponse<SecondaryEducationDto[]>> {
    return apiClient.get<SecondaryEducationDto[]>('/api/SecondaryEducation');
  }

  async getSecondaryEducation(studentId: number): Promise<ApiResponse<SecondaryEducationDto>> {
    return apiClient.get<SecondaryEducationDto>(`/api/SecondaryEducation/${studentId}`);
  }

  async createSecondaryEducation(data: SecondaryEducationDto): Promise<ApiResponse<SecondaryEducationDto>> {
    return apiClient.post<SecondaryEducationDto>('/api/SecondaryEducation', data);
  }

  async updateSecondaryEducation(studentId: number, data: SecondaryEducationDto): Promise<ApiResponse<SecondaryEducationDto>> {
    return apiClient.put<SecondaryEducationDto>(`/api/SecondaryEducation/${studentId}`, data);
  }

  async deleteSecondaryEducation(studentId: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/SecondaryEducation/${studentId}`);
  }

  // Family Contact
  async getAllFamilyContacts(): Promise<ApiResponse<FamilyContactDto[]>> {
    return apiClient.get<FamilyContactDto[]>('/api/FamilyContact');
  }

  async getFamilyContact(id: number): Promise<ApiResponse<FamilyContactDto>> {
    return apiClient.get<FamilyContactDto>(`/api/FamilyContact/${id}`);
  }

  async createFamilyContact(data: FamilyContactDto): Promise<ApiResponse<FamilyContactDto>> {
    return apiClient.post<FamilyContactDto>('/api/FamilyContact', data);
  }

  async updateFamilyContact(id: number, data: FamilyContactDto): Promise<ApiResponse<FamilyContactDto>> {
    return apiClient.put<FamilyContactDto>(`/api/FamilyContact/${id}`, data);
  }

  async deleteFamilyContact(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/FamilyContact/${id}`);
  }
}

export const studentService = new StudentService();
