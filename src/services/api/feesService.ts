import { apiClient, ApiResponse } from './client';
import { FeesDto, FeePaymentDto, BaseHousingFeeDto } from '@/types/api';

class FeesService {
  // General Fees CRUD
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
  async setGlobalHousingFee(amount: number, notes?: string): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/admin/housing-fees/set-global?amount=${amount}${notes ? `&notes=${encodeURIComponent(notes)}` : ''}`);
  }

  async getHousingFees(): Promise<ApiResponse<FeesDto[]>> {
    return apiClient.get<FeesDto[]>('/api/admin/housing-fees');
  }

  async getStudentHousingFees(studentId: number): Promise<ApiResponse<FeesDto[]>> {
    return apiClient.get<FeesDto[]>(`/api/admin/housing-fees/student/${studentId}`);
  }

  async updateHousingFee(id: number, amount: number): Promise<ApiResponse<FeesDto>> {
    return apiClient.put<FeesDto>(`/api/admin/housing-fees/${id}`, amount);
  }

  async deleteHousingFee(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/admin/housing-fees/${id}`);
  }

  async markAsPaid(id: number): Promise<ApiResponse<unknown>> {
    return apiClient.put(`/api/admin/housing-fees/${id}/mark-paid`);
  }

  // Admin Fee Payments
  async getPendingPayments(): Promise<ApiResponse<FeePaymentDto[]>> {
    return apiClient.get<FeePaymentDto[]>('/api/admin/payments/pending');
  }

  async approvePayment(feePaymentId: number): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/admin/payments/approve/${feePaymentId}`);
  }

  async rejectPayment(feePaymentId: number): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/admin/payments/reject/${feePaymentId}`);
  }

  // Base Housing Fees (Global settings)
  async setBaseGlobalFee(amount: number, notes?: string): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/admin/base-housing-fees/set-global?amount=${amount}${notes ? `&notes=${encodeURIComponent(notes)}` : ''}`);
  }

  async updateBaseGlobalFee(newAmount: number): Promise<ApiResponse<unknown>> {
    return apiClient.put(`/api/admin/base-housing-fees/update-global?newAmount=${newAmount}`);
  }

  async getBaseHousingFees(): Promise<ApiResponse<BaseHousingFeeDto[]>> {
    return apiClient.get<BaseHousingFeeDto[]>('/api/admin/base-housing-fees');
  }

  async deleteBaseFee(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/admin/base-housing-fees/${id}`);
  }

  // Student Payment
  async payFee(feeId: number, paymentData: FeePaymentDto): Promise<ApiResponse<unknown>> {
    return apiClient.post(`/api/student/payments/pay/${feeId}`, paymentData);
  }

  // Student Profile Fees
  async getMyFees(): Promise<ApiResponse<FeesDto[]>> {
    return apiClient.get<FeesDto[]>('/api/student/profile/fees');
  }
}

export const feesService = new FeesService();
