import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
    {/* Auth screen components */}
    <Stack.Screen name="signin" />
    <Stack.Screen name="signup" />
    {/* Add any other auth screens */}
  </Stack>
  );
}