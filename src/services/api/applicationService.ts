import { apiClient, ApiResponse } from './client';
import { 
  ApplicationDetailsDto, 
  ApplicationStatusDto, 
  ApplicationWindowDto,
  FullFormDto,
  FeesDto,
  NotificationDto
} from '@/types/api';

class ApplicationService {
  // Admin Applications
  async getAllApplications(): Promise<ApiResponse<ApplicationDetailsDto[]>> {
    return apiClient.get<ApplicationDetailsDto[]>('/api/admin/applications');
  }

  async getApplicationDetails(applicationId: number): Promise<ApiResponse<ApplicationDetailsDto>> {
    return apiClient.get<ApplicationDetailsDto>(`/api/admin/applications/${applicationId}/details`);
  }

  async acceptApplication(applicationId: number): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/admin/applications/${applicationId}/accept`);
  }

  async rejectApplication(applicationId: number): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/admin/applications/${applicationId}/reject`);
  }

  async setApplicationFees(applicationId: number, feeData: FeesDto): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/admin/applications/${applicationId}/fees`, feeData);
  }

  async sendApplicationNotification(applicationId: number, notification: NotificationDto): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/admin/applications/${applicationId}/notifications`, notification);
  }

  // Application Statuses
  async getStatuses(): Promise<ApiResponse<ApplicationStatusDto[]>> {
    return apiClient.get<ApplicationStatusDto[]>('/api/admin/application-statuses');
  }

  async getStatusById(id: number): Promise<ApiResponse<ApplicationStatusDto>> {
    return apiClient.get<ApplicationStatusDto>(`/api/admin/application-statuses/${id}`);
  }

  async createStatus(status: Partial<ApplicationStatusDto>): Promise<ApiResponse<ApplicationStatusDto>> {
    return apiClient.post<ApplicationStatusDto>('/api/admin/application-statuses', status);
  }

  async updateStatus(id: number, status: Partial<ApplicationStatusDto>): Promise<ApiResponse<ApplicationStatusDto>> {
    return apiClient.put<ApplicationStatusDto>(`/api/admin/application-statuses/${id}`, status);
  }

  async deleteStatus(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/admin/application-statuses/${id}`);
  }

  // Application Windows
  async getWindows(): Promise<ApiResponse<ApplicationWindowDto[]>> {
    return apiClient.get<ApplicationWindowDto[]>('/api/admin/application-windows');
  }

  async getWindowById(id: number): Promise<ApiResponse<ApplicationWindowDto>> {
    return apiClient.get<ApplicationWindowDto>(`/api/admin/application-windows/${id}`);
  }

  async getActiveWindow(): Promise<ApiResponse<ApplicationWindowDto>> {
    return apiClient.get<ApplicationWindowDto>('/api/admin/application-windows/active');
  }

  async createWindow(window: Partial<ApplicationWindowDto>): Promise<ApiResponse<ApplicationWindowDto>> {
    return apiClient.post<ApplicationWindowDto>('/api/admin/application-windows', window);
  }

  async updateWindow(id: number, window: Partial<ApplicationWindowDto>): Promise<ApiResponse<ApplicationWindowDto>> {
    return apiClient.put<ApplicationWindowDto>(`/api/admin/application-windows/${id}`, window);
  }

  async deleteWindow(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/admin/application-windows/${id}`);
  }

  // Student Applications
  async submitApplication(formData: FullFormDto): Promise<ApiResponse<unknown>> {
    return apiClient.post('/api/student/applications/submit', formData);
  }

  async getMyApplications(): Promise<ApiResponse<ApplicationDetailsDto[]>> {
    return apiClient.get<ApplicationDetailsDto[]>('/api/student/applications/my-applications');
  }
}

export const applicationService = new ApplicationService();
