const { app } = require('electron');
const store = require('./config/store.cjs');
const { createTermsWindow, setupTermsHandlers } = require('./windows/terms.cjs');

async function checkTermsAcceptance() {
  if (store.get('terms-accepted')) {
    return true;
  }

  const termsWindow = createTermsWindow();
  const accepted = await setupTermsHandlers();
  
  if (!accepted) {
    app.quit();
    return false;
  }

  termsWindow.close();
  return true;
}

module.exports = {
  checkTermsAcceptance
};