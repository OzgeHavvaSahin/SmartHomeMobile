// components/DeviceCard/DeviceCard.tsx
import React from 'react';
import DeviceCardUI from './DeviceCardUI';
import { getDeviceIcon , getStatusText} from '@/src/utils/deviceHelper';
import { DeviceCardProps } from '@/src/interfaces/components';

// This is the "smart" container component that handles business logic
const DeviceCard: React.FC<DeviceCardProps> = ({
  id,
  name,
  type,
  description,
  isActive,
  onNavigateToDetails,
}) => {
  // Get the device icon based on type and state
  const deviceIcon = getDeviceIcon(type, isActive);
  
  // Get the status text based on device type and state
  const statusText = getStatusText(type, isActive);
  
  // Handle the press event
  const handlePress = () => {
    onNavigateToDetails(id);
  };

  // Pass data down to the presentational component
  return (
    <DeviceCardUI
      id={id}
      name={name}
      type={type}
      description={description}
      isActive={isActive}
      statusText={statusText}
      deviceIcon={deviceIcon}
      onPress={handlePress}
    />
  );
};

export default DeviceCard;