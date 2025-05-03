import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = 'https://seniorprojectv1-f3asa2hzanczg3cx.eastus-01.azurewebsites.net/api';

// Update in TokenManager.ts
export class TokenManager {
  private static TOKEN_KEY = 'token';
  
  static async getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(this.TOKEN_KEY);
      console.log('TokenManager.getToken() - Token exists:', !!token);
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }
  
  static async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
      console.log('TokenManager.setToken() - Token stored');
      console.log(token)
    } catch (error) {
      console.error('Error setting token:', error);
    }
  }
  
  static async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.TOKEN_KEY);
      console.log('TokenManager.removeToken() - Token removed');
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
  // Get the token using TokenManager
  const token = await TokenManager.getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'accept': 'text/plain', // Match curl command
  };
  
  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    console.log('Using token for API request');
  } else {
    console.warn('No token available for API request');
  }
  
  const config: RequestInit = {
    method,
    headers,
  };
  
  if (body) {
    config.body = JSON.stringify(body);
  }
  
  console.log(`Making ${method} request to: ${API_URL}${endpoint}`);
  
  return fetch(`${API_URL}${endpoint}`, config);
};