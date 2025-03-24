// app/(tabs)/profile.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HouseList from '../../components/HouseList';



// Define the interfaces for our data structure
interface Roommate {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}

interface House {
  id: string;
  name: string;
  address: string;
  roommates: Roommate[];
}

interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  houses: House[];
}

// Mock API call to add a house
const apiAddHouse = async (userId: string, houseData: { name: string; address: string }): Promise<House> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Create a new house with a unique ID
  const newHouse: House = {
    id: String(Date.now()),
    name: houseData.name,
    address: houseData.address,
    roommates: []
  };
  
  // In a real app, this would be a fetch call to your API
  console.log(`Adding house ${newHouse.name} for user ${userId}`);
  
  // Return the created house (simulating API response)
  return newHouse;
};

export default function ProfileScreen() {
  // Mock user data
  const [user, setUser] = useState<User>({
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
  
  // Loading state
  const [isAddingHouse, setIsAddingHouse] = useState(false);

  // Asynchronous function to handle adding a new house
  const handleAddHouse = async (newHouse: { name: string; address: string }): Promise<boolean> => {
    try {
      // Set loading state
      setIsAddingHouse(true);
      
      // Call the API (mock)
      const addedHouse = await apiAddHouse(user.id, newHouse);
      
      // Update the user's houses list with the new house from API
      setUser(prevUser => ({
        ...prevUser,
        houses: [...prevUser.houses, addedHouse]
      }));
      
      console.log('House added successfully:', addedHouse);
      return true; // Success
    } catch (error) {
      console.error('Failed to add house:', error);
      return false; // Failure
    } finally {
      // Reset loading state
      setIsAddingHouse(false);
    }
  };

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
        
        {/* Houses Section with loading indicator */}
        {isAddingHouse && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Ev ekleniyor...</Text>
          </View>
        )}
        
        <HouseList 
          houses={user.houses} 
          onAddHouse={handleAddHouse}
          isLoading={isAddingHouse}
          onAddRoommate={(houseId, roommate) => {
            console.log(`Adding roommate ${roommate.name} to house ${houseId}`);
            return Promise.resolve(true);
          }}
        />
        
        {/* Rest of your component remains the same */}
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
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    margin: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  }
});