import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';
const THEME_KEY = 'devmap_theme';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setThemeState(t => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
