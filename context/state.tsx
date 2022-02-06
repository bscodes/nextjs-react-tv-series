import { createContext, useContext, useState } from 'react';

const AppContext = createContext(undefined);

export function AppWrapper({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const searchQueryHandler = (query) => {
    setSearchQuery(query);
  };

  const loadingHandler = () => {
    setLoading(!loading);
  };

  let sharedState = {
    searchQuery,
    loading,
    loadingHandler,
    searchQueryHandler,
  };
  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
