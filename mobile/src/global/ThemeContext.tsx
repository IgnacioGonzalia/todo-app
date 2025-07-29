import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { Appearance } from "react-native";
import { getColors } from "./colors";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: ReturnType<typeof getColors>;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return Appearance.getColorScheme() === "dark" ? "dark" : "light";
  });
  const [isManualTheme, setIsManualTheme] = useState(false);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!isManualTheme) {
        setTheme(colorScheme === "dark" ? "dark" : "light");
      }
    });

    return () => subscription?.remove();
  }, [isManualTheme]);

  const toggleTheme = () => {
    setIsManualTheme(true);
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const colors = getColors(theme);
  const isDarkMode = theme === "dark";

  const value: ThemeContextType = useMemo(
    () => ({
      theme,
      toggleTheme,
      colors,
      isDarkMode,
    }),
    [theme, colors, isDarkMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
