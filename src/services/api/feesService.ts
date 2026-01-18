import { apiClient, ApiResponse } from './client';
import { FeesDto } from '@/types/api';

class FeesService {
  // General Fees
  async getAll(): Promise<ApiResponse<FeesDto[]>> {
    return apiClient.get<FeesDto[]>('/api/Fees');
  }

  async getById(id: number): Promise<ApiResponse<FeesDto>> {
    return apiClient.get<FeesDto>(`/api/Fees/${id}`);
  }

  async create(fee: Partial<FeesDto>): Promise<ApiResponse<FeesDto>> {
    return apiClient.post<FeesDto>('/api/Fees', fee);
  }

  async update(id: number, fee: Partial<FeesDto>): Promise<ApiResponse<FeesDto>> {
    return apiClient.put<FeesDto>(`/api/Fees/${id}`, fee);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/Fees/${id}`);
  }

  // Admin Housing Fees
  async setGlobalHousingFee(feeData: unknown): Promise<ApiResponse<unknown>> {
    return apiClient.post('/api/admin/housing-fees/set-global', feeData);
  }

  async getHousingFees(): Promise<ApiResponse<FeesDto[]>> {
    return apiClient.get<FeesDto[]>('/api/admin/housing-fees');
  }

  async getStudentHousingFees(studentId: number): Promise<ApiResponse<FeesDto[]>> {
    return apiClient.get<FeesDto[]>(`/api/admin/housing-fees/student/${studentId}`);
  }

  async updateHousingFee(id: number, fee: Partial<FeesDto>): Promise<ApiResponse<FeesDto>> {
    return apiClient.put<FeesDto>(`/api/admin/housing-fees/${id}`, fee);
  }

  async deleteHousingFee(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/admin/housing-fees/${id}`);
  }

  async markAsPaid(id: number): Promise<ApiResponse<unknown>> {
    return apiClient.put(`/api/admin/housing-fees/${id}/mark-paid`);
  }

  // Admin Fee Payments
  async getPendingPayments(): Promise<ApiResponse<unknown[]>> {
    return apiClient.get<unknown[]>('/api/admin/payments/pending');
  }

  async approvePayment(feePaymentId: number): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/admin/payments/approve/${feePaymentId}`);
  }

  async rejectPayment(feePaymentId: number): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/admin/payments/reject/${feePaymentId}`);
  }

  // Base Housing Fees
  async setBaseGlobalFee(feeData: unknown): Promise<ApiResponse<unknown>> {
    return apiClient.post('/api/admin/base-housing-fees/set-global', feeData);
  }

  async updateBaseGlobalFee(feeData: unknown): Promise<ApiResponse<unknown>> {
    return apiClient.put('/api/admin/base-housing-fees/update-global', feeData);
  }

  async getBaseHousingFees(): Promise<ApiResponse<unknown[]>> {
    return apiClient.get<unknown[]>('/api/admin/base-housing-fees');
  }

  async deleteBaseFee(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/admin/base-housing-fees/${id}`);
  }

  // Student Payment
  async payFee(feeId: number, paymentData: unknown): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/student/payments/pay/${feeId}`, paymentData);
  }
}

export const feesService = new FeesService();
