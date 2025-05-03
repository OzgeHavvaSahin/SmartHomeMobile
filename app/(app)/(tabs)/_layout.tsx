// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { AuthProvider } from '@/src/context/AuthContext';

export default function TabsLayout() {
  // Remove any useEffect hooks or navigation logic from here
  return (
    <AuthProvider>
      <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="profile" />
    </Tabs>
    </AuthProvider>
  );
}
