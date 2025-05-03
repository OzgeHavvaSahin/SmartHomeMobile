import React, { createContext, useContext, useReducer, ReactNode, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/AuthApi';
import { 
  AuthState, 
  AuthContextType, 
  LoginCredentials,
  LoginResponse,
} from '../interfaces/auth';
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
  | { type: 'LOGIN_SUCCESS'; payload: { user: LoginResponse | null; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
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
      return { ...state, isAuthenticated: false, user: null, token: null, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...initialState };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
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
  const [initialized, setInitialized] = useState(false);

  // Login
  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'LOGIN_REQUEST' });
      const data = await loginUser(credentials);

      if (!data.token) throw new Error('No token received from server');

      // Save token and user
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify({
        id: data.id,
        email: data.email,
        name: data.name,
        surname: data.surname,
      }));

      await TokenManager.setToken(data.token);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: {
            id: data.id,
            email: data.email,
            name: data.name,
            surname: data.surname,
            token: data.token, // opsiyonel: gerekirse ekle
          },
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

  // Logout
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };


  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userJson = await AsyncStorage.getItem('user');
  
      if (token && userJson) {
        await TokenManager.setToken(token);
        const user = JSON.parse(userJson);
  
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user,
            token,
          },
        });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.error('Error loading token or user:', error);
      dispatch({ type: 'LOGOUT' });
    } finally {
      setInitialized(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        clearError,
        initialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
