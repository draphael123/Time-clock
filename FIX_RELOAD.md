# Extension Not Showing New Features? Here's How to Fix It

## The Problem
If you're seeing:
- 24-hour format instead of 12-hour format
- No header buttons (refresh, settings, dark mode, compact mode)
- No day/night indicators
- Old layout

This means Chrome is still using the **old cached version** of the extension.

## Solution: Force Reload the Extension

### Step 1: Open Extensions Page
1. Type `chrome://extensions/` in your address bar
2. Press Enter

### Step 2: Enable Developer Mode
- Toggle **"Developer mode"** ON (top-right corner)

### Step 3: Remove Old Extension
1. Find **"World Clock - EST, PST, Brazil & Italy"**
2. Click **"Remove"** button
3. Confirm removal

### Step 4: Clear Browser Cache (Optional but Recommended)
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"

### Step 5: Reload Extension
1. Click **"Load unpacked"** button
2. Navigate to: `C:\Users\danie\OneDrive\Desktop\Cursor Projects\Clock APp`
3. Select the folder and click "Select Folder"

### Step 6: Verify It Works
1. Click the extension icon in your toolbar
2. You should now see:
   - ✅ Header with 4 buttons (🔄 ⚙️ 🌙 📐)
   - ✅ 12-hour format with AM/PM
   - ✅ Day/night indicators (☀️/🌙) on each card
   - ✅ Click any card to copy time
   - ✅ All new features working!

## Alternative: Hard Reload

If the above doesn't work:

1. Close ALL Chrome windows completely
2. Reopen Chrome
3. Go to `chrome://extensions/`
4. Remove the extension
5. Load it again as "unpacked"

## Check for Errors

If it still doesn't work:

1. On the extensions page, look for red error messages
2. Click "Errors" button if you see any
3. Right-click the extension popup → "Inspect"
4. Check the Console tab for JavaScript errors
5. Share any error messages you see

## Expected Result

After reloading, you should see:
- **12-hour format**: Times like "09:51:19 PM" not "21:51:19"
- **Header buttons**: Refresh, Settings, Dark Mode, Compact Mode
- **Day/Night icons**: ☀️ or 🌙 in the top-right of each card
- **Clickable cards**: Click any timezone to copy the time
- **Settings panel**: Click ⚙️ to open settings

## Still Not Working?

If you're still seeing the old version:
1. Make sure you're loading from the correct folder
2. Check that `popup.html`, `popup.js`, `popup.css`, and `manifest.json` are all in the folder
3. Verify `manifest.json` has `"storage"` in the permissions array
4. Try restarting your computer (sometimes helps clear caches)

