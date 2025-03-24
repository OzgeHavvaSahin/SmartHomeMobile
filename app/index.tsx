import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

// Mock authentication check - replace with your actual auth logic
const checkAuth = async (): Promise<boolean> => {
  // Simulate API call to check if user is logged in
  await new Promise(resolve => setTimeout(resolve, 1000));
  return false; // Demo: not authenticated
};

export default function Index() {
  useEffect(() => {
    const redirect = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/sign-in');
      }
    };
    
    redirect();
  }, []);

  // Loading screen while checking auth
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
}