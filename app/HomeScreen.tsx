import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, FlatList } from "react-native";
import Room from "../components/Room";
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo-vector-icons


const HomeScreen: React.FC = () => {
  // State for houses, rooms, devices, and selected house
  const [houses, setHouses] = useState<House[]>([
    { id: "1", name: "Ana Ev", address: "İstanbul, Kadıköy" },
    { id: "2", name: "Yazlık Ev", address: "Muğla, Bodrum" },
    { id: "3", name: "Ofis", address: "İstanbul, Levent" },
  ]);

  const [selectedHouse, setSelectedHouse] = useState<House>(houses[0]);
  const [showHouseSelector, setShowHouseSelector] = useState(false);

  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", name: "Oturma Odası", houseId: "1" },
    { id: "2", name: "Mutfak", houseId: "1" },
    { id: "3", name: "Yatak Odası", houseId: "1" },
    { id: "4", name: "Banyo", houseId: "1" },
    { id: "5", name: "Balkon", houseId: "2" },
    { id: "6", name: "Salon", houseId: "2" },
    { id: "7", name: "Oturma Alanı", houseId: "3" },
    { id: "8", name: "Mutfak", houseId: "3" },
  ]);

  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Ana Lamba",
      description: "Phillips Hue Akıllı Ampül",
      image: require("../assets/images/robot.png"), // Ensure these images exist
      isActive: true,
      roomId: "1", // Oturma Odası in Ana Ev
    },
    {
      id: "2",
      name: "TV",
      description: "Samsung Smart TV",
      image: require("../assets/images/robot.png"),
      isActive: false,
      roomId: "1", // Oturma Odası in Ana Ev
    },
    {
      id: "3",
      name: "Buzdolabı",
      description: "LG Smart Refrigerator",
      image: require("../assets/images/robot.png"),
      isActive: true,
      roomId: "2", // Mutfak in Ana Ev
    },
    {
      id: "4",
      name: "Klima",
      description: "Arçelik Inverter Klima",
      image: require("../assets/images/robot.png"),
      isActive: true,
      roomId: "5", // Balkon in Yazlık Ev
    },
    {
      id: "5",
      name: "Tavan Vantilatörü",
      description: "Smart Fan",
      image: require("../assets/images/robot.png"),
      isActive: false,
      roomId: "6", // Salon in Yazlık Ev
    },
    {
      id: "6",
      name: "Projeksiyon",
      description: "Epson Projeksiyon",
      image: require("../assets/images/robot.png"),
      isActive: true,
      roomId: "7", // Oturma Alanı in Ofis
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
    console.log(`Adding device to room with ID: ${roomId}`);
    alert(`Bu özellik henüz hazır değil. Oda ID: ${roomId}`);
  };

  // Select a house
  const handleSelectHouse = (house: House) => {
    setSelectedHouse(house);
    setShowHouseSelector(false);
  };

  // Get rooms for the selected house
  const getRoomsForSelectedHouse = () => {
    return rooms.filter((room) => room.houseId === selectedHouse.id);
  };

  // Get devices for a specific room
  const getDevicesForRoom = (roomId: string) => {
    return devices.filter((device) => device.roomId === roomId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* House Selector */}
      <TouchableOpacity 
        style={styles.houseSelectorButton}
        onPress={() => setShowHouseSelector(true)}
      >
        <Text style={styles.selectedHouseName}>{selectedHouse.name}</Text>
        <Ionicons name="chevron-down" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.selectedHouseAddress}>{selectedHouse.address}</Text>
      
      <Text style={styles.header}>Akıllı Ev Kontrol Paneli</Text>
      
      <ScrollView>
        {getRoomsForSelectedHouse().map((room) => (
          <Room
            key={room.id}
            name={room.name}
            devices={getDevicesForRoom(room.id)}
            onAddDevice={() => handleAddDevice(room.id)}
            onToggleDevice={handleToggleDevice}
          />
        ))}
        
        {getRoomsForSelectedHouse().length === 0 && (
          <Text style={styles.emptyMessage}>
            Bu evde henüz oda eklenmemiş. Lütfen önce bir oda ekleyin.
          </Text>
        )}
      </ScrollView>

      {/* House Selection Modal */}
      <Modal
        visible={showHouseSelector}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowHouseSelector(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ev Seçin</Text>
            
            <FlatList
              data={houses}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.houseItem,
                    selectedHouse.id === item.id && styles.selectedHouseItem
                  ]}
                  onPress={() => handleSelectHouse(item)}
                >
                  <Text style={styles.houseName}>{item.name}</Text>
                  <Text style={styles.houseAddress}>{item.address}</Text>
                  
                  {selectedHouse.id === item.id && (
                    <Ionicons name="checkmark-circle" size={24} color="#4CAF50" style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              )}
            />
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowHouseSelector(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  houseSelectorButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginBottom: 4,
  },
  selectedHouseName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  selectedHouseAddress: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  emptyMessage: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
    marginTop: 32,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  houseItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  selectedHouseItem: {
    backgroundColor: "#f0f8ff",
  },
  houseName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  houseAddress: {
    fontSize: 14,
    color: "#666",
    flex: 2,
  },
  checkIcon: {
    marginLeft: 8,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;