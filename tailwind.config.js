/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // School brand colors
        'school-green': '#1A472A', // Dark green from logo
        'school-gold': '#FFB81C', // Gold from logo
        
        // Light mode colors
        'light-bg': '#ffffff',
        'light-card': '#ffffff',
        'light-text': '#1A472A',
        'light-text-secondary': '#2C5545',
        'light-border': '#e2e8f0',
        'light-hover': '#f8fafc',
        
        // Dark mode colors
        'dark-bg': '#0A1F12',
        'dark-card': '#132A1C',
        'dark-text': '#f8fafc',
        'dark-text-secondary': '#cbd5e1',
        'dark-border': '#1A472A',
        'dark-hover': '#1A472A',

        // Brand colors
        'primary': '#1A472A',
        'primary-dark': '#133620',
        'primary-light': '#2C5545',
        'accent': '#FFB81C',
        'accent-dark': '#E5A619',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444'
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(26, 71, 42, 0.1), 0 1px 2px -1px rgba(26, 71, 42, 0.1)',
        'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
        'hover': '0 4px 6px -1px rgba(26, 71, 42, 0.1), 0 2px 4px -2px rgba(26, 71, 42, 0.1)',
        'hover-dark': '0 8px 10px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)'
      }
    }
  },
  plugins: [],
};