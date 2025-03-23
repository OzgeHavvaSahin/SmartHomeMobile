// src/navigation/AppNavigator.tsx
import React from 'react';
// Remove the NavigationContainer import
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from '../app/HomeScreen';
import WindowControlScreen from '../app/WindowControlScreen';
import DoorControlScreen from '../app/DoorControlScreen';
// Other imports...

// Define the navigation parameter types
export type RootStackParamList = {
  Home: undefined;
  WindowControl: { 
    deviceId: string;
    deviceName: string;
    isOpen: boolean;
  };
  DoorControl: { 
    deviceId: string;
    deviceName: string;
    isOpen: boolean;
  };
  // Other routes...
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    // Remove the NavigationContainer wrapper, keeping only the Stack.Navigator
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="WindowControl" component={WindowControlScreen} />
      <Stack.Screen name="DoorControl" component={DoorControlScreen} />
      {/* Other screens... */}
    </Stack.Navigator>
  );
};

export default AppNavigator;