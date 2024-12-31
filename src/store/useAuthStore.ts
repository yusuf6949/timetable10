import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sessionManager } from '../lib/auth/session';
import { rateLimiter } from '../lib/auth/rateLimit';

interface User {
  id: string;
  email: string;
  role: 'admin';
}

interface AuthState {
  user: User | null;
  sessionToken: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Admin credentials
const ADMIN_EMAIL = 'admin@kinaawahigh.co.ug';
const ADMIN_PASSWORD = 'admin123';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      sessionToken: null,
      login: async (email: string, password: string) => {
        try {
          // Check rate limiting
          if (rateLimiter.isRateLimited(email)) {
            return {
              success: false,
              error: 'Too many login attempts. Please try again later.'
            };
          }

          // Validate credentials
          if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase() || 
              password !== ADMIN_PASSWORD) {
            rateLimiter.increment(email);
            return {
              success: false,
              error: 'Incorrect email or password'
            };
          }

          // Create session
          const session = sessionManager.createSession('1');
          
          // Update state
          set({
            user: {
              id: '1',
              email: ADMIN_EMAIL,
              role: 'admin'
            },
            sessionToken: session.token
          });

          // Reset rate limiter on successful login
          rateLimiter.reset(email);
          
          return { success: true };
        } catch (error) {
          console.error('Login error:', error);
          return {
            success: false,
            error: 'An error occurred during login'
          };
        }
      },
      logout: () => {
        const state = get();
        if (state.sessionToken) {
          sessionManager.removeSession(state.sessionToken);
        }
        set({ user: null, sessionToken: null });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        sessionToken: state.sessionToken
      })
    }
  )
);