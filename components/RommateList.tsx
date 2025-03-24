// components/RoommateList.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



// Props for the RoommateList component
interface RoommateListProps {
  roommates: Roommate[];
}

export default function RoommateList({ roommates }: RoommateListProps) {
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
      
      <TouchableOpacity style={styles.inviteButton}>
        <Ionicons name="person-add-outline" size={16} color="#fff" style={styles.inviteIcon} />
        <Text style={styles.inviteButtonText}>Ev Arkadaşı Ekle</Text>
      </TouchableOpacity>
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
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  inviteIcon: {
    marginRight: 8,
  },
  inviteButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});