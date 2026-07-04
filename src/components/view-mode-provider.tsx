import React, { createContext, useContext, useEffect, useState } from 'react';

export type ViewMode = 'full' | 'minimal';

interface ViewModeContextValue {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
}

const STORAGE_KEY = 'portfolio-view-mode';

const ViewModeContext = createContext<ViewModeContextValue | undefined>(undefined);

function getInitialViewMode(): ViewMode {
  // Résumé (minimal) is the default; visitors opt into the full Portfolio view.
  if (typeof window === 'undefined') return 'minimal';
  return window.localStorage.getItem(STORAGE_KEY) === 'full' ? 'full' : 'minimal';
}

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>(getInitialViewMode);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, viewMode);
  }, [viewMode]);

  const setViewMode = (mode: ViewMode) => setViewModeState(mode);
  const toggleViewMode = () =>
    setViewModeState((mode) => (mode === 'minimal' ? 'full' : 'minimal'));

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode, toggleViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode(): ViewModeContextValue {
  const ctx = useContext(ViewModeContext);
  if (!ctx) throw new Error('useViewMode must be used within a ViewModeProvider');
  return ctx;
}
