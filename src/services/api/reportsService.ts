import { apiClient, ApiResponse } from './client';
import { ReportsSummaryDto } from '@/types/api';

class ReportsService {
  async getSummary(): Promise<ApiResponse<ReportsSummaryDto>> {
    return apiClient.get<ReportsSummaryDto>('/api/Reports/summary');
  }
}

export const reportsService = new ReportsService();
