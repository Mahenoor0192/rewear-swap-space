
// This file is kept for compatibility but no longer makes actual API calls
// All services now use static data for the presentation

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Placeholder API object - not used but kept for compatibility
export const authAPI = {
  signup: async () => ({ message: 'Using static data' }),
  login: async () => ({ message: 'Using static data' }),
  getProfile: async () => ({ message: 'Using static data' }),
  updateProfile: async () => ({ message: 'Using static data' })
};

export const itemsAPI = {
  addItem: async () => ({ message: 'Using static data' }),
  getMyItems: async () => ({ message: 'Using static data' }),
  getAllItems: async () => ({ message: 'Using static data' }),
  getAvailableItems: async () => ({ message: 'Using static data' }),
  getItemById: async () => ({ message: 'Using static data' }),
  deleteItem: async () => ({ message: 'Using static data' }),
  updateItemStatus: async () => ({ message: 'Using static data' })
};

export const swapAPI = {
  requestSwap: async () => ({ message: 'Using static data' }),
  getMyRequests: async () => ({ message: 'Using static data' }),
  getReceivedRequests: async () => ({ message: 'Using static data' }),
  respondToSwap: async () => ({ message: 'Using static data' })
};

export const adminAPI = {
  getAllUsers: async () => ({ message: 'Using static data' }),
  updateUserStatus: async () => ({ message: 'Using static data' })
};

export default {
  defaults: {
    baseURL: API_BASE_URL
  }
};
