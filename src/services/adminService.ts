
import { adminAPI } from './apiService';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  address?: string;
  is_enabled: boolean;
  created_at: string;
  items_count: number;
  purchases_count: number;
}

class AdminService {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await adminAPI.getAllUsers();
      return response.users || [];
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load users';
      toast.error(message);
      throw error;
    }
  }

  async updateUserStatus(userId: string, isEnabled: boolean) {
    try {
      const response = await adminAPI.updateUserStatus(userId, isEnabled);
      toast.success(`User ${isEnabled ? 'enabled' : 'disabled'} successfully`);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update user status';
      toast.error(message);
      throw error;
    }
  }
}

export default new AdminService();
