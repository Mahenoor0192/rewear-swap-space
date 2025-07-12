
import api from './api';

export interface CreateItemData {
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  tags: string[];
  images: string[];
  points: number;
}

class ItemService {
  async getFeaturedItems() {
    try {
      // const response = await api.get('/items/featured');
      // return response.data;

      // Dummy data for demo
      return [
        {
          id: '1',
          title: 'Vintage Denim Jacket',
          description: 'Classic vintage denim jacket in excellent condition',
          category: 'tops',
          size: 'm',
          condition: 'good',
          tags: ['vintage', 'denim', 'casual'],
          images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3'],
          userId: '2',
          userName: 'Sarah Johnson',
          userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e75e4c?ixlib=rb-4.0.3',
          points: 25,
          status: 'approved',
          createdAt: '2024-01-15',
          isAvailable: true
        },
        {
          id: '2',
          title: 'Designer Silk Dress',
          description: 'Beautiful silk dress perfect for special occasions',
          category: 'dresses',
          size: 's',
          condition: 'like_new',
          tags: ['designer', 'silk', 'formal'],
          images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3'],
          userId: '3',
          userName: 'Emma Wilson',
          userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3',
          points: 45,
          status: 'approved',
          createdAt: '2024-01-14',
          isAvailable: true
        },
        {
          id: '3',
          title: 'Leather Boots',
          description: 'Genuine leather boots, barely worn',
          category: 'shoes',
          size: '8',
          condition: 'like_new',
          tags: ['leather', 'boots', 'winter'],
          images: ['https://images.unsplash.com/photo-1608256246200-53e8b47b2c74?ixlib=rb-4.0.3'],
          userId: '4',
          userName: 'Mike Chen',
          userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
          points: 35,
          status: 'approved',
          createdAt: '2024-01-13',
          isAvailable: true
        }
      ];
    } catch (error) {
      throw error;
    }
  }

  async getItemById(id: string) {
    try {
      // const response = await api.get(`/items/${id}`);
      // return response.data;

      const items = await this.getFeaturedItems();
      return items.find(item => item.id === id);
    } catch (error) {
      throw error;
    }
  }

  async getUserItems(userId: string) {
    try {
      // const response = await api.get(`/users/${userId}/items`);
      // return response.data;

      return [
        {
          id: '4',
          title: 'My Casual T-Shirt',
          description: 'Comfortable cotton t-shirt',
          category: 'tops',
          size: 'l',
          condition: 'good',
          tags: ['casual', 'cotton'],
          images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3'],
          userId: userId,
          userName: 'You',
          points: 15,
          status: 'approved',
          createdAt: '2024-01-12',
          isAvailable: true
        }
      ];
    } catch (error) {
      throw error;
    }
  }

  async createItem(itemData: CreateItemData) {
    try {
      // const response = await api.post('/items', itemData);
      // return response.data;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        id: Date.now().toString(),
        ...itemData,
        userId: '1',
        userName: 'You',
        status: 'pending',
        createdAt: new Date().toISOString(),
        isAvailable: true
      };
    } catch (error) {
      throw error;
    }
  }

  async getPendingItems() {
    try {
      // const response = await api.get('/admin/items/pending');
      // return response.data;

      return [
        {
          id: '5',
          title: 'Pending Item 1',
          description: 'This item is awaiting approval',
          category: 'tops',
          size: 'm',
          condition: 'good',
          tags: ['pending'],
          images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3'],
          userId: '5',
          userName: 'Jane Doe',
          points: 20,
          status: 'pending',
          createdAt: '2024-01-16',
          isAvailable: true
        }
      ];
    } catch (error) {
      throw error;
    }
  }

  async approveItem(itemId: string) {
    try {
      // await api.patch(`/admin/items/${itemId}/approve`);
      console.log(`Item ${itemId} approved`);
    } catch (error) {
      throw error;
    }
  }

  async rejectItem(itemId: string) {
    try {
      // await api.patch(`/admin/items/${itemId}/reject`);
      console.log(`Item ${itemId} rejected`);
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemService();
