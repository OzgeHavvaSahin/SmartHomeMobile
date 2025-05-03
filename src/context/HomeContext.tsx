import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getHomesbyOwnerId } from '../api/HomeApi';
import { GetAllHomesResponse, Home } from '../interfaces/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  selectedHomeId: 'selectedHomeId',
  homeIds: 'homeIds',
};

interface HomeContextType {
  homes: Home[];
  loading: boolean;
  error: string | null;
  selectedHomeId: number | null;
  setSelectedHomeId: (id: number) => void;
  refreshHomes: () => Promise<void>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

interface HomeProviderProps {
  children: ReactNode;
  ownerId : number;

}

export const HomeProvider: React.FC<HomeProviderProps> = ({ children, ownerId  }) => {
  const [homes, setHomes] = useState<GetAllHomesResponse[]>([]);
  const [selectedHomeId, setSelectedHomeId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshHomes = async () => {
    try {
      setLoading(true);
      const homesData = await getHomesbyOwnerId(ownerId);
      setHomes(homesData);
  
      const homeIds = homesData.map(home => home.id);
      await AsyncStorage.setItem(STORAGE_KEYS.homeIds, JSON.stringify(homeIds));
  
      // Eğer seçili ev yoksa, ilk evi seç
      if (selectedHomeId === null && homeIds.length > 0) {
        setSelectedHomeId(homeIds[0]);
        await AsyncStorage.setItem(STORAGE_KEYS.selectedHomeId, homeIds[0].toString());
      }
  
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Evler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const loadSelectedHomeId = async () => {
      const storedId = await AsyncStorage.getItem(STORAGE_KEYS.selectedHomeId);
      if (storedId) {
        setSelectedHomeId(Number(storedId));
      }
    };
  
    loadSelectedHomeId();
    refreshHomes();
  }, []);
 
  const handleSetSelectedHomeId = (id: number) => {
    setSelectedHomeId(id);
    AsyncStorage.setItem(STORAGE_KEYS.selectedHomeId, id.toString());
  };
  

  return (
    <HomeContext.Provider
      value={{
        homes,
        loading,
        error,
        selectedHomeId,
        setSelectedHomeId: handleSetSelectedHomeId,
        refreshHomes,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

// Hook for using home context
export const useHome = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error('useHome must be used within a HomeProvider');
  }
  return context;
};