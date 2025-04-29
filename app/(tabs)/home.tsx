import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { authState, logout } = useAuth();
  const { user } = authState;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Akıllı Ev Kontrol Paneli</Text>
        <Text style={styles.subtitle}>
          Hoş geldiniz, {user?.name || user?.email || 'Kullanıcı'}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="thermometer-outline" size={24} color="#4CAF50" />
            <Text style={styles.cardTitle}>Sıcaklık</Text>
          </View>
          <Text style={styles.cardValue}>24°C</Text>
          <View style={styles.cardControls}>
            <TouchableOpacity style={styles.cardButton}>
              <Ionicons name="remove-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton}>
              <Ionicons name="add-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="bulb-outline" size={24} color="#4CAF50" />
            <Text style={styles.cardTitle}>Işıklar</Text>
          </View>
          <View style={styles.switchContainer}>
            <TouchableOpacity style={styles.switch}>
              <Text style={styles.switchText}>Salon</Text>
              <View style={[styles.switchIndicator, styles.switchOn]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.switch}>
              <Text style={styles.switchText}>Mutfak</Text>
              <View style={[styles.switchIndicator, styles.switchOff]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.switch}>
              <Text style={styles.switchText}>Yatak Odası</Text>
              <View style={[styles.switchIndicator, styles.switchOn]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  cardControls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  switchContainer: {
    marginTop: 8,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  switchText: {
    fontSize: 16,
    color: '#333',
  },
  switchIndicator: {
    width: 40,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  switchOn: {
    backgroundColor: '#4CAF50',
  },
  switchOff: {
    backgroundColor: '#e0e0e0',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF5252',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
// import React, { useState } from "react";
// import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, FlatList } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import Room from "../../src/components/Room";
// import { DeviceType } from "../../src/components/DeviceCard";

// // Define the interfaces for our data structure
// interface Device {
//   id: string;
//   name: string;
//   type: DeviceType;
//   description: string;
//   isActive: boolean;
//   roomId: string;
// }


// export default function HomeScreen() {
//   // State for houses, rooms, devices, and selected house
//   const [houses, setHouses] = useState<House[]>([
//     { id: "1", name: "Ana Ev", address: "İstanbul, Kadıköy" },
//     { id: "2", name: "Yazlık Ev", address: "Muğla, Bodrum" },
//     { id: "3", name: "Ofis", address: "İstanbul, Levent" },
//   ]);

//   const [selectedHouse, setSelectedHouse] = useState<House>(houses[0]);
//   const [showHouseSelector, setShowHouseSelector] = useState(false);

//   const [rooms, setRooms] = useState<Room[]>([
//     { id: "1", name: "Oturma Odası", houseId: "1" },
//     { id: "2", name: "Mutfak", houseId: "1" },
//     { id: "3", name: "Yatak Odası", houseId: "1" },
//     { id: "4", name: "Banyo", houseId: "1" },
//     { id: "5", name: "Balkon", houseId: "2" },
//     { id: "6", name: "Salon", houseId: "2" },
//     { id: "7", name: "Oturma Alanı", houseId: "3" },
//     { id: "8", name: "Mutfak", houseId: "3" },
//   ]);

//   const [devices, setDevices] = useState<Device[]>([
//     {
//       id: "1",
//       name: "Ana Lamba",
//       type: "light",
//       description: "Phillips Hue Akıllı Ampül",
//       isActive: true,
//       roomId: "1", // Oturma Odası in Ana Ev
//     },
//     {
//       id: "2",
//       name: "Kapı Sensörü",
//       type: "doorSensor",
//       description: "Ana Giriş Kapısı",
//       isActive: true, // true means closed for sensors
//       roomId: "1", // Oturma Odası in Ana Ev
//     },
//     {
//       id: "3",
//       name: "Pencere Sensörü",
//       type: "windowSensor",
//       description: "Balkon Penceresi",
//       isActive: false, // false means open for sensors
//       roomId: "1", // Oturma Odası in Ana Ev
//     },
//     {
//       id: "4",
//       name: "Güvenlik Kamerası",
//       type: "camera",
//       description: "Salon Köşe Kamera",
//       isActive: true,
//       roomId: "1", // Oturma Odası in Ana Ev
//     },
//     {
//       id: "5",
//       name: "Mutfak Lambası",
//       type: "light",
//       description: "Xiaomi Akıllı Ampül",
//       isActive: false,
//       roomId: "2", // Mutfak in Ana Ev
//     },
//     {
//       id: "6",
//       name: "Arka Kapı Sensörü",
//       type: "doorSensor",
//       description: "Mutfak Arka Kapı",
//       isActive: true,
//       roomId: "2", // Mutfak in Ana Ev
//     },
//     {
//       id: "7",
//       name: "Yatak Odası Lambası",
//       type: "light",
//       description: "IKEA Trådfri",
//       isActive: false,
//       roomId: "3", // Yatak Odası in Ana Ev
//     },
//     {
//       id: "8",
//       name: "Yazlık Kamera",
//       type: "camera",
//       description: "Dış Mekan Kamerası",
//       isActive: true,
//       roomId: "5", // Balkon in Yazlık Ev
//     },
//   ]);

//   // Navigate to appropriate device details screen based on device type
//   const handleNavigateToDeviceDetails = (deviceId: string) => {
//     // Find the device to get its info
//     const device = devices.find(d => d.id === deviceId);
    
//     if (device) {
//       switch (device.type) {
//         case 'light':
//           router.push({
//             pathname: '/deviceScreens/LightControlScreen',
//             params: { 
//               id: device.id,
//               name: device.name,
//               isOn: device.isActive.toString(),
//               color: 'yellow' // Default color or get from device data if available
//             }
//           });
//           break;
          
//         case 'doorSensor':
//           router.push({
//             pathname: '/deviceScreens/DoorControlScreen',
//             params: { 
//               id: device.id,
//               name: device.name,
//               isOpen: (!device.isActive).toString() // For sensors, isActive=true means closed
//             }
//           });
//           break;
          
//         case 'windowSensor':
//           router.push({
//             pathname: '/deviceScreens/WindowControlScreen',
//             params: { 
//               id: device.id,
//               name: device.name,
//               isOpen: (!device.isActive).toString() // For sensors, isActive=true means closed
//             }
//           });
//           break;
          
//         // case 'camera':
//         //   router.push({
//         //     pathname: '/(devices)/camera',
//         //     params: { 
//         //       id: device.id,
//         //       name: device.name,
//         //       isActive: device.isActive.toString()
//         //     }
//         //   });
//         //   break;
          
//         default:
//           console.warn(`No specific screen for device type: ${device.type}`);
//       }
//     }
//   };

//   // Add a new device to a room (this would normally open a form)
//   const handleAddDevice = (roomId: string) => {
//     console.log(`Adding device to room with ID: ${roomId}`);
//     alert(`Bu özellik henüz hazır değil. Oda ID: ${roomId}`);
//   };

//   // Select a house
//   const handleSelectHouse = (house: House) => {
//     setSelectedHouse(house);
//     setShowHouseSelector(false);
//   };

//   // Get rooms for the selected house
//   const getRoomsForSelectedHouse = () => {
//     return rooms.filter((room) => room.houseId === selectedHouse.id);
//   };

//   // Get devices for a specific room
//   const getDevicesForRoom = (roomId: string) => {
//     return devices.filter((device) => device.roomId === roomId);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* House Selector */}
//       <TouchableOpacity 
//         style={styles.houseSelectorButton}
//         onPress={() => setShowHouseSelector(true)}
//       >
//         <Text style={styles.selectedHouseName}>{selectedHouse.name}</Text>
//         <Ionicons name="chevron-down" size={24} color="#333" />
//       </TouchableOpacity>
//       <Text style={styles.selectedHouseAddress}>{selectedHouse.address}</Text>
      
//       <Text style={styles.header}>Akıllı Ev Kontrol Paneli</Text>
      
//       <ScrollView>
//         {getRoomsForSelectedHouse().map((room) => (
//           <Room
//             key={room.id}
//             name={room.name}
//             devices={getDevicesForRoom(room.id)}
//             onAddDevice={() => handleAddDevice(room.id)}
//             onNavigateToDeviceDetails={handleNavigateToDeviceDetails}
//           />
//         ))}
        
//         {getRoomsForSelectedHouse().length === 0 && (
//           <Text style={styles.emptyMessage}>
//             Bu evde henüz oda eklenmemiş. Lütfen önce bir oda ekleyin.
//           </Text>
//         )}
//       </ScrollView>

//       {/* House Selection Modal */}
//       <Modal
//         visible={showHouseSelector}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setShowHouseSelector(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Ev Seçin</Text>
            
//             <FlatList
//               data={houses}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.houseItem,
//                     selectedHouse.id === item.id && styles.selectedHouseItem
//                   ]}
//                   onPress={() => handleSelectHouse(item)}
//                 >
//                   <Text style={styles.houseName}>{item.name}</Text>
//                   <Text style={styles.houseAddress}>{item.address}</Text>
                  
//                   {selectedHouse.id === item.id && (
//                     <Ionicons name="checkmark-circle" size={24} color="#4CAF50" style={styles.checkIcon} />
//                   )}
//                 </TouchableOpacity>
//               )}
//             />
            
//             <TouchableOpacity 
//               style={styles.closeButton}
//               onPress={() => setShowHouseSelector(false)}
//             >
//               <Text style={styles.closeButtonText}>Kapat</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   houseSelectorButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     marginBottom: 4,
//   },
//   selectedHouseName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     marginRight: 8,
//   },
//   selectedHouseAddress: {
//     fontSize: 14,
//     color: "#666",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   emptyMessage: {
//     fontSize: 16,
//     fontStyle: "italic",
//     color: "#888",
//     textAlign: "center",
//     marginTop: 32,
//   },
//   // Modal styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     width: "85%",
//     backgroundColor: "white",
//     borderRadius: 16,
//     padding: 20,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   houseItem: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   selectedHouseItem: {
//     backgroundColor: "#f0f8ff",
//   },
//   houseName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     flex: 1,
//   },
//   houseAddress: {
//     fontSize: 14,
//     color: "#666",
//     flex: 2,
//   },
//   checkIcon: {
//     marginLeft: 8,
//   },
//   closeButton: {
//     marginTop: 20,
//     backgroundColor: "#f0f0f0",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   closeButtonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
// });