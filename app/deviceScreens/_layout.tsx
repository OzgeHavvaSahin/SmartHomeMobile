import { Stack } from 'expo-router';
import React from 'react';

export default function DevicesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}