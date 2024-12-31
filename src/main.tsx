import React from 'react';
import ReactDOM from 'react-dom/client';
import { supabase } from './lib/supabase';
import App from './App';
import { AuthProvider } from './components/auth/AuthProvider';
import './index.css';

// Initialize Supabase client
if (!supabase) {
  console.error('Failed to initialize Supabase client');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);