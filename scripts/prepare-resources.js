const fs = require('fs');
const path = require('path');

function prepareResources() {
  const resourcesDir = path.join(__dirname, '../resources');
  const distDir = path.join(__dirname, '../dist');
  
  // Create directories if they don't exist
  [resourcesDir, distDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Copy icon files
  const files = [
    {
      src: '../public/school-icon.ico',
      dest: '../resources/icon.ico'
    },
    {
      src: '../public/school-icon.svg',
      dest: '../dist/school-icon.svg'
    }
  ];

  files.forEach(({ src, dest }) => {
    const srcPath = path.join(__dirname, src);
    const destPath = path.join(__dirname, dest);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${src} to ${dest}`);
    } else {
      console.error(`Source file not found: ${src}`);
    }
  });
  
  console.log('Resources prepared successfully');
}

prepareResources();