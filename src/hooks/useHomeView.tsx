"use client";

import { createContext, type ReactNode, useCallback, useContext, useState } from "react";

export enum HomeView {
  SEARCH = "search",
  FAVORITES = "favorites",
  MYSTERY_EGG = "mystery_egg",
}

type HomeViewContextValue = {
  activeView: HomeView;
  setActiveView: (view: HomeView) => void;
  isActiveView: (view: HomeView) => boolean;
};

const HomeViewContext = createContext<HomeViewContextValue | null>(null);

type HomeViewProviderProps = {
  children: ReactNode;
};

export const HomeViewProvider = ({ children }: HomeViewProviderProps) => {
  const [activeView, setActiveView] = useState<HomeView>(HomeView.SEARCH);

  const isActiveView = useCallback((view: HomeView) => activeView === view, [activeView]);

  return (
    <HomeViewContext.Provider value={{ activeView, setActiveView, isActiveView }}>
      {children}
    </HomeViewContext.Provider>
  );
};

export const useHomeView = () => {
  const context = useContext(HomeViewContext);

  if (!context) {
    throw new Error("useHomeView debe usarse dentro de HomeViewProvider");
  }

  return context;
};
