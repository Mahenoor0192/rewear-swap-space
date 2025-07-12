
import { swapAPI } from './apiService';

class SwapService {
  async requestSwap(offeredItemId: string, requestedItemId: string) {
    try {
      const response = await swapAPI.requestSwap({
        offered_item_id: offeredItemId,
        requested_item_id: requestedItemId
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getMyRequests() {
    try {
      const response = await swapAPI.getMyRequests();
      return response.swaps || [];
    } catch (error) {
      throw error;
    }
  }

  async getReceivedRequests() {
    try {
      const response = await swapAPI.getReceivedRequests();
      return response.swaps || [];
    } catch (error) {
      throw error;
    }
  }

  async respondToSwap(swapId: string, status: 'accepted' | 'rejected') {
    try {
      const response = await swapAPI.respondToSwap(swapId, status);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new SwapService();
