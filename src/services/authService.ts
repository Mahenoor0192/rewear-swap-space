
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
    phone_number?: string;
    address?: string;
  };
}

// Static users data
const staticUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@rewear.com',
    password: 'password',
    userType: 'user' as const,
    points: 150,
    phone_number: '+1234567890',
    address: '123 Main St, City, State'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@mailinator.com',
    password: 'admin@123',
    userType: 'admin' as const,
    points: 0,
    phone_number: '+1234567891',
    address: '456 Admin Ave, City, State'
  }
];

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = staticUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      toast.error('Invalid email or password');
      throw new Error('Invalid credentials');
    }

    const token = `fake-jwt-token-${user.id}`;
    localStorage.setItem('authToken', token);
    toast.success('Login successful!');
    
    return {
      accessToken: token,
      user_type: user.userType,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        points: user.points,
        phone_number: user.phone_number,
        address: user.address
      }
    };
  }

  async signup(signupData: SignupData): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = staticUsers.find(u => u.email === signupData.email);
    if (existingUser) {
      toast.error('User already exists with this email');
      throw new Error('User already exists');
    }

    const newUser = {
      id: String(staticUsers.length + 1),
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      userType: 'user' as const,
      points: 50, // Welcome bonus
      phone_number: signupData.phone_number,
      address: signupData.address
    };

    staticUsers.push(newUser);
    
    const token = `fake-jwt-token-${newUser.id}`;
    localStorage.setItem('authToken', token);
    toast.success('Account created successfully!');
    
    return {
      accessToken: token,
      user_type: newUser.userType,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType,
        points: newUser.points,
        phone_number: newUser.phone_number,
        address: newUser.address
      }
    };
  }

  async getProfile() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }
    
    const userId = token.split('-').pop();
    const user = staticUsers.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        points: user.points,
        phone_number: user.phone_number,
        address: user.address
      }
    };
  }

  async updateProfile(data: { name: string; phone_number?: string; address?: string }) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }
    
    const userId = token.split('-').pop();
    const userIndex = staticUsers.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    staticUsers[userIndex] = {
      ...staticUsers[userIndex],
      name: data.name,
      phone_number: data.phone_number || staticUsers[userIndex].phone_number,
      address: data.address || staticUsers[userIndex].address
    };

    toast.success('Profile updated successfully!');
    
    return {
      user: {
        id: staticUsers[userIndex].id,
        name: staticUsers[userIndex].name,
        email: staticUsers[userIndex].email,
        userType: staticUsers[userIndex].userType,
        points: staticUsers[userIndex].points,
        phone_number: staticUsers[userIndex].phone_number,
        address: staticUsers[userIndex].address
      }
    };
  }

  async logout(): Promise<void> {
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully');
  }
}

export default new AuthService();
