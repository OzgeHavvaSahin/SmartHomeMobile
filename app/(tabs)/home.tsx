// src/screens/HomeScreen.tsx
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { HomeProvider } from '@/src/context/HomeContext';
import HomeSelectorContainer from '@/src/components/HomeSelector/HomeSelector';
import HomeContent from '@/src/components/HomeContent/HomeContent';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Akıllı Ev Kontrol Paneli</Text>
        
        <HomeProvider>
          <HomeSelectorContainer />
          <HomeContent />
        </HomeProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

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