
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

// Static admin data
const staticAdminUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@rewear.com',
    phone_number: '+1234567890',
    address: '123 Main St, City, State',
    is_enabled: true,
    created_at: '2024-01-01T00:00:00Z',
    items_count: 5,
    purchases_count: 3
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone_number: '+1234567891',
    address: '456 Oak Ave, City, State',
    is_enabled: true,
    created_at: '2024-01-02T00:00:00Z',
    items_count: 8,
    purchases_count: 5
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone_number: '+1234567892',
    address: '789 Pine St, City, State',
    is_enabled: false,
    created_at: '2024-01-03T00:00:00Z',
    items_count: 2,
    purchases_count: 1
  }
];

class AdminService {
  async getAllUsers(): Promise<User[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return staticAdminUsers;
  }

  async updateUserStatus(userId: string, isEnabled: boolean) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const userIndex = staticAdminUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      toast.error('User not found');
      throw new Error('User not found');
    }
    
    staticAdminUsers[userIndex] = {
      ...staticAdminUsers[userIndex],
      is_enabled: isEnabled
    };
    
    toast.success(`User ${isEnabled ? 'enabled' : 'disabled'} successfully`);
    
    return staticAdminUsers[userIndex];
  }
}

export default new AdminService();
