const path = require('path');

const PATHS = {
  root: path.join(__dirname, '..', '..'),
  resources: path.join(__dirname, '..', '..', 'resources'),
  dist: path.join(__dirname, '..', '..', 'dist'),
  preload: path.join(__dirname, '..', 'preload.cjs'),
};

module.exports = PATHS;