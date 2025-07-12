
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error('Request failed');
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Show success toast for successful requests
    if (response.config.method !== 'get') {
      toast.success(response.data.message || 'Operation successful');
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else {
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  signup: async (data: {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    address: string;
  }) => {
    const response = await api.post('/api/v1/auth/signup', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/api/v1/auth/login', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/user/me');
    return response.data;
  },

  updateProfile: async (data: { name: string; phone_number?: string; address?: string }) => {
    const response = await api.put('/api/user/update/', data);
    return response.data;
  }
};

// Items APIs
export const itemsAPI = {
  addItem: async (formData: FormData) => {
    const response = await api.post('/api/item/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  getMyItems: async () => {
    const response = await api.get('/api/item/my');
    return response.data;
  },

  getAllItems: async () => {
    const response = await api.get('/api/item/all');
    return response.data;
  },

  getAvailableItems: async () => {
    const response = await api.get('/api/item/available');
    return response.data;
  },

  getItemById: async (id: string) => {
    const response = await api.get(`/api/item/${id}`);
    return response.data;
  },

  deleteItem: async (id: string) => {
    const response = await api.delete(`/api/item/${id}`);
    return response.data;
  },

  updateItemStatus: async (id: string, status: 'approved' | 'rejected') => {
    const response = await api.patch(`/api/item/${id}/status`, { status });
    return response.data;
  }
};

// Swap APIs
export const swapAPI = {
  requestSwap: async (data: { offered_item_id: string; requested_item_id: string }) => {
    const response = await api.post('/api/swap/request', data);
    return response.data;
  },

  getMyRequests: async () => {
    const response = await api.get('/api/swap/my-requests');
    return response.data;
  },

  getReceivedRequests: async () => {
    const response = await api.get('/api/swap/received-requests');
    return response.data;
  },

  respondToSwap: async (id: string, status: 'accepted' | 'rejected') => {
    const response = await api.patch(`/api/swap/respond/${id}`, { status });
    return response.data;
  }
};

// Admin APIs
export const adminAPI = {
  getAllUsers: async () => {
    const response = await api.get('/api/user/all');
    return response.data;
  },

  updateUserStatus: async (id: string, is_enabled: boolean) => {
    const response = await api.patch(`/api/user/status/${id}`, { is_enabled });
    return response.data;
  }
};

export default api;
