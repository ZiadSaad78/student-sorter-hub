import { apiClient, ApiResponse } from './client';
import { ComplaintDto, SubmitComplaintDto, ResolveComplaintDto } from '@/types/api';

class ComplaintsService {
  // Admin Complaints
  async getUnresolved(): Promise<ApiResponse<ComplaintDto[]>> {
    return apiClient.get<ComplaintDto[]>('/api/admin/complaints/unresolved');
  }

  async resolve(complaintId: number, resolution: ResolveComplaintDto): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/admin/complaints/resolve/${complaintId}`, resolution);
  }

  // Student Complaints
  async submit(complaint: SubmitComplaintDto): Promise<ApiResponse<unknown>> {
    return apiClient.post('/api/student/complaints/submit', complaint);
  }
}

export const complaintsService = new ComplaintsService();
