const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron',
  {
    store: {
      get: (key) => ipcRenderer.invoke('store-get', key),
      set: (key, value) => ipcRenderer.invoke('store-set', key, value)
    },
    env: {
      get: (key) => process.env[key],
      getAll: () => process.env
    },
    terms: {
      accept: () => ipcRenderer.send('terms-accepted'),
      decline: () => ipcRenderer.send('terms-declined')
    }
  }
);