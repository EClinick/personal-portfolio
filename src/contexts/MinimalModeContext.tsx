import React, { createContext, useContext, useEffect, useState } from 'react';

interface MinimalModeContextValue {
  isMinimal: boolean;
  toggleMinimal: () => void;
}

const MinimalModeContext = createContext<MinimalModeContextValue | undefined>(undefined);

const STORAGE_KEY = 'portfolio-minimal-mode';

export const MinimalModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMinimal, setIsMinimal] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(isMinimal));
  }, [isMinimal]);

  const toggleMinimal = () => setIsMinimal((v) => !v);

  return (
    <MinimalModeContext.Provider value={{ isMinimal, toggleMinimal }}>
      {children}
    </MinimalModeContext.Provider>
  );
};

export const useMinimalMode = (): MinimalModeContextValue => {
  const ctx = useContext(MinimalModeContext);
  if (!ctx) throw new Error('useMinimalMode must be used within MinimalModeProvider');
  return ctx;
};
