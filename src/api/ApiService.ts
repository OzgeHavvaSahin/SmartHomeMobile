import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = 'https://seniorprojectv1-f3asa2hzanczg3cx.eastus-01.azurewebsites.net/api';

export class TokenManager {
  private static TOKEN_KEY = 'token';
  
  static async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }
  
  static async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  }
  
  static async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }
}

export const createAuthRequest = async (
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    // Add auth token if available
    const token = await TokenManager.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config: RequestInit = {
      method,
      headers,
    };
    
    if (body) {
      config.body = JSON.stringify(body);
    }
    
    return fetch(`${API_URL}${endpoint}`, config);
  };