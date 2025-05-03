import React, { useEffect, useState } from "react";
import RoomListUI from "./RoomListUI";
import { fetchRoomDevices } from "../../api/RoomApi";
import { Device } from "./RoomListUI";

interface RoomProps {
  roomId: number;
  name: string;
  onAddDevice: () => void;
  onNavigateToDeviceDetails: (deviceId: number) => void; // Changed from string to number to match Device interface
}

const Room: React.FC<RoomProps> = ({ 
  roomId, 
  name, 
  onAddDevice, 
  onNavigateToDeviceDetails
}) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const roomDevices = await fetchRoomDevices(roomId);
        
        setDevices(roomDevices);
      } catch (err) {
        setError("Cihazlar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
        console.error("Error fetching devices:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDevices();
  }, [roomId]);

  // Adapter function to convert ID types if needed
  const handleNavigateToDeviceDetails = (deviceId: number) => {
    onNavigateToDeviceDetails(deviceId);
  };

  // Handle loading state
  if (isLoading) {
    return <RoomListUI name={name} devices={[]} onAddDevice={onAddDevice} onNavigateToDeviceDetails={handleNavigateToDeviceDetails} />;
  }

  // Handle error state
  if (error) {
    // You might want to add error handling UI here
    console.log(error);
  }

  return (
    <RoomListUI
      name={name}
      devices={devices}
      onAddDevice={onAddDevice}
      onNavigateToDeviceDetails={handleNavigateToDeviceDetails}
    />
  );
};

export default Room;