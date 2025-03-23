// src/components/DeviceCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';

// Define the props interface for the DeviceCard component
interface DeviceCardProps {
  image: ImageSourcePropType;
  name: string;
  description: string;
  onPress?: () => void;
  isActive?: boolean;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  image,
  name,
  description,
  onPress,
  isActive = false,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.card, isActive && styles.activeCard]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={image} style={styles.deviceImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.deviceName}>{name}</Text>
        <Text style={styles.deviceDescription}>{description}</Text>
      </View>
      <View style={[styles.statusIndicator, isActive ? styles.activeIndicator : styles.inactiveIndicator]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
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
  activeCard: {
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  deviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 16,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  deviceDescription: {
    fontSize: 14,
    color: '#666666',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  activeIndicator: {
    backgroundColor: '#4CAF50',
  },
  inactiveIndicator: {
    backgroundColor: '#BDBDBD',
  },
});

export default DeviceCard;