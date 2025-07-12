
import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    userType: 'user' | 'admin';
    avatar?: string;
    points: number;
  };
  token: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // const response = await api.post('/auth/login', credentials);
      // return response.data;

      // Dummy implementation for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email === 'admin@rewear.com' && credentials.password === 'password') {
        return {
          user: {
            id: '1',
            name: 'Admin User',
            email: credentials.email,
            userType: 'admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            points: 0
          },
          token: 'dummy-admin-token'
        };
      } else if (credentials.email === 'user@rewear.com' && credentials.password === 'password') {
        return {
          user: {
            id: '2',
            name: 'John Doe',
            email: credentials.email,
            userType: 'user',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
            points: 150
          },
          token: 'dummy-user-token'
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
      // const response = await api.post('/auth/signup', signupData);
      // return response.data;

      // Dummy implementation for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        user: {
          id: Date.now().toString(),
          name: signupData.name,
          email: signupData.email,
          userType: 'user',
          points: 50 // Welcome bonus
        },
        token: 'dummy-new-user-token'
      };
    } catch (error) {
      throw error;
    }
  }

  async signupWithGoogle(): Promise<AuthResponse> {
    try {
      // Implementation for Google signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        user: {
          id: Date.now().toString(),
          name: 'Google User',
          email: 'google.user@gmail.com',
          userType: 'user',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
          points: 50
        },
        token: 'dummy-google-token'
      };
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // await api.post('/auth/logout');
      console.log('User logged out');
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      // const response = await api.post('/auth/refresh');
      // return response.data;
      
      // Dummy implementation
      throw new Error('Token refresh not implemented');
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
