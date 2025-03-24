// components/HouseList.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddHomeButton from './AddHomeButton';
import RoommateList from './RoomateList';

// Define interfaces
interface Roommate {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}

interface NewRoommate {
  name: string;
  email: string;
}

interface House {
  id: string;
  name: string;
  address: string;
  roommates: Roommate[];
}

interface NewHouse {
  name: string;
  address: string;
}

// Props for the HouseList component
interface HouseListProps {
  houses: House[];
  onAddHouse: (house: NewHouse) => Promise<boolean>;
  onAddRoommate: (houseId: string, roommate: NewRoommate) => Promise<boolean>;
  isLoading?: boolean;
}

export default function HouseList({ 
  houses, 
  onAddHouse, 
  onAddRoommate,
  isLoading = false 
}: HouseListProps) {
  
  const handleAddHouse = async (newHouse: NewHouse): Promise<boolean> => {
    try {
      return await onAddHouse(newHouse);
    } catch (error) {
      console.error('Error in handleAddHouse:', error);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Evlerim</Text>
      
      {houses.map(house => (
        <View key={house.id} style={styles.houseCard}>
          <View style={styles.houseHeader}>
            <Text style={styles.houseName}>{house.name}</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="settings-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.houseAddress}>{house.address}</Text>
          
          {/* Roommate Component with add functionality */}
          <RoommateList 
            houseId={house.id}
            roommates={house.roommates || []} 
            onAddRoommate={onAddRoommate}
            isLoading={isLoading}
          />
        </View>
      ))}
      
      {/* Use the AddHomeButton with async handling */}
      <AddHomeButton 
        onAddHouse={handleAddHouse} 
        disabled={isLoading}
      />
    </View>
  );
}

// Same styles as before

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  houseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  houseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  houseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButton: {
    padding: 4,
  },
  houseAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  }
});