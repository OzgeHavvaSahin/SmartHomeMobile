// src/components/HomeContent/HomeContent.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useHome } from '../../context/HomeContext';

const HomeContent: React.FC = () => {
  const { homes, selectedHomeId, loading } = useHome();
  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }
  
  if (!selectedHomeId) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Lütfen bir ev seçin</Text>
      </View>
    );
  }
  
  const selectedHome = homes.find(home => home.id === selectedHomeId);
  
  if (!selectedHome) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Seçilen ev bulunamadı</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.homeNameText}>{selectedHome.name || 'İsimsiz Ev'}</Text>
      <Text style={styles.homeInfoText}>Ev ID: {selectedHome.id}</Text>
      <Text style={styles.homeInfoText}>Sahip ID: {selectedHome.ownerId}</Text>
      
      {/* Here you would display more home content, devices, etc. */}
      <Text style={styles.sectionTitle}>Cihazlar</Text>
      <Text style={styles.infoText}>Bu evde henüz cihaz bulunmuyor.</Text>
    </View>
  );
};

export default HomeContent;
// src/components/HomeContent/styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 8,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  homeNameText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  homeInfoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
});