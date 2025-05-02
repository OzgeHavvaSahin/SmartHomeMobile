import { TokenManager, createAuthRequest } from './ApiService'; // Import only TokenManager and request helper
import { LoginRequest, LoginResponse } from '../interfaces/auth';

/**
 * Authenticate user with email and password
 * @param {LoginRequest} credentials - User credentials
 * @returns {Promise<LoginResponse>} - Response from the server
 */
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    // Use the createAuthRequest helper to make the API call
    const response = await createAuthRequest('/Authentication/login', 'POST', credentials);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Giriş başarısız oldu');
    }
    
    // Store the token using TokenManager
    if (data.token) {
      await TokenManager.setToken(data.token);
    }
    
    return data;
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Get the authentication token
 * @returns {Promise<string|null>} - The authentication token or null
 */
export const getAuthToken = async (): Promise<string | null> => {
  return TokenManager.getToken();
};

/**
 * Check if the user is authenticated
 * @returns {Promise<boolean>} - True if authenticated, false otherwise
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await TokenManager.getToken();
  return !!token;
};

/**
 * Log out the current user
 * @returns {Promise<void>}
 */
export const logoutUser = async (): Promise<void> => {
  try {
    // Optional: Call logout endpoint if your API has one
    // await createAuthRequest('/Authentication/logout', 'POST');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always remove token
    await TokenManager.removeToken();
  }
};