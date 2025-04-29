import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/AuthApi';
import { 
    AuthState, 
    AuthContextType, 
    LoginCredentials,
    User 
  } from '../interfaces/auth'

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
      
      // Store token in AsyncStorage
      await AsyncStorage.setItem('token', data.token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: { id: data.id, email: credentials.email },
          token: data.token,
        },
      });
    } catch (error: any) {
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
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // In a real app, you might want to validate the token
        // For now, just set the authenticated state
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: null, // You might want to fetch user info based on token
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