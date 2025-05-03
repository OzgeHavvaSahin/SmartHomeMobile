export interface LogoHeaderProps {
    title: string;
    subtitle: string;
    logoSource: any; // Using any for the image source type
  }
  
export interface ErrorMessageProps {
    message: string | null;
  }
  

export interface SignInFormProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    isLoading: boolean;
    onSubmit: () => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
  }

  export interface GetAllHomesResponse {
    id: number;
    name: string;
    ownerId: number;
  }

export interface CreateHomeRequest {
  ownerID: number;
  name: string;
}  

export interface CreateHomeResponse {
  homeId: number;
  name: string;
}

export interface Home {
  id: number;
  name: string;
  ownerId: number;
}

export type DeviceType = 'light' | 'doorSensor' | 'windowSensor' | 'camera';

export interface DeviceCardProps {
  id: string;
  name: string;
  type: DeviceType;
  description: string;
  isActive: boolean;
  onNavigateToDetails: (deviceId: number) => void;
}

export interface DeviceCardUIProps {
  id: string;
  name: string;
  type: DeviceType;
  description: string;
  isActive: boolean;
  statusText: string;
  deviceIcon: any;
  onPress: () => void;
}

// Room-related interfaces for the home
export interface Room {
  id: number;
  name: string;
  homeId: number;
  createdDate: string;
  updatedDate?: string;
}

// Device-related interfaces
export interface Device {
  id: number;
  name: string;
  type: string;
  description?: string;
  isActive: boolean;
  roomId: number;
  createdDate: string;
  updatedDate?: string;
}