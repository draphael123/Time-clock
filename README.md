# World Clock Chrome Extension

A beautiful Chrome extension that displays time in EST, PST, Brazil, and Italy timezones.

## Features

- 🕐 Real-time clock updates (updates every second)
- 🌍 Multiple timezone support (EST, PST, Brazil, Italy)
- 🎨 Modern, visually appealing design with gradient backgrounds
- 🇵🇭 Filipino flag icon
- 📱 Responsive grid layout

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top right)
3. Click "Load unpacked"
4. Select this folder (`Clock APp`)
5. The extension icon should appear in your Chrome toolbar

## Icon Setup

The extension requires PNG icon files. To create them:

1. Open `icons/flag-generator.html` in your browser
2. Take screenshots of the flag at different sizes:
   - 16x16 pixels for `icon16.png`
   - 48x48 pixels for `icon48.png`
   - 128x128 pixels for `icon128.png`
3. Save the screenshots in the `icons/` folder with the appropriate names

Alternatively, you can use any image editing software to create PNG files with the Filipino flag design.

## Files Structure

- `manifest.json` - Extension configuration
- `popup.html` - Main UI structure
- `popup.css` - Styling and animations
- `popup.js` - Timezone logic and updates
- `icons/` - Extension icons directory

## Usage

Click the extension icon in your Chrome toolbar to see all four timezones displayed in a beautiful grid layout. The clocks update automatically every second.

