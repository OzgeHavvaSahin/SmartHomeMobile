// components/DeviceCard/DeviceCardUI.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './DeviceCard.styles';
import { DeviceCardUIProps } from '@/src/types/device.types';

// This is the "dumb" presentational component that only handles rendering
const DeviceCardUI: React.FC<DeviceCardUIProps> = ({
  name,
  description,
  isActive,
  statusText,
  deviceIcon,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <Image source={deviceIcon} style={styles.deviceIcon} />
      </View>
      
      <View style={styles.middleSection}>
        <Text style={styles.deviceName}>{name}</Text>
        <Text style={styles.deviceDescription}>{description}</Text>
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusIndicator, 
            isActive ? styles.activeIndicator : styles.inactiveIndicator
          ]} />
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <Ionicons name="chevron-forward" size={24} color="#888" />
      </View>
    </TouchableOpacity>
  );
};

export default DeviceCardUI;