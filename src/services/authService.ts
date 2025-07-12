
import { authAPI } from './apiService';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
}

interface AuthResponse {
  accessToken: string;
  user_type: 'user' | 'admin';
  user: {
    id: string;
    name: string;
    email: string;
    userType: 'user' | 'admin';
    avatar?: string;
    points: number;
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // const response = await authAPI.login(credentials);
      // return response;

      // Dummy implementation for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email === 'admin@mailinator.com' && credentials.password === 'admin@123') {
        return {
          accessToken: 'dummy-admin-token',
          user_type: 'admin',
          user: {
            id: '1',
            name: 'Admin User',
            email: credentials.email,
            userType: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            points: 0
          }
        };
      } else if (credentials.email === 'user@rewear.com' && credentials.password === 'password') {
        return {
          accessToken: 'dummy-user-token',
          user_type: 'user',
          user: {
            id: '2',
            name: 'John Doe',
            email: credentials.email,
            userType: 'user',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            points: 150
          }
        };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  }

  async signup(signupData: SignupData): Promise<AuthResponse> {
    try {
      // const response = await authAPI.signup(signupData);
      // return response;

      // Dummy implementation for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        accessToken: 'dummy-new-user-token',
        user_type: 'user',
        user: {
          id: Date.now().toString(),
          name: signupData.name,
          email: signupData.email,
          userType: 'user',
          points: 50 // Welcome bonus
        }
      };
    } catch (error) {
      throw error;
    }
  }

  async getProfile() {
    try {
      // return await authAPI.getProfile();
      
      // Dummy implementation
      return {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone_number: '+1234567890',
        address: '123 Main St, City',
        points: 150
      };
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(data: { name: string; phone_number?: string; address?: string }) {
    try {
      // return await authAPI.updateProfile(data);
      
      // Dummy implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { message: 'Profile updated successfully', user: data };
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('authToken');
      console.log('User logged out');
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
