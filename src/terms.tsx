import React from 'react';
import { createRoot } from 'react-dom/client';
import TermsAndConditions from './components/installer/TermsAndConditions';
import './index.css';

const { ipcRenderer } = window.require('electron');

const Terms = () => {
  const handleAccept = () => {
    ipcRenderer.send('terms-accepted');
  };

  const handleDecline = () => {
    ipcRenderer.send('terms-declined');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <TermsAndConditions onAccept={handleAccept} onDecline={handleDecline} />
    </div>
  );
};

const root = createRoot(document.getElementById('terms-root')!);
root.render(
  <React.StrictMode>
    <Terms />
  </React.StrictMode>
);