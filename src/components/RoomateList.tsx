// components/RoommateList.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddRoommateButton from './AddRoomateButton';

// Define the interface for Roommate
interface Roommate {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}

// Interface for a new roommate
interface NewRoommate {
  name: string;
  email: string;
}

// Props for the RoommateList component
interface RoommateListProps {
  houseId: string;
  roommates: Roommate[];
  onAddRoommate: (houseId: string, roommate: NewRoommate) => Promise<boolean>;
  isLoading?: boolean;
}

export default function RoommateList({ 
  houseId, 
  roommates, 
  onAddRoommate,
  isLoading = false 
}: RoommateListProps) {
  
  const handleAddRoommate = async (houseId: string, newRoommate: NewRoommate): Promise<boolean> => {
    try {
      return await onAddRoommate(houseId, newRoommate);
    } catch (error) {
      console.error('Error in handleAddRoommate:', error);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      {roommates.length > 0 ? (
        <>
          <Text style={styles.roommatesTitle}>Ev Arkadaşları</Text>
          
          {roommates.map(roommate => (
            <View key={roommate.id} style={styles.roommateRow}>
              <Image
                source={{ uri: roommate.photoUrl }}
                style={styles.roommatePhoto}
              />
              <View style={styles.roommateInfo}>
                <Text style={styles.roommateName}>{roommate.name}</Text>
                <Text style={styles.roommateEmail}>{roommate.email}</Text>
              </View>
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.emptyRoommates}>Bu evde henüz ev arkadaşı yok.</Text>
      )}
      
      <AddRoommateButton 
        houseId={houseId}
        onAddRoommate={handleAddRoommate}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  roommatesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#555',
  },
  roommateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  roommatePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  roommateInfo: {
    flex: 1,
  },
  roommateName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  roommateEmail: {
    fontSize: 12,
    color: '#999',
  },
  emptyRoommates: {
    fontStyle: 'italic',
    color: '#999',
    marginBottom: 16,
  },
});