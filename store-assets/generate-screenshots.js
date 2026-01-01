/**
 * Generate Chrome Web Store screenshots from HTML templates
 * Requires: npm install puppeteer
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const screenshots = [
  {
    name: 'screenshot-1-main',
    html: 'screenshot-template.html',
    width: 1280,
    height: 800,
    description: 'Main extension view'
  },
  {
    name: 'screenshot-2-dark-mode',
    html: 'screenshot-dark-mode.html',
    width: 1280,
    height: 800,
    description: 'Dark mode view'
  },
  {
    name: 'promo-tile-small',
    html: 'promo-tile-small.html',
    width: 440,
    height: 280,
    description: 'Small promo tile'
  },
  {
    name: 'promo-tile-marquee',
    html: 'promo-tile-marquee.html',
    width: 1400,
    height: 560,
    description: 'Marquee promo tile'
  }
];

async function generateScreenshot(browser, config) {
  const assetsDir = __dirname;
  const htmlPath = path.join(assetsDir, config.html);
  
  if (!fs.existsSync(htmlPath)) {
    console.log(`[SKIP] ${config.html} not found`);
    return null;
  }
  
  const page = await browser.newPage();
  
  // Set viewport to match screenshot dimensions
  await page.setViewport({
    width: config.width,
    height: config.height,
    deviceScaleFactor: 1
  });
  
  // Load HTML file
  const fileUrl = `file://${htmlPath}`;
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  
  // Wait a bit for any animations
  await page.waitForTimeout(500);
  
  // Take screenshot
  const outputPath = path.join(assetsDir, `${config.name}.jpg`);
  await page.screenshot({
    path: outputPath,
    type: 'jpeg',
    quality: 90,
    fullPage: false
  });
  
  await page.close();
  
  // Check file size
  const stats = fs.statSync(outputPath);
  const fileSizeKB = (stats.size / 1024).toFixed(1);
  
  console.log(`[OK] Generated: ${config.name}.jpg`);
  console.log(`    Size: ${fileSizeKB} KB`);
  console.log(`    Dimensions: ${config.width}x${config.height}`);
  console.log(`    Description: ${config.description}`);
  console.log();
  
  return outputPath;
}

async function main() {
  console.log('Generating Chrome Web Store Screenshots...\n');
  console.log('=' .repeat(60));
  console.log();
  
  let browser;
  try {
    // Launch browser
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    // Generate all screenshots
    const generated = [];
    for (const config of screenshots) {
      try {
        const result = await generateScreenshot(browser, config);
        if (result) {
          generated.push(result);
        }
      } catch (error) {
        console.log(`[ERROR] Failed to generate ${config.name}: ${error.message}`);
        console.log();
      }
    }
    
    // Summary
    console.log('=' .repeat(60));
    console.log(`[SUCCESS] Generated ${generated.length} screenshot(s)`);
    console.log();
    console.log('Files created:');
    generated.forEach(file => {
      console.log(`  - ${path.basename(file)}`);
    });
    console.log();
    console.log('Ready to upload to Chrome Web Store!');
    
  } catch (error) {
    console.error('[ERROR]', error.message);
    if (error.message.includes('puppeteer')) {
      console.log('\nTo install Puppeteer, run:');
      console.log('  npm install puppeteer');
    }
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Check if puppeteer is installed
try {
  require('puppeteer');
  main().catch(console.error);
} catch (error) {
  console.log('Puppeteer is not installed.');
  console.log('\nTo generate screenshots automatically, install Puppeteer:');
  console.log('  npm install puppeteer');
  console.log('\nThen run:');
  console.log('  node store-assets/generate-screenshots.js');
  console.log('\nAlternatively, you can:');
  console.log('1. Open the HTML templates in Chrome');
  console.log('2. Take screenshots manually using DevTools');
  console.log('3. Save as JPEG files');
}

