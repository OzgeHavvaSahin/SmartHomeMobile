import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { HomeProvider, useHome } from '@/src/context/HomeContext';
import HomeSelectorContainer from '@/src/components/HomeSelector/HomeSelector';
import { useAuth } from '@/src/context/AuthContext'; 
import RoomList from '@/src/components/RoomList/RoomList';

export default function HomeScreen() {
  const { authState } = useAuth();
  const ownerId = authState.user?.id; 

  const handleAddDevice = (roomId: number) => {
    console.log(`Adding device to room ${roomId}`);
  };

  const handleNavigateToDeviceDetails = (deviceId: number) => {
    console.log(`Navigating to device ${deviceId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {ownerId && ( 
          <HomeProvider ownerId={ownerId}>
            <HomeContent 
              ownerId={ownerId}
              onAddDevice={handleAddDevice}
              onNavigateToDeviceDetails={handleNavigateToDeviceDetails}
            />
          </HomeProvider>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface HomeContentProps {
  ownerId: number;
  onAddDevice: (roomId: number) => void;
  onNavigateToDeviceDetails: (deviceId: number) => void;
}
const HomeContent: React.FC<HomeContentProps> = ({ 
  ownerId, 
  onAddDevice, 
  onNavigateToDeviceDetails 
}) => {
  // Now useHome is used within the HomeProvider
  const { selectedHomeId } = useHome();
  
  return (
    <>
      <HomeSelectorContainer />
      {selectedHomeId && (
        <RoomList 
          ownerId={selectedHomeId}
          onAddDevice={onAddDevice}
          onNavigateToDeviceDetails={onNavigateToDeviceDetails}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});