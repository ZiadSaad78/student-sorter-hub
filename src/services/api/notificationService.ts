import { apiClient, ApiResponse } from './client';
import { NotificationDto } from '@/types/api';

class NotificationService {
  // Admin Notifications
  async sendToAll(notification: Partial<NotificationDto>): Promise<ApiResponse<unknown>> {
    return apiClient.post('/api/admin/notifications/send-to-all', notification);
  }

  // Student Profile Notifications
  async getMyNotifications(): Promise<ApiResponse<NotificationDto[]>> {
    return apiClient.get<NotificationDto[]>('/api/student/profile/notifications');
  }

  async markAsRead(notificationId: number): Promise<ApiResponse<unknown>> {
    return apiClient.put(`/api/student/profile/notifications/${notificationId}/read`);
  }
}

export const notificationService = new NotificationService();
