import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import DeviceCard from "./DeviceCard"; // Adjust the import path as needed

// Define the Device interface
interface Device {
  id: string;
  name: string;
  description: string;
  image: any; // For a real app, use a more specific type
  isActive: boolean;
}

// Update the Room props to include devices
interface RoomProps {
  name: string;
  devices: Device[];
  onAddDevice: () => void;
  onToggleDevice: (deviceId: string) => void;
}

const Room: React.FC<RoomProps> = ({ name, devices, onAddDevice, onToggleDevice }) => {
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
                name={item.name}
                description={item.description}
                image={item.image}
                isActive={item.isActive}
                onPress={() => onToggleDevice(item.id)}
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

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    elevation: 3, // Android shadow effect
    shadowColor: "#000", // iOS shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  devicesList: {
    marginBottom: 10,
  },
  emptyMessage: {
    fontStyle: "italic",
    color: "#888",
    marginBottom: 10,
    textAlign: "center",
  }
});

export default Room;