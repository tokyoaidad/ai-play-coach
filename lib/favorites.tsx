"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "ai-play-coach:favorites:v1";

export interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed.filter((item) => typeof item === "string"));
        }
      }
    } catch {
      // ignore read errors and keep empty favorites
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites),
      );
    } catch {
      // ignore write errors
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((existing) => existing !== id)
        : [...prev, id],
    );
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [favorites, isFavorite, toggleFavorite, clearFavorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error(
      "useFavorites must be used within a FavoritesProvider",
    );
  }

  return ctx;
}

