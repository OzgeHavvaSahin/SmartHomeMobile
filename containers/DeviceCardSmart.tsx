import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import DeviceCard from '../components/DeviceCard';

// Example device type
interface Device {
  id: string;
  name: string;
  description: string;
  image: any; 
  isActive: boolean;
}

const DeviceListContainer: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Living Room Light',
      description: 'Phillips Hue Smart Bulb',
      image: require('../assets/images/table-lamp.png'), 
      isActive: true,
    },
    {
      id: '2',
      name: 'Front Door Camera',
      description: 'Ring Doorbell Pro',
      image: require('../assets/images/camera.png'),
      isActive: true,
    },
  ]);

  // Toggle device active state
  const toggleDeviceStatus = (deviceId: string) => {
    setDevices(
      devices.map(device =>
        device.id === deviceId
          ? { ...device, isActive: !device.isActive }
          : device
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Devices</Text>
      
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DeviceCard
            name={item.name}
            description={item.description}
            image={item.image}
            isActive={item.isActive}
            onPress={() => toggleDeviceStatus(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    color: '#333333',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default DeviceListContainer;