import React from 'react';
import { GraduationCap } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-school-green to-primary-dark flex flex-col items-center justify-center text-white animate-fadeIn">
      <img 
        src="/school-icon.svg" 
        alt="Kinaawa High School"
        className="w-32 h-32 mb-6 animate-bounce"
      />
      <h1 className="text-4xl font-bold mb-2">KHSK TimeTable</h1>
      <p className="text-lg mb-2 opacity-90">Kinaawa High School - Kawempe</p>
      <p className="text-sm mb-8 text-school-gold">"Learn to Excel"</p>
      <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-school-gold rounded-full loading-bar" />
      </div>
    </div>
  );
};

export default LoadingScreen;