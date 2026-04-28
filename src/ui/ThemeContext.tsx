"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction
} from "react";
import * as SecureStore from "expo-secure-store";
import { useColorScheme } from "react-native";
import type { ThemeMode } from "./theme";
import { themeColors } from "./theme";

const THEME_PREFERENCE_KEY = "theme_preference";
const SUPPORTED_THEME: ThemeMode = "light";

type ThemeColors = (typeof themeColors)[ThemeMode];

type ThemeContextValue = {
  theme: ThemeMode;
  colors: ThemeColors;
  setTheme: Dispatch<SetStateAction<ThemeMode>>;
  toggleTheme: () => void;
  isSystem: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isSystemTheme, setIsSystemTheme] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadSavedTheme() {
      try {
        const savedPreference = await SecureStore.getItemAsync(THEME_PREFERENCE_KEY);
        if (savedPreference === "system") {
          setIsSystemTheme(true);
          setTheme(SUPPORTED_THEME);
        } else if (savedPreference === "light" || savedPreference === "dark") {
          setIsSystemTheme(false);
          setTheme(SUPPORTED_THEME);
        } else {
          setIsSystemTheme(true);
          setTheme(SUPPORTED_THEME);
        }
      } catch {
        setIsSystemTheme(true);
        setTheme(SUPPORTED_THEME);
      }
      setIsLoaded(true);
    }
    loadSavedTheme();
  }, [systemColorScheme]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isSystemTheme) {
      setTheme(SUPPORTED_THEME);
    }
  }, [systemColorScheme, isSystemTheme, isLoaded]);

  const toggleTheme = useCallback(() => {
    setIsSystemTheme(false);
    setTheme(SUPPORTED_THEME);
    SecureStore.setItemAsync(THEME_PREFERENCE_KEY, SUPPORTED_THEME);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSystemTheme) {
      SecureStore.setItemAsync(THEME_PREFERENCE_KEY, theme);
    }
  }, [theme, isSystemTheme, isLoaded]);

  const setSystemTheme = useCallback(() => {
    setIsSystemTheme(true);
    SecureStore.setItemAsync(THEME_PREFERENCE_KEY, "system");
    setTheme(SUPPORTED_THEME);
  }, [systemColorScheme]);

  const value: ThemeContextValue = {
    theme,
    colors: themeColors[theme],
    setTheme,
    toggleTheme,
    isSystem: isSystemTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "light" as ThemeMode,
      colors: themeColors.light,
      setTheme: () => {},
      toggleTheme: () => {},
      isSystem: true
    };
  }
  return context;
}

export function useColors() {
  const { colors, theme } = useTheme();
  return { ...colors, theme };
}
