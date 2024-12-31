import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative group">
      <button
        onClick={() => setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system')}
        className="p-2 rounded-lg bg-light-hover dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
        aria-label="Toggle theme"
      >
        {theme === 'system' ? (
          <Monitor className="w-5 h-5 text-primary dark:text-primary-light" />
        ) : theme === 'dark' ? (
          <Moon className="w-5 h-5 text-primary dark:text-primary-light" />
        ) : (
          <Sun className="w-5 h-5 text-primary dark:text-primary-light" />
        )}
      </button>
      
      <div className="absolute right-0 mt-2 w-48 py-1 bg-white dark:bg-dark-card rounded-lg shadow-hover dark:shadow-hover-dark border border-light-border dark:border-dark-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <button
          onClick={() => setTheme('light')}
          className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-light-hover dark:hover:bg-dark-hover transition-colors ${
            theme === 'light' ? 'text-primary dark:text-primary-light' : 'text-light-text dark:text-dark-text'
          }`}
        >
          <Sun className="w-4 h-4" />
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-light-hover dark:hover:bg-dark-hover transition-colors ${
            theme === 'dark' ? 'text-primary dark:text-primary-light' : 'text-light-text dark:text-dark-text'
          }`}
        >
          <Moon className="w-4 h-4" />
          Dark
        </button>
        <button
          onClick={() => setTheme('system')}
          className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-light-hover dark:hover:bg-dark-hover transition-colors ${
            theme === 'system' ? 'text-primary dark:text-primary-light' : 'text-light-text dark:text-dark-text'
          }`}
        >
          <Monitor className="w-4 h-4" />
          System
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;