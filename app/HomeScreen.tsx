import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Room from "../components/Room";

// Define the interfaces for our data structure
interface Device {
  id: string;
  name: string;
  description: string;
  image: any;
  isActive: boolean;
  roomId: string;
}

interface Room {
  id: string;
  name: string;
}

const HomeScreen: React.FC = () => {
  // State for rooms and devices
  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", name: "Oturma Odası" },
    { id: "2", name: "Mutfak" },
    { id: "3", name: "Yatak Odası" },
    { id: "4", name: "Banyo" },
  ]);

  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Ana Lamba",
      description: "Phillips Hue Akıllı Ampül",
      image: require("../assets/images/table-lamp.png"), // Ensure these images exist
      isActive: true,
      roomId: "1", // Oturma Odası
    },
    {
      id: "2",
      name: "TV",
      description: "Samsung Smart TV",
      image: require("../assets/images/robot.png"),
      isActive: false,
      roomId: "1", // Oturma Odası
    },
    {
      id: "3",
      name: "Buzdolabı",
      description: "LG Smart Refrigerator",
      image: require("../assets/images/robot.png"),
      isActive: true,
      roomId: "2", // Mutfak
    },
    {
      id: "4",
      name: "Mikrodalga",
      description: "Arçelik Akıllı Mikrodalga",
      image: require("../assets/images/robot.png"),
      isActive: false,
      roomId: "2", // Mutfak
    },
    {
      id: "5",
      name: "Gece Lambası",
      description: "Xiaomi Bedside Lamp",
      image: require("../assets/images/robot.png"),
      isActive: true,
      roomId: "3", // Yatak Odası
    },
  ]);

  // Toggle device active status
  const handleToggleDevice = (deviceId: string) => {
    setDevices(
      devices.map((device) =>
        device.id === deviceId
          ? { ...device, isActive: !device.isActive }
          : device
      )
    );
  };

  // Add a new device to a room (this would normally open a form)
  const handleAddDevice = (roomId: string) => {
    // For this example, we'll just log - in a real app, you might
    // navigate to a form or open a modal
    console.log(`Adding device to room with ID: ${roomId}`);
    alert(`Bu özellik henüz hazır değil. Oda ID: ${roomId}`);
  };

  // Get devices for a specific room
  const getDevicesForRoom = (roomId: string) => {
    return devices.filter((device) => device.roomId === roomId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Akıllı Ev Kontrol Paneli</Text>
      
      <ScrollView>
        {rooms.map((room) => (
          <Room
            key={room.id}
            name={room.name}
            devices={getDevicesForRoom(room.id)}
            onAddDevice={() => handleAddDevice(room.id)}
            onToggleDevice={handleToggleDevice}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default HomeScreen;