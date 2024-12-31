const PROD_ENV = {
  VITE_GEMINI_API_KEY: 'AIzaSyDALEk19yF-2CbRWwwi8mjJmNAtX-6GZ28'
};

const WINDOW_DEFAULTS = {
  width: 1200,
  height: 800,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: true,
    enableRemoteModule: false
  }
};

module.exports = {
  PROD_ENV,
  WINDOW_DEFAULTS
};