import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { styles } from "./RoomList.styles";
import { DeviceType } from "@/src/interfaces/components";
import DeviceCard from "../DeviceCard/DeviceCard";

// Types
export interface Device {
  id: number;
  name: string;
  type: DeviceType;
  description: string;
  isActive: boolean;
  roomId: string;
}

export interface Room {
  id: number;
  name: string;
  devices: Device[];
}

interface RoomListUIProps {
  rooms: Room[];
  onAddDevice: (roomId: number) => void;
  onNavigateToDeviceDetails: (deviceId: number) => void;
}

const RoomListUI: React.FC<RoomListUIProps> = ({
  rooms,
  onAddDevice,
  onNavigateToDeviceDetails,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
  data={rooms}
  keyExtractor={(room) => room.id.toString()}
  renderItem={({ item: room }) => (
    <View style={styles.roomCard}>
      <Text style={styles.title}>{room.name}</Text>

      {room.devices.length === 0 ? (
        <Text style={styles.emptyMessage}>Bu odada henüz cihaz yok.</Text>
      ) : (
        <FlatList
          data={room.devices}
          keyExtractor={(device) => device.id.toString()}
          renderItem={({ item: device }) => (
            <DeviceCard
              id={device.id}
              name={device.name}
              type={device.type}
              description={device.description}
              isActive={device.isActive}
              onNavigateToDetails={onNavigateToDeviceDetails}
            />
          )}
          scrollEnabled={false}
        />
      )}

      <Button
        title="Cihaz Ekle"
        onPress={() => onAddDevice(room.id)}
      />
    </View>
  )}
/>

    </View>
  );
};

export default RoomListUI;
