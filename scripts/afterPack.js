// After pack script for electron-builder
const fs = require('fs');
const path = require('path');

exports.default = async function(context) {
  console.log('Running after-pack script...');
  
  // Add version info to the packed app
  const versionFile = path.join(context.appOutDir, 'version.txt');
  fs.writeFileSync(versionFile, context.packager.appInfo.version);

  // Log success
  console.log('After-pack tasks completed successfully');
};