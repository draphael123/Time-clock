# Chrome Extension Installation Guide

## Quick Start (3 Steps)

### Step 1: Download the Extension
1. Make sure you have all the extension files in this folder:
   - `manifest.json`
   - `popup.html`
   - `popup.js`
   - `popup.css`
   - `icons/` folder with icon files

### Step 2: Open Chrome Extensions Page
1. Open Google Chrome
2. Type `chrome://extensions/` in the address bar
3. Press Enter

### Step 3: Load the Extension
1. **Enable Developer Mode**
   - Toggle the switch in the top-right corner (it will turn blue)

2. **Load Unpacked Extension**
   - Click the **"Load unpacked"** button
   - Navigate to this folder: `C:\Users\danie\OneDrive\Desktop\Cursor Projects\Clock APp`
   - Select the folder and click "Select Folder"

3. **Done!**
   - The extension icon (Filipino flag) should appear in your Chrome toolbar
   - Click it to see the world clock!

## Detailed Installation Steps

### Prerequisites
- Google Chrome browser (version 88 or later)
- All extension files in the project folder

### File Structure Required
```
Clock APp/
├── manifest.json          (Extension configuration)
├── popup.html            (Main UI)
├── popup.js              (Extension logic)
├── popup.css             (Styling)
└── icons/
    ├── icon16.png        (16x16 icon)
    ├── icon48.png        (48x48 icon)
    └── icon128.png       (128x128 icon)
```

### Step-by-Step Installation

#### 1. Open Chrome Extensions Manager
- Method 1: Type `chrome://extensions/` in address bar
- Method 2: Click three dots menu (⋮) → More tools → Extensions
- Method 3: Right-click extension icon area → Manage extensions

#### 2. Enable Developer Mode
- Look for "Developer mode" toggle in top-right
- Click to turn it ON (switch turns blue)
- This allows you to load unpacked extensions

#### 3. Load the Extension
- Click **"Load unpacked"** button (top-left)
- Navigate to your project folder
- Select the folder containing `manifest.json`
- Click "Select Folder"

#### 4. Verify Installation
- You should see "World Clock - EST, PST, Brazil & Italy" in the extensions list
- The extension icon should appear in your Chrome toolbar
- Status should show "Enabled"

#### 5. Test the Extension
- Click the extension icon in your toolbar
- You should see:
  - Four timezone cards (EST, PST, Brazil, Italy)
  - Times updating every second
  - Header buttons (refresh, settings, dark mode, compact mode)
  - Day/night indicators

## Troubleshooting

### Extension Not Appearing
- **Check file location**: Make sure you selected the correct folder
- **Check manifest.json**: Should be in the root of the selected folder
- **Check for errors**: Look for red error messages on extensions page

### Extension Not Working
- **Check Developer Mode**: Must be enabled
- **Check for errors**: Click "Errors" button if visible
- **Reload extension**: Click the refresh icon on the extension card
- **Check console**: Right-click extension popup → Inspect → Console tab

### Icons Not Showing
- **Verify icon files exist**: Check `icons/` folder has all three PNG files
- **Check file names**: Must be exactly `icon16.png`, `icon48.png`, `icon128.png`
- **Check file format**: Must be PNG format

### Times Not Updating
- **Check JavaScript errors**: Open console (right-click popup → Inspect)
- **Reload extension**: Click refresh icon on extensions page
- **Check permissions**: Extension needs no special permissions (works offline)

### Can't Click Cards
- **Check popup.js loaded**: Open console to check for errors
- **Reload extension**: Remove and re-add if needed
- **Check browser version**: Chrome 88+ required

## Updating the Extension

When you make changes to the extension:

1. **Save all files** (popup.html, popup.js, popup.css, manifest.json)
2. Go to `chrome://extensions/`
3. Find your extension
4. Click the **refresh icon** (🔄) on the extension card
5. Open the extension popup to see changes

## Removing the Extension

1. Go to `chrome://extensions/`
2. Find "World Clock - EST, PST, Brazil & Italy"
3. Click **"Remove"** button
4. Confirm removal

## Features After Installation

Once installed, you can:

- ✅ View 4 timezones simultaneously (EST, PST, Brazil, Italy)
- ✅ See times in 12-hour format with AM/PM
- ✅ Click any card to copy time to clipboard
- ✅ Toggle dark mode (🌙 button)
- ✅ Toggle compact mode (📐 button)
- ✅ Open settings panel (⚙️ button)
- ✅ Refresh clocks manually (🔄 button)
- ✅ Use keyboard shortcuts (press `?` to see all)
- ✅ See day/night indicators (☀️/🌙)
- ✅ View UTC offsets (in settings)
- ✅ View time differences (in settings)

## Keyboard Shortcuts

- `R` - Refresh all clocks
- `1-4` - Copy timezone 1-4 to clipboard
- `S` - Open settings
- `D` - Toggle dark mode
- `C` - Toggle compact mode
- `?` - Show keyboard shortcuts help
- `Esc` - Close modals

## System Requirements

- **Browser**: Google Chrome 88 or later
- **OS**: Windows, macOS, or Linux
- **Storage**: Less than 1MB
- **Internet**: Not required (works offline)

## Support

If you encounter issues:

1. Check the Console for errors (right-click popup → Inspect)
2. Verify all files are in the correct location
3. Try removing and re-adding the extension
4. Check Chrome version (must be 88+)
5. Review error messages on extensions page

## Next Steps

After installation:

1. **Pin the extension** to your toolbar for easy access
2. **Customize settings** by clicking the ⚙️ button
3. **Try keyboard shortcuts** for faster access
4. **Share with others** who need multi-timezone tracking!

