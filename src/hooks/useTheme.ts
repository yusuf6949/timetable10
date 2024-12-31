import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  effectiveTheme: 'light' | 'dark';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      effectiveTheme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const { theme, effectiveTheme } = get();
        if (theme === 'system') {
          // If currently using system preference, switch to explicit mode
          set({ theme: effectiveTheme === 'light' ? 'dark' : 'light' });
        } else {
          // If using explicit mode, toggle between light and dark
          set({ theme: theme === 'light' ? 'dark' : 'light' });
        }
      }
    }),
    {
      name: 'theme-storage'
    }
  )
);

export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  useEffect(() => {
    // Watch system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
      const effectiveTheme = theme === 'system'
        ? (mediaQuery.matches ? 'dark' : 'light')
        : theme;

      if (effectiveTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Update meta theme-color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          effectiveTheme === 'dark' ? '#0f172a' : '#f8fafc'
        );
      }
    };

    updateTheme();
    mediaQuery.addEventListener('change', updateTheme);
    
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  return { theme, setTheme, toggleTheme };
};