import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { HomeProvider } from '@/src/context/HomeContext';
import HomeSelectorContainer from '@/src/components/HomeSelector/HomeSelector';
import { useAuth } from '@/src/context/AuthContext'; // 👈 import the auth hook

export default function HomeScreen() {
  const { authState } = useAuth(); // 👈 get user from authState
  const ownerId = authState.user?.id; // 👈 extract id safely

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {ownerId && ( // 👈 render only when ownerId is available
          <HomeProvider ownerId={ownerId}>
            <HomeSelectorContainer />
          </HomeProvider>
        )}
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