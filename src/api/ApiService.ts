import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, LoginResponse } from '../interfaces/auth';

// API Config
const API_URL = 'https://your-api-base-url.com';
const API_KEY = 'your-api-key'; // If needed for your API

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Key': API_KEY, // Include if needed
  },
  timeout: 15000, // 15 seconds timeout
});

// Token management
class TokenManager {
  private static TOKEN_KEY = 'token';
  
  // Get token from storage
  static async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }
  
  // Set token in storage
  static async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  }
  
  // Remove token from storage
  static async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }
}

// Add request interceptor to automatically add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await TokenManager.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors and token refresh if needed
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Here you could add token refresh logic if your API supports it
      // For example:
      // try {
      //   const refreshToken = await AsyncStorage.getItem('refreshToken');
      //   const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
      //   const newToken = response.data.token;
      //   await TokenManager.setToken(newToken);
      //   originalRequest.headers.Authorization = `Bearer ${newToken}`;
      //   return apiClient(originalRequest);
      // } catch (refreshError) {
      //   // If refresh fails, log out the user
      //   await TokenManager.removeToken();
      //   // You could emit an event to notify the app to redirect to login
      //   return Promise.reject(refreshError);
      // }
    }
    
    return Promise.reject(error);
  }
);

// API service definition
export const api = {
  // Auth endpoints
  auth: {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      try {
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
        // Save token upon successful login
        if (response.data.token) {
          await TokenManager.setToken(response.data.token);
        }
        return response.data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    
    logout: async (): Promise<void> => {
      try {
        // Call logout endpoint if needed
        await apiClient.post('/auth/logout');
      } catch (error) {
        console.error('Logout API error:', error);
      } finally {
        // Always remove token regardless of API success
        await TokenManager.removeToken();
      }
    },
    
    // Check if user is authenticated
    isAuthenticated: async (): Promise<boolean> => {
      const token = await TokenManager.getToken();
      return !!token;
    }
  },
  
  // User endpoints
  users: {
    getProfile: (): Promise<AxiosResponse> => 
      apiClient.get('/users/profile'),
      
    updateProfile: (userData: any): Promise<AxiosResponse> => 
      apiClient.put('/users/profile', userData),
  },
  
  // Example of other API resources
  // Products endpoints
  products: {
    getAll: (params?: any): Promise<AxiosResponse> => 
      apiClient.get('/products', { params }),
      
    getById: (id: string): Promise<AxiosResponse> => 
      apiClient.get(`/products/${id}`),
      
    create: (productData: any): Promise<AxiosResponse> => 
      apiClient.post('/products', productData),
      
    update: (id: string, productData: any): Promise<AxiosResponse> => 
      apiClient.put(`/products/${id}`, productData),
      
    delete: (id: string): Promise<AxiosResponse> => 
      apiClient.delete(`/products/${id}`),
  },
  
  // Add more API endpoints as needed...
};

// Export TokenManager for direct access if needed
export { TokenManager };

// Export default apiClient for custom requests
export default apiClient;