
import { swapAPI } from './apiService';
import { toast } from 'sonner';

class SwapService {
  async requestSwap(offeredItemId: string, requestedItemId: string) {
    try {
      const response = await swapAPI.requestSwap({
        offered_item_id: offeredItemId,
        requested_item_id: requestedItemId
      });
      toast.success('Swap request sent successfully!');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send swap request';
      toast.error(message);
      throw error;
    }
  }

  async getMyRequests() {
    try {
      const response = await swapAPI.getMyRequests();
      return response.swaps || [];
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load your swap requests';
      toast.error(message);
      throw error;
    }
  }

  async getReceivedRequests() {
    try {
      const response = await swapAPI.getReceivedRequests();
      return response.swaps || [];
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load received swap requests';
      toast.error(message);
      throw error;
    }
  }

  async respondToSwap(swapId: string, status: 'accepted' | 'rejected') {
    try {
      const response = await swapAPI.respondToSwap(swapId, status);
      toast.success(`Swap request ${status} successfully!`);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || `Failed to ${status} swap request`;
      toast.error(message);
      throw error;
    }
  }
}

export default new SwapService();
