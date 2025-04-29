import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define device types
export type DeviceType = 'light' | 'doorSensor' | 'windowSensor' | 'camera';

// Define the props interface for the DeviceCard component
interface DeviceCardProps {
  id: string;
  name: string;
  type: DeviceType;
  description: string;
  isActive: boolean;
  onNavigateToDetails: (deviceId: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  id,
  name,
  type,
  description,
  isActive,
  onNavigateToDetails,
}) => {
  // Get appropriate icon based on device type
  const getDeviceIcon = () => {
    switch (type) {
      case 'light':
        return isActive 
          ? require('../assets/images/light.png')
          : require('../assets/images/light.png');
      case 'doorSensor':
        return isActive 
          ? require('../assets/images/door-closed.png')
          : require('../assets/images/door-open.png');
      case 'windowSensor':
        return isActive 
          ? require('../assets/images/window-closed.png')
          : require('../assets/images/window-open.png');
      case 'camera':
        return isActive 
          ? require('../assets/images/camera.png')
          : require('../assets/images/camera.png');
      default:
        return require('../assets/images/robot.png');
    }
  };

  // Get status text based on device type and state
  const getStatusText = () => {
    switch (type) {
      case 'light':
        return isActive ? 'Açık' : 'Kapalı';
      case 'doorSensor':
        return isActive ? 'Kapalı' : 'Açık'; // Note the reversal for sensors
      case 'windowSensor':
        return isActive ? 'Kapalı' : 'Açık'; // Note the reversal for sensors
      case 'camera':
        return isActive ? 'Aktif' : 'Pasif';
      default:
        return isActive ? 'Açık' : 'Kapalı';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onNavigateToDetails(id)}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <Image source={getDeviceIcon()} style={styles.deviceIcon} />
      </View>
      
      <View style={styles.middleSection}>
        <Text style={styles.deviceName}>{name}</Text>
        <Text style={styles.deviceDescription}>{description}</Text>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusIndicator, 
            isActive ? styles.activeIndicator : styles.inactiveIndicator
          ]} />
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <Ionicons name="chevron-forward" size={24} color="#888" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  leftSection: {
    marginRight: 12,
  },
  middleSection: {
    flex: 1,
  },
  rightSection: {
    padding: 8,
  },
  deviceIcon: {
    width: 40,
    height: 40,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  deviceDescription: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  activeIndicator: {
    backgroundColor: '#4CAF50',
  },
  inactiveIndicator: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 12,
    color: '#888888',
  },
});

export default DeviceCard;