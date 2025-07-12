
import { authAPI } from './apiService';
import { toast } from 'sonner';

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
      const response = await authAPI.login(credentials);
      localStorage.setItem('authToken', response.accessToken);
      toast.success('Login successful!');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  }

  async signup(signupData: SignupData): Promise<AuthResponse> {
    try {
      const response = await authAPI.signup(signupData);
      localStorage.setItem('authToken', response.accessToken);
      toast.success('Account created successfully!');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Signup failed';
      toast.error(message);
      throw error;
    }
  }

  async getProfile() {
    try {
      return await authAPI.getProfile();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load profile';
      toast.error(message);
      throw error;
    }
  }

  async updateProfile(data: { name: string; phone_number?: string; address?: string }) {
    try {
      const response = await authAPI.updateProfile(data);
      toast.success('Profile updated successfully!');
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('authToken');
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error('Logout failed');
      throw error;
    }
  }
}

export default new AuthService();
