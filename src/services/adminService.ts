
import { adminAPI } from './apiService';

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
      // const response = await adminAPI.getAllUsers();
      // return response.users;

      // Mock data for demo
      return [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone_number: '+1234567890',
          address: '123 Main St, City',
          is_enabled: true,
          created_at: '2024-01-15',
          items_count: 5,
          purchases_count: 12
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone_number: '+1234567891',
          address: '456 Oak Ave, Town',
          is_enabled: true,
          created_at: '2024-01-10',
          items_count: 8,
          purchases_count: 6
        },
        {
          id: '3',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          phone_number: '+1234567892',
          address: '789 Pine St, Village',
          is_enabled: false,
          created_at: '2024-01-08',
          items_count: 2,
          purchases_count: 1
        }
      ];
    } catch (error) {
      throw error;
    }
  }

  async updateUserStatus(userId: string, isEnabled: boolean) {
    try {
      // const response = await adminAPI.updateUserStatus(userId, isEnabled);
      // return response;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`User ${userId} ${isEnabled ? 'enabled' : 'disabled'}`);
      return { message: `User ${isEnabled ? 'enabled' : 'disabled'} successfully` };
    } catch (error) {
      throw error;
    }
  }
}

export default new AdminService();
