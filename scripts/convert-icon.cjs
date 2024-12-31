const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertIcon() {
  try {
    const buildDir = path.join(__dirname, '../build');
    const inputPath = path.join(__dirname, '../public/school-icon.svg');
    const outputPath = path.join(buildDir, 'icon.png');

    // Ensure build directory exists
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }

    // Convert SVG to PNG
    await sharp(inputPath)
      .resize(256, 256)
      .png()
      .toFile(outputPath);

    console.log('Icon converted successfully!');
  } catch (error) {
    console.error('Error converting icon:', error);
    process.exit(1);
  }
}

convertIcon();