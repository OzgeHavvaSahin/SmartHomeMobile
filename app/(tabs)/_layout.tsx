import React, { useEffect } from 'react';
import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';

export default function TabsLayout() {
  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  
  // Protect this route - redirect to auth if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/sign-in');
    }
  }, [isAuthenticated]);

  // If not authenticated, don't render tabs while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="devices"
        options={{
          title: 'Cihazlar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hardware-chip-outline" size={size} color={color} />
          ),
        }}
      /> */}
  
    </Tabs>
  );
}