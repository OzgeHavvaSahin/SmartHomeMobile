import { LoginRequest, LoginResponse } from '../interfaces/auth';
  
 /**
   * Authenticate user with email and password
   * @param {LoginRequest} credentials - User credentials
   * @returns {Promise<LoginResponse>} - Response from the server
   */
  export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await fetch(
        'https://seniorprojectv1-f3asa2hzanczg3cx.eastus-01.azurewebsites.net/api/Authentication/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Giriş başarısız');
      }
      
      return data as LoginResponse;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };