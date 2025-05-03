import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getHomesbyOwnerId } from '../api/HomeApi';
import { GetAllHomesResponse, Home } from '../interfaces/components';

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
      
      // If no home is selected yet and we got homes, select the first one
      if (selectedHomeId === null && homesData.length > 0) {
        setSelectedHomeId(homesData[0].id);
      }
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Evler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Load homes when component mounts
  useEffect(() => {
    refreshHomes();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        homes,
        loading,
        error,
        selectedHomeId,
        setSelectedHomeId,
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