
import { itemsAPI } from './apiService';
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
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load featured items';
      toast.error(message);
      console.error('Failed to load featured items:', error);
      return [];
    }
  }

  async getItemById(id: string) {
    try {
      const response = await itemsAPI.getItemById(id);
      return response.item;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load item details';
      toast.error(message);
      throw error;
    }
  }

  async getUserItems(userId: string) {
    try {
      const response = await itemsAPI.getMyItems();
      return response.items?.filter((item: any) => item.isAvailable) || [];
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load your items';
      toast.error(message);
      throw error;
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
      
      itemData.images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await itemsAPI.addItem(formData);
      toast.success('Item created successfully!');
      return response.item;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create item';
      toast.error(message);
      throw error;
    }
  }

  async getPendingItems() {
    try {
      const response = await itemsAPI.getAllItems();
      return response.items?.filter((item: any) => item.status === 'pending') || [];
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load pending items';
      toast.error(message);
      return [];
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
