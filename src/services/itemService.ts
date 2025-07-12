
import { toast } from 'sonner';

export interface CreateItemData {
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  tags: string[];
  images: File[];
  points: number;
}

// Static items data
let staticItems = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic vintage denim jacket in excellent condition. Perfect for layering.',
    category: 'outerwear',
    size: 'M',
    condition: 'good',
    tags: ['vintage', 'denim', 'classic'],
    images: ['/placeholder.svg', '/placeholder.svg'],
    points: 75,
    userId: '1',
    userName: 'John Doe',
    userAvatar: '/placeholder.svg',
    isAvailable: true,
    status: 'approved',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Designer Silk Scarf',
    description: 'Beautiful silk scarf with floral pattern. Barely worn.',
    category: 'accessories',
    size: 'one-size',
    condition: 'like_new',
    tags: ['silk', 'designer', 'floral'],
    images: ['/placeholder.svg'],
    points: 45,
    userId: '2',
    userName: 'Jane Smith',
    userAvatar: '/placeholder.svg',
    isAvailable: true,
    status: 'approved',
    createdAt: '2024-01-14T14:30:00Z'
  },
  {
    id: '3',
    title: 'Leather Boots',
    description: 'High-quality leather boots with minimal wear. Size 9.',
    category: 'shoes',
    size: '9',
    condition: 'good',
    tags: ['leather', 'boots', 'brown'],
    images: ['/placeholder.svg', '/placeholder.svg'],
    points: 90,
    userId: '1',
    userName: 'John Doe',
    userAvatar: '/placeholder.svg',
    isAvailable: true,
    status: 'approved',
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    title: 'Wool Sweater',
    description: 'Cozy wool sweater for winter. Needs approval.',
    category: 'tops',
    size: 'L',
    condition: 'good',
    tags: ['wool', 'winter', 'cozy'],
    images: ['/placeholder.svg'],
    points: 60,
    userId: '1',
    userName: 'John Doe',
    userAvatar: '/placeholder.svg',
    isAvailable: false,
    status: 'pending',
    createdAt: '2024-01-16T16:45:00Z'
  }
];

class ItemService {
  async getFeaturedItems() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const availableItems = staticItems.filter(item => 
      item.isAvailable && item.status === 'approved'
    );
    
    return availableItems;
  }

  async getItemById(id: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const item = staticItems.find(item => item.id === id);
    if (!item) {
      toast.error('Item not found');
      throw new Error('Item not found');
    }
    
    return item;
  }

  async getUserItems(userId?: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      return [];
    }
    
    const currentUserId = token.split('-').pop();
    const userItems = staticItems.filter(item => 
      item.userId === currentUserId && item.isAvailable
    );
    
    return userItems;
  }

  async createItem(itemData: CreateItemData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Please login to create items');
      throw new Error('Not authenticated');
    }
    
    const userId = token.split('-').pop();
    
    // Convert File objects to placeholder URLs for demo
    const imageUrls = itemData.images.map((_, index) => `/placeholder.svg?item=${Date.now()}&img=${index}`);
    
    const newItem = {
      id: String(staticItems.length + 1),
      title: itemData.title,
      description: itemData.description,
      category: itemData.category,
      size: itemData.size,
      condition: itemData.condition,
      tags: itemData.tags,
      images: imageUrls,
      points: itemData.points,
      userId: userId || '1',
      userName: 'Current User',
      userAvatar: '/placeholder.svg',
      isAvailable: false, // Pending approval
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    staticItems.push(newItem);
    toast.success('Item created successfully!');
    
    return newItem;
  }

  async getPendingItems() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const pendingItems = staticItems.filter(item => item.status === 'pending');
    return pendingItems;
  }

  async approveItem(itemId: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const itemIndex = staticItems.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      toast.error('Item not found');
      throw new Error('Item not found');
    }
    
    staticItems[itemIndex] = {
      ...staticItems[itemIndex],
      status: 'approved',
      isAvailable: true
    };
    
    toast.success('Item approved successfully!');
  }

  async rejectItem(itemId: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const itemIndex = staticItems.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      toast.error('Item not found');
      throw new Error('Item not found');
    }
    
    staticItems[itemIndex] = {
      ...staticItems[itemIndex],
      status: 'rejected',
      isAvailable: false
    };
    
    toast.success('Item rejected successfully!');
  }

  async deleteItem(itemId: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const itemIndex = staticItems.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      toast.error('Item not found');
      throw new Error('Item not found');
    }
    
    staticItems.splice(itemIndex, 1);
    toast.success('Item deleted successfully!');
  }
}

export default new ItemService();
