/// <reference types="vite/client" />

interface Window {
  electron?: {
    getApiKey: () => Promise<string>;
    env: {
      get: (key: string) => string | undefined;
      getAll: () => Record<string, string>;
    };
  };
}