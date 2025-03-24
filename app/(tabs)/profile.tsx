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
import HouseList from '../../components/HouseList';

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
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Profili Düzenle</Text>
          </TouchableOpacity>
        </View>
        
        {/* Houses Section as a Separate Component */}
        <HouseList houses={user.houses} />
        
        {/* Settings Section */}
        <View style={styles.section}>
      
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
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