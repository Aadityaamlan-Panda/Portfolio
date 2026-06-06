'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Inline script that runs synchronously before React hydrates —
 * sets data-theme on <html> immediately to prevent flash of wrong theme.
 * Injected once in the document <head> via layout.tsx or here as a sibling.
 */
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('color-scheme');
    var theme = stored === 'light' ? 'light' : stored === 'dark' ? 'dark' :
      window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Read the theme that the inline script already applied to <html>
    const applied = document.documentElement.getAttribute('data-theme') as Theme | null;
    if (applied === 'light' || applied === 'dark') {
      setTheme(applied);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('color-scheme', next); } catch(e) {}
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Synchronous inline script prevents theme flash — must stay here */}
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      {children}
    </ThemeContext.Provider>
  );
}
