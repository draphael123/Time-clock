const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
  
  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const page = await browser.newPage();
  
  // Set viewport to extension popup size
  await page.setViewport({ width: 400, height: 520 });

  // Load the popup HTML
  const popupPath = path.join(__dirname, '..', 'popup.html');
  await page.goto(`file://${popupPath}`, { waitUntil: 'networkidle0' });

  // Wait for content to load
  await page.waitForSelector('.clock-grid');
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Screenshot 1: Light mode default view
  console.log('Generating light mode screenshot...');
  await page.screenshot({
    path: path.join(screenshotsDir, 'extension-light.png'),
    clip: { x: 0, y: 0, width: 400, height: 520 }
  });

  // Screenshot 2: Dark mode
  console.log('Generating dark mode screenshot...');
  await page.click('#dark-mode-btn');
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({
    path: path.join(screenshotsDir, 'extension-dark.png'),
    clip: { x: 0, y: 0, width: 400, height: 520 }
  });

  // Screenshot 3: Settings panel
  console.log('Generating settings screenshot...');
  await page.click('#settings-btn');
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({
    path: path.join(screenshotsDir, 'extension-settings.png'),
    clip: { x: 0, y: 0, width: 400, height: 520 }
  });

  // Close settings
  await page.click('#close-settings');
  await new Promise(resolve => setTimeout(resolve, 300));

  // Screenshot 4: Stopwatch/Timer panel
  console.log('Generating stopwatch screenshot...');
  await page.click('#stopwatch-btn');
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({
    path: path.join(screenshotsDir, 'extension-stopwatch.png'),
    clip: { x: 0, y: 0, width: 400, height: 520 }
  });

  // Close stopwatch
  await page.click('#close-stopwatch');
  await new Promise(resolve => setTimeout(resolve, 300));

  // Screenshot 5: Timeline view
  console.log('Generating timeline screenshot...');
  await page.click('#timeline-btn');
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({
    path: path.join(screenshotsDir, 'extension-timeline.png'),
    clip: { x: 0, y: 0, width: 400, height: 520 }
  });

  // Close timeline
  await page.click('#close-timeline');
  await new Promise(resolve => setTimeout(resolve, 300));

  // Screenshot 6: World map
  console.log('Generating world map screenshot...');
  await page.click('#worldmap-btn');
  await new Promise(resolve => setTimeout(resolve, 500));
  await page.screenshot({
    path: path.join(screenshotsDir, 'extension-worldmap.png'),
    clip: { x: 0, y: 0, width: 400, height: 520 }
  });

  // Switch back to light mode for hero screenshot
  await page.click('#close-worldmap');
  await new Promise(resolve => setTimeout(resolve, 300));
  await page.click('#dark-mode-btn');
  await new Promise(resolve => setTimeout(resolve, 500));

  // Screenshot 7: Hero image (larger for marketing)
  console.log('Generating hero screenshot...');
  await page.setViewport({ width: 420, height: 540 });
  await page.screenshot({
    path: path.join(screenshotsDir, 'extension-hero.png'),
    clip: { x: 0, y: 0, width: 420, height: 540 }
  });

  await browser.close();
  console.log('✅ All screenshots generated successfully!');
  console.log(`📁 Saved to: ${screenshotsDir}`);
}

generateScreenshots().catch(console.error);




