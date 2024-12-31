import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import LoginForm from './LoginForm';
import ContactInfo from './ContactInfo';

const LoginScreen: React.FC = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const login = useAuthStore(state => state.login);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-school-green to-primary-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <img 
            src="/school-icon.svg" 
            alt="Kinaawa High School"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">
            KHSK TimeTable
          </h1>
          <p className="text-gray-300">
            Kinaawa High School - Kawempe
          </p>
          <p className="text-sm text-school-gold mt-2">
            "Learn to Excel"
          </p>
        </div>

        <LoginForm 
          onSubmit={handleLogin}
          error={error}
          loading={loading}
        />

        <div className="mt-8">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;