// app/(tabs)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/src/context/AuthContext';

export default function StackLayout() {
  // Remove any useEffect hooks or navigation logic from here
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="sign-up" />
    </Stack>
    </AuthProvider>
  );
}
