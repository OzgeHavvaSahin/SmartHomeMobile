// types/device.types.ts

// Define device types
export type DeviceType = 'light' | 'doorSensor' | 'windowSensor' | 'camera';

// Define the props interface for the DeviceCard component
export interface DeviceCardProps {
  id: string;
  name: string;
  type: DeviceType;
  description: string;
  isActive: boolean;
  onNavigateToDetails: (deviceId: string) => void;
}

// Props for the UI component (doesn't need to know about navigation logic)
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