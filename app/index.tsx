// app/index.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';

export default function Index() {
  const { authState, initialized } = useAuth();
  const { isAuthenticated, loading } = authState;
  const [canNavigate, setCanNavigate] = useState(false);

  // Add a small delay to ensure layouts are mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanNavigate(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Only navigate when both auth is initialized and navigation is ready
  useEffect(() => {
    if (initialized && canNavigate) {
      console.log('Navigation ready, redirecting to:', isAuthenticated ? '/(tabs)/home' : '/(auth)/sign-in');
      if (isAuthenticated) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/(auth)/sign-in');
      }
    }
  }, [initialized, isAuthenticated, canNavigate]);

  // Always show a loading indicator first
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});