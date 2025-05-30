import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { Layout } from '../constants/layout';

/**
 * Theme system for dynamic styling and customization
 */
export interface Theme {
  colors: typeof Colors;
  typography: typeof Typography;
  spacing: typeof Spacing;
  layout: typeof Layout;
  isDark: boolean;
}

export interface ReaderTheme {
  backgroundColor: string;
  textColor: string;
  name: 'light' | 'dark' | 'sepia';
}

/**
 * Default themes
 */
export const defaultTheme: Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  layout: Layout,
  isDark: true,
};

export const readerThemes: Record<string, ReaderTheme> = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#333333',
    name: 'light',
  },
  dark: {
    backgroundColor: Colors.background.dark,
    textColor: Colors.text.primary,
    name: 'dark',
  },
  sepia: {
    backgroundColor: '#f8f1e3',
    textColor: '#5b4636',
    name: 'sepia',
  },
};

/**
 * Create a custom theme by merging with the default theme
 */
export function createTheme(customTheme: Partial<Theme>): Theme {
  return {
    ...defaultTheme,
    ...customTheme,
    colors: {
      ...defaultTheme.colors,
      ...customTheme.colors,
    },
    typography: {
      ...defaultTheme.typography,
      ...customTheme.typography,
    },
    spacing: {
      ...defaultTheme.spacing,
      ...customTheme.spacing,
    },
    layout: {
      ...defaultTheme.layout,
      ...customTheme.layout,
    },
  };
}

/**
 * Theme context and hook for React components
 */

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  readerTheme: ReaderTheme;
  setReaderTheme: (theme: ReaderTheme) => void;
}>({
  theme: defaultTheme,
  setTheme: () => {},
  readerTheme: readerThemes.dark,
  setReaderTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
  initialReaderTheme?: ReaderTheme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = defaultTheme,
  initialReaderTheme = readerThemes.dark,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>(initialReaderTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, readerTheme, setReaderTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Utility functions for theme-based styling
 */
export const getThemeColors = (theme: Theme) => theme.colors;
export const getThemeTypography = (theme: Theme) => theme.typography;
export const getThemeSpacing = (theme: Theme) => theme.spacing;
export const getThemeLayout = (theme: Theme) => theme.layout;

/**
 * Reader theme utilities
 */
export const getReaderThemeStyles = (readerTheme: ReaderTheme) => ({
  backgroundColor: readerTheme.backgroundColor,
  color: readerTheme.textColor,
});

export const getReaderThemeByName = (name: 'light' | 'dark' | 'sepia'): ReaderTheme => {
  return readerThemes[name];
};
