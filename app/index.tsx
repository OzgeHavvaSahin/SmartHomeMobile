import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';

export default function Index() {
  const { authState } = useAuth();
  const { isAuthenticated, loading } = authState;

  // While authentication is still being checked, show loading indicator
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  // After auth state is resolved, redirect accordingly
  // Using Redirect component instead of router.replace
  return isAuthenticated ? 
    <Redirect href="/(tabs)/home" /> : 
    <Redirect href="/(auth)/sign-in" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});