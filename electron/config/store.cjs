const Store = require('electron-store');
const path = require('path');

// Configure electron-store
Store.initRenderer();

const store = new Store({
  name: 'khsk-settings',
  encryptionKey: 'khsk-secure-key',
  schema: {
    'terms-accepted': {
      type: 'boolean',
      default: false
    },
    'geminiApiKey': {
      type: 'string'
    }
  },
  migrations: {
    '1.0.0': store => {
      store.set('terms-accepted', false);
    }
  }
});

module.exports = store;