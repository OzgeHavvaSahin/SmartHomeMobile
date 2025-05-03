import { AppState } from 'react-native';
import { useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useClearOnExit = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (
        appState.current.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        // App arka plana gidiyor, storage temizle
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, []);
};
