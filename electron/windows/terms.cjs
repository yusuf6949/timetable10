const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const store = require('../config/store.cjs');

function createTermsWindow() {
  const termsWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  termsWindow.loadFile(path.join(__dirname, '../../dist/terms.html'));
  
  termsWindow.once('ready-to-show', () => {
    termsWindow.show();
  });

  return termsWindow;
}

function setupTermsHandlers() {
  return new Promise((resolve) => {
    ipcMain.once('terms-accepted', () => {
      store.set('terms-accepted', true);
      resolve(true);
    });

    ipcMain.once('terms-declined', () => {
      resolve(false);
    });
  });
}

module.exports = {
  createTermsWindow,
  setupTermsHandlers
};