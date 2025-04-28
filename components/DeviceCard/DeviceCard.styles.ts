// components/DeviceCard/DeviceCard.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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