import React from 'react';
import HomeSelector from './HomeSelectorUI';
import { useHome } from '../../context/HomeContext';

const HomeSelectorContainer: React.FC = () => {
  const { homes, selectedHomeId, setSelectedHomeId, loading, error, refreshHomes } = useHome();

  const handleHomeSelect = (homeId: number) => {
    setSelectedHomeId(homeId);
  };

  return (
    <HomeSelector
      homes={homes}
      selectedHomeId={selectedHomeId}
      onHomeSelect={handleHomeSelect}
      isLoading={loading}
      error={error}
    />
  );
};

export default HomeSelectorContainer;