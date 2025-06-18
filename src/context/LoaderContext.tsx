// context/LoaderContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
