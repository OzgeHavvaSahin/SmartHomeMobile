import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { styles } from "./RoomList.styles";
import { DeviceType } from "@/src/interfaces/components";
import DeviceCard from "../DeviceCard/DeviceCard";

// Define the Device interface
export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  description: string;
  isActive: boolean;
  roomId: string;
}

interface RoomListUIProps {
  name: string;
  devices: Device[];
  onAddDevice: () => void;
  onNavigateToDeviceDetails: (deviceId: number) => void;
}

const RoomListUI: React.FC<RoomListUIProps> = ({ 
  name, 
  devices, 
  onAddDevice, 
  onNavigateToDeviceDetails
}) => {
  return (
    <View style={styles.container}>
      {/* Room Title */}
      <Text style={styles.title}>{name}</Text>

      {/* Devices List */}
      {devices.length === 0 ? (
        <Text style={styles.emptyMessage}>Bu odada henüz cihaz yok.</Text>
      ) : (
        <View style={styles.devicesList}>
          <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DeviceCard
                id={item.id}
                name={item.name}
                type={item.type}
                description={item.description}
                isActive={item.isActive}
                onNavigateToDetails={onNavigateToDeviceDetails}
              />
            )}
            scrollEnabled={false} // Prevents nested scrolling issues
          />
        </View>
      )}

      {/* Add Device Button */}
      <Button title="Cihaz Ekle" onPress={onAddDevice} />
    </View>
  );
};

export default RoomListUI;