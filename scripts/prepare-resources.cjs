const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function prepareResources() {
  try {
    // Create necessary directories
    const dirs = [
      path.join(__dirname, '../dist'),
      path.join(__dirname, '../build')
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Convert SVG to PNG for the app icon
    const svgPath = path.join(__dirname, '../public/school-icon.svg');
    const pngPath = path.join(__dirname, '../build/icon.png');

    await sharp(svgPath)
      .resize(256, 256)
      .png()
      .toFile(pngPath);

    // Copy SVG to dist for web use
    fs.copyFileSync(
      svgPath,
      path.join(__dirname, '../dist/school-icon.svg')
    );

    console.log('Resources prepared successfully');
  } catch (error) {
    console.error('Error preparing resources:', error);
    process.exit(1);
  }
}

prepareResources();