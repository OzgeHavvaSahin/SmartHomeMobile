// components/HouseList.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddHomeButton from './AddHomeButton';
import RoommateList from './RommateList';



interface NewHouse {
  name: string;
  address: string;
}

// Props for the HouseList component
interface HouseListProps {
  houses: House[];
  onAddHouse?: (house: NewHouse) => void;
}

export default function HouseList({ houses, onAddHouse }: HouseListProps) {
  const handleAddHouse = (newHouse: NewHouse) => {
    if (onAddHouse) {
      onAddHouse(newHouse);
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
          
          {/* Roommate Component */}
          <RoommateList roommates={house.roommates || []} />
        </View>
      ))}
      
      {/* Use the new AddHomeButton component */}
      <AddHomeButton onAddHouse={handleAddHouse} />
    </View>
  );
}

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