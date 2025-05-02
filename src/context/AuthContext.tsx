import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/AuthApi';
import { 
    AuthState, 
    AuthContextType, 
    LoginCredentials,
    User 
  } from '../interfaces/auth'
import { TokenManager } from '../api/ApiService';

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Action types
type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User | null; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Login function
const login = async (credentials: LoginCredentials) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    const data = await loginUser(credentials);
    
    if (!data.token) {
      throw new Error('No token received from server');
    }
    
    console.log('Received token during login');
    
    // Store token in AsyncStorage
    await AsyncStorage.setItem('token', data.token);
    
    // Also make sure TokenManager has the token
    await TokenManager.setToken(data.token);
    
    console.log('Token stored successfully');
    
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        user: { id: data.id, email: credentials.email },
        token: data.token,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.message || 'Giriş başarısız oldu',
    });
    throw error;
  }
};

  // Logout function
  const logout = async () => {
    // Remove token from storage
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Load token from storage on app start
// Load token from storage on app start - update in AuthContext.tsx
const loadToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      console.log('Found token in AsyncStorage during app startup');
      
      // Make sure TokenManager also has the token
      await TokenManager.setToken(token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: null,
          token,
        },
      });
    }
  } catch (error) {
    console.error('Error loading token:', error);
  }
};

  // Load token on context initialization
  React.useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};