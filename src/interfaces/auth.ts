export interface LoginRequest {
    email: string;
    password: string;
  }
  

  export interface LoginResponse {
    id: number;
    email: string;
    name : string;
    surname : string;
    token: string;

  }

export interface AuthState {
  isAuthenticated: boolean;
  user: LoginResponse | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}


export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  initialized: boolean; // Add this line
}
