# How to Reload the Chrome Extension

The extension files have been updated, but Chrome doesn't automatically reload extensions. Follow these steps:

## Steps to Reload:

1. **Open Chrome Extensions Page**
   - Go to `chrome://extensions/` in your browser
   - OR click the three dots menu → More tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner (if not already enabled)

3. **Find Your Extension**
   - Look for "World Clock - EST, PST, Brazil & Italy"

4. **Reload the Extension**
   - Click the **circular refresh/reload icon** (🔄) on the extension card
   - This will reload all the extension files with the latest changes

5. **Test the Extension**
   - Click the extension icon in your toolbar
   - You should now see:
     - Header buttons (refresh, settings, dark mode, compact mode)
     - Day/night indicators on each timezone
     - Click any card to copy time
     - All the new features!

## If You Don't See the Changes:

1. **Check for Errors**
   - On the extensions page, look for any red error messages
   - Click "Errors" if you see any issues

2. **Remove and Re-add**
   - Click "Remove" on the extension
   - Click "Load unpacked" 
   - Select the "Clock APp" folder again

3. **Clear Extension Data** (if needed)
   - Click "Details" on the extension
   - Scroll down and click "Clear site data"

## New Features to Test:

- ✅ Click any timezone card → Copies time to clipboard
- ✅ Click refresh button (🔄) → Updates all clocks
- ✅ Click settings button (⚙️) → Opens settings panel
- ✅ Click dark mode (🌙) → Toggles dark theme
- ✅ Click compact mode (📐) → Toggles compact view
- ✅ Press `?` key → Shows keyboard shortcuts
- ✅ Press `R` → Refreshes clocks
- ✅ Press `1-4` → Copies timezone 1-4
- ✅ Press `S` → Opens settings
- ✅ Press `D` → Toggles dark mode
- ✅ Press `C` → Toggles compact mode

## Troubleshooting:

If the extension still doesn't work after reloading:

1. Check the browser console for errors:
   - Right-click the extension popup → Inspect
   - Look for any red error messages

2. Verify files are correct:
   - Make sure `popup.html`, `popup.js`, `popup.css`, and `manifest.json` are in the extension folder

3. Check manifest.json:
   - Should have `"storage"` in permissions array

4. Try a hard refresh:
   - Close all extension popups
   - Reload the extension
   - Open the popup again

