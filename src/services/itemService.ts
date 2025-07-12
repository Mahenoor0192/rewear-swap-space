
import { itemsAPI, adminAPI } from './apiService';
import { toast } from 'sonner';

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
      const response = await itemsAPI.getAvailableItems();
      return response.items || [];
    } catch (error) {
      // Fallback to dummy data for demo if API fails
      console.warn('API call failed, using dummy data:', error);
      
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
        }
      ];
    }
  }

  async getItemById(id: string) {
    try {
      const response = await itemsAPI.getItemById(id);
      return response.item;
    } catch (error) {
      // Fallback to finding in featured items
      const items = await this.getFeaturedItems();
      return items.find(item => item.id === id);
    }
  }

  async getUserItems(userId: string) {
    try {
      const response = await itemsAPI.getMyItems();
      return response.items?.filter((item: any) => item.isAvailable) || [];
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load your items';
      toast.error(message);
      
      // Fallback to dummy data for demo
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
    }
  }

  async createItem(itemData: CreateItemData) {
    try {
      const formData = new FormData();
      formData.append('title', itemData.title);
      formData.append('description', itemData.description);
      formData.append('category', itemData.category);
      formData.append('size', itemData.size);
      formData.append('condition', itemData.condition);
      formData.append('tags', JSON.stringify(itemData.tags));
      
      itemData.images.forEach((image, index) => {
        formData.append(`images`, image);
      });

      const response = await itemsAPI.addItem(formData);
      toast.success('Item created successfully!');
      return response.item;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create item';
      toast.error(message);
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        id: Date.now().toString(),
        title: itemData.title,
        description: itemData.description,
        category: itemData.category,
        size: itemData.size,
        condition: itemData.condition,
        tags: itemData.tags,
        images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3'],
        userId: '1',
        userName: 'You',
        status: 'pending',
        createdAt: new Date().toISOString(),
        isAvailable: true,
        points: this.calculatePoints(itemData.condition)
      };
    }
  }

  async getPendingItems() {
    try {
      const response = await itemsAPI.getAllItems();
      return response.items?.filter((item: any) => item.status === 'pending') || [];
    } catch (error) {
      // Fallback to dummy data for demo
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
    }
  }

  async approveItem(itemId: string) {
    try {
      await itemsAPI.updateItemStatus(itemId, 'approved');
      toast.success('Item approved successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to approve item';
      toast.error(message);
      throw error;
    }
  }

  async rejectItem(itemId: string) {
    try {
      await itemsAPI.updateItemStatus(itemId, 'rejected');
      toast.success('Item rejected successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to reject item';
      toast.error(message);
      throw error;
    }
  }

  async deleteItem(itemId: string) {
    try {
      await itemsAPI.deleteItem(itemId);
      toast.success('Item deleted successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete item';
      toast.error(message);
      throw error;
    }
  }

  private calculatePoints(condition: string): number {
    const pointsMap: { [key: string]: number } = {
      'new': 50,
      'like_new': 40,
      'good': 25,
      'fair': 15
    };
    return pointsMap[condition] || 20;
  }
}

export default new ItemService();
