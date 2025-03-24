// app/(tabs)/profile.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the interfaces for our data structure



export default function ProfileScreen() {
  // Mock user data - in a real app, this would come from your auth/API system
  const [user] = useState<User>({
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    houses: [
      {
        id: '1',
        name: 'Ana Ev',
        address: 'İstanbul, Kadıköy',
        roommates: [
          {
            id: '2',
            name: 'Ayşe Kaya',
            email: 'ayse.kaya@example.com',
            photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          {
            id: '3',
            name: 'Mehmet Demir',
            email: 'mehmet.demir@example.com',
            photoUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
          }
        ]
      },
      {
        id: '2',
        name: 'Yazlık Ev',
        address: 'Muğla, Bodrum',
        roommates: [
          {
            id: '4',
            name: 'Zeynep Şahin',
            email: 'zeynep.sahin@example.com',
            photoUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
          }
        ]
      },
      {
        id: '3',
        name: 'Ofis',
        address: 'İstanbul, Levent',
        roommates: []
      }
    ]
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user.photoUrl }}
            style={styles.profilePhoto}
          />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
        
        {/* Houses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evlerim</Text>
          
          {user.houses.map(house => (
            <View key={house.id} style={styles.houseCard}>
              <View style={styles.houseHeader}>
                <Text style={styles.houseName}>{house.name}</Text>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="settings-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.houseAddress}>{house.address}</Text>
              
              {/* Roommates Section */}
              {house.roommates!.length > 0 && (
                <View style={styles.roommatesSection}>
                  <Text style={styles.roommatesTitle}>Ev Arkadaşları</Text>
                  
                  {house.roommates!.map(roommate => (
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
                </View>
              )}
              
              {house.roommates!.length === 0 && (
                <Text style={styles.emptyRoommates}>Bu evde henüz ev arkadaşı yok.</Text>
              )}
              
              <TouchableOpacity style={styles.inviteButton}>
                <Ionicons name="person-add-outline" size={16} color="#fff" style={styles.inviteIcon} />
                <Text style={styles.inviteButtonText}>Ev Arkadaşı Ekle</Text>
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity style={styles.addHouseButton}>
            <Ionicons name="add-circle-outline" size={20} color="#4CAF50" style={styles.addIcon} />
            <Text style={styles.addHouseButtonText}>Yeni Ev Ekle</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
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
  },
  roommatesSection: {
    marginTop: 12,
    marginBottom: 16,
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
  },
  inviteIcon: {
    marginRight: 8,
  },
  inviteButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  addHouseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addIcon: {
    marginRight: 8,
  },
  addHouseButtonText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '500',
  },
});