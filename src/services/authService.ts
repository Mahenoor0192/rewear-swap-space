
import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    userType: 'admin' | 'user';
    points: number;
    avatar?: string;
  };
  token: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Commented out actual API call for demo purposes
      // const response = await api.post('/auth/login', credentials);
      // return response.data;

      // Dummy response for demo
      const dummyResponse: LoginResponse = {
        user: {
          id: '1',
          email: credentials.email,
          name: credentials.email.includes('admin') ? 'Admin User' : 'John Doe',
          userType: credentials.email.includes('admin') ? 'admin' : 'user',
          points: credentials.email.includes('admin') ? 0 : 150,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        token: 'dummy-jwt-token'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return dummyResponse;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  async logout(): Promise<void> {
    try {
      // await api.post('/auth/logout');
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser() {
    try {
      // const response = await api.get('/auth/me');
      // return response.data;
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
