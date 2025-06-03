import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Reader theme definition using Tailwind classes
 */
export interface ReaderTheme {
  backgroundClass: string;
  textClass: string;
  name: 'light' | 'dark' | 'sepia';
}

export const readerThemes: Record<'light' | 'dark' | 'sepia', ReaderTheme> = {
  light: { backgroundClass: 'bg-white', textClass: 'text-text-tertiary', name: 'light' },
  dark: { backgroundClass: 'bg-background-dark', textClass: 'text-text-primary', name: 'dark' },
  sepia: { backgroundClass: 'bg-[#f8f1e3]', textClass: 'text-[#5b4636]', name: 'sepia' },
};

// Theme context for reader-only themes
const ReaderThemeContext = createContext<{
  readerTheme: ReaderTheme;
  setReaderTheme: (theme: ReaderTheme) => void;
}>({ readerTheme: readerThemes.dark, setReaderTheme: () => {} });

interface ThemeProviderProps {
  children: ReactNode;
  initialReaderTheme?: ReaderTheme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialReaderTheme = readerThemes.dark,
}) => {
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>(initialReaderTheme);

  return (
    <ReaderThemeContext.Provider value={{ readerTheme, setReaderTheme }}>
      {children}
    </ReaderThemeContext.Provider>
  );
};

/**
 * Hook to access current reader theme and setter
 */
export const useTheme = () => {
  const context = useContext(ReaderThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

/**
 * Returns combined class names for reader theme
 */
export const getReaderThemeClasses = (readerTheme: ReaderTheme) =>
  `${readerTheme.backgroundClass} ${readerTheme.textClass}`;
