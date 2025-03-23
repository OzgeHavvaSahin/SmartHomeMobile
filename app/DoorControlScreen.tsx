// src/screens/DoorControlScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// For type checking with React Navigation
type DoorControlProps = {
  route?: {
    params: {
      deviceId: string;
      deviceName: string;
      isOpen: boolean;
    }
  };
  navigation?: any;
};

const DoorControlScreen: React.FC<DoorControlProps> = ({ route, navigation }) => {
  // If we don't receive route params, use these defaults
  const defaultParams = {
    deviceId: '1',
    deviceName: 'Ana Giriş Kapısı',
    isOpen: false
  };
  
  // Use params from navigation or defaults
  const params = route?.params || defaultParams;
  
  // State to track door status
  const [isOpen, setIsOpen] = useState(params.isOpen);
  const [lastToggled, setLastToggled] = useState<Date | null>(null);

  // Toggle door status
  const toggleDoor = () => {
    setIsOpen(!isOpen);
    setLastToggled(new Date());
  };

  // Format last toggled time
  const formatTime = (date: Date | null) => {
    if (!date) return 'Henüz değişiklik yok';
    
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Go back to previous screen
  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Go back pressed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kapı Kontrolü</Text>
        <View style={styles.placeholderRight} />
      </View>
      
      {/* Device name */}
      <Text style={styles.deviceName}>{params.deviceName}</Text>
      
      {/* Status visualization */}
      <View style={styles.statusContainer}>
        <Image 
          source={isOpen 
            ? require('../assets/images/door-open.png') 
            : require('../assets/images/door-closed.png')} 
          style={styles.doorImage} 
        />
        <Text style={[
          styles.statusText, 
          isOpen ? styles.openText : styles.closedText
        ]}>
          {isOpen ? 'Kapı Açık' : 'Kapı Kapalı'}
        </Text>
      </View>
      
      {/* Status details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Durum:</Text>
          <View style={styles.statusIndicatorContainer}>
            <View style={[
              styles.statusIndicator, 
              isOpen ? styles.openIndicator : styles.closedIndicator
            ]} />
            <Text style={styles.detailValue}>
              {isOpen ? 'Açık' : 'Kapalı'}
            </Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Cihaz ID:</Text>
          <Text style={styles.detailValue}>{params.deviceId}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Son Değişiklik:</Text>
          <Text style={styles.detailValue}>{formatTime(lastToggled)}</Text>
        </View>
      </View>
      
      {/* Toggle button */}
      <TouchableOpacity 
        style={[styles.toggleButton, isOpen ? styles.closeButton : styles.openButton]} 
        onPress={toggleDoor}
      >
        <Text style={styles.toggleButtonText}>
          {isOpen ? 'Kapıyı Kapat' : 'Kapıyı Aç'}
        </Text>
      </TouchableOpacity>
      
      {/* Security warning when door is open */}
      {isOpen && (
        <View style={styles.warningContainer}>
          <Ionicons name="warning" size={20} color="#FFA500" />
          <Text style={styles.warningText}>
            Açık kapılar güvenlik riski oluşturabilir. Evin güvenliğinden emin olun.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholderRight: {
    width: 40, // Same width as back button for centering
  },
  deviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
    color: '#333',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  doorImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  openText: {
    color: '#F44336',
  },
  closedText: {
    color: '#4CAF50',
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  statusIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  openIndicator: {
    backgroundColor: '#F44336', // red for open (potentially unsafe)
  },
  closedIndicator: {
    backgroundColor: '#4CAF50', // green for closed (safe)
  },
  toggleButton: {
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButton: {
    backgroundColor: '#F44336', // red
  },
  closeButton: {
    backgroundColor: '#4CAF50', // green
  },
  toggleButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFA500',
  },
  warningText: {
    marginLeft: 8,
    color: '#7D6608',
    fontSize: 14,
  },
});

export default DoorControlScreen;