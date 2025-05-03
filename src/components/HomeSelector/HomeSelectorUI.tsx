// src/components/HomeSelector/HomeSelector.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { styles } from './HomeSelector.styles';
import { Home } from '../../interfaces/components';

interface HomeSelectorProps {
  homes: Home[];
  selectedHomeId: number | null;
  onHomeSelect: (homeId: number) => void;
  isLoading: boolean;
  error: string | null;
}

const HomeSelector: React.FC<HomeSelectorProps> = ({
  homes,
  selectedHomeId,
  onHomeSelect,
  isLoading,
  error
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const selectedHome = homes.find(home => home.id === selectedHomeId);
  const selectedHomeName = selectedHome ? (selectedHome.name || 'İsimsiz Ev') : 'Ev Seçin';
  console.log(error)
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Evler yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (homes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noHomesText}>Henüz ev eklenmemiş</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* Dropdown button */}
      <TouchableOpacity 
        style={styles.dropdownButton} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>{selectedHomeName}</Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      {/* Dropdown modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={homes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    selectedHomeId === item.id && styles.selectedItem
                  ]}
                  onPress={() => {
                    onHomeSelect(item.id);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>
                    {item.name || 'İsimsiz Ev'}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HomeSelector;