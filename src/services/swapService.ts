
import { toast } from 'sonner';

// Static swap requests data
let staticSwaps = [
  {
    id: '1',
    offered_item: {
      id: '1',
      title: 'Vintage Denim Jacket',
      images: ['/placeholder.svg'],
      points: 75
    },
    requested_item: {
      id: '2',
      title: 'Designer Silk Scarf',
      images: ['/placeholder.svg'],
      points: 45
    },
    requester: {
      id: '1',
      name: 'John Doe',
      email: 'user@rewear.com'
    },
    receiver: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    status: 'pending',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    offered_item: {
      id: '3',
      title: 'Leather Boots',
      images: ['/placeholder.svg'],
      points: 90
    },
    requested_item: {
      id: '1',
      title: 'Vintage Denim Jacket',
      images: ['/placeholder.svg'],
      points: 75
    },
    requester: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    receiver: {
      id: '1',
      name: 'John Doe',
      email: 'user@rewear.com'
    },
    status: 'accepted',
    created_at: '2024-01-14T14:30:00Z'
  }
];

class SwapService {
  async requestSwap(offeredItemId: string, requestedItemId: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Please login to request swaps');
      throw new Error('Not authenticated');
    }
    
    const userId = token.split('-').pop();
    
    const newSwap = {
      id: String(staticSwaps.length + 1),
      offered_item: {
        id: offeredItemId,
        title: 'My Item',
        images: ['/placeholder.svg'],
        points: 50
      },
      requested_item: {
        id: requestedItemId,
        title: 'Requested Item',
        images: ['/placeholder.svg'],
        points: 60
      },
      requester: {
        id: userId || '1',
        name: 'Current User',
        email: 'current@user.com'
      },
      receiver: {
        id: '2',
        name: 'Item Owner',
        email: 'owner@example.com'
      },
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    staticSwaps.push(newSwap);
    toast.success('Swap request sent successfully!');
    
    return newSwap;
  }

  async getMyRequests() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      return [];
    }
    
    const userId = token.split('-').pop();
    const myRequests = staticSwaps.filter(swap => swap.requester.id === userId);
    
    return myRequests;
  }

  async getReceivedRequests() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      return [];
    }
    
    const userId = token.split('-').pop();
    const receivedRequests = staticSwaps.filter(swap => swap.receiver.id === userId);
    
    return receivedRequests;
  }

  async respondToSwap(swapId: string, status: 'accepted' | 'rejected') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const swapIndex = staticSwaps.findIndex(swap => swap.id === swapId);
    if (swapIndex === -1) {
      toast.error('Swap request not found');
      throw new Error('Swap not found');
    }
    
    staticSwaps[swapIndex] = {
      ...staticSwaps[swapIndex],
      status
    };
    
    toast.success(`Swap request ${status} successfully!`);
    
    return staticSwaps[swapIndex];
  }
}

export default new SwapService();
