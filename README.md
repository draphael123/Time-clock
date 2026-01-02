# World Clock Chrome Extension

A beautiful, feature-rich Chrome extension that displays time in EST, PST, Brazil, and Italy timezones with a modern interface.

🌐 **Live Website:** [https://time-clock-extension.vercel.app/](https://time-clock-extension.vercel.app/)

![World Clock Extension](icons/icon128.png)

## ✨ Features

### Core Features
- 🕐 **Real-time Updates** - Clocks update every second
- 🌍 **560+ Timezones** - Add any timezone from around the world
- 🎨 **Beautiful Design** - Modern gradient backgrounds and smooth animations
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📋 **Copy to Clipboard** - Click any timezone card to copy the time
- ⚙️ **Settings Panel** - Customize 12/24-hour format, show/hide seconds, offsets, and differences
- ⌨️ **Keyboard Shortcuts** - Full keyboard support for power users
- ☀️ **Day/Night Indicators** - Visual indicators showing day or night in each timezone
- 📐 **Multiple View Modes** - Grid, List, and Table views
- 🔄 **Manual Refresh** - Refresh button for instant updates
- 💾 **Settings Persistence** - Your preferences are saved automatically

### New in Version 2.0
- 🏢 **Business Hours Indicator** - Color-coded cards showing business hours
- 🕐 **Timezone Converter** - Convert any time across all timezones
- 📅 **Meeting Time Finder** - Find best meeting times across multiple zones
- 🔍 **Quick Time Search** - Search for any timezone instantly
- 💾 **Export/Import Settings** - Backup and restore your configuration
- ⏱️ **Countdown Timers** - See time until next hour
- 📤 **Share Timezone View** - Copy all times to clipboard
- 📝 **Custom Labels** - Rename timezones with custom names
- 📌 **Timezone Notes** - Add notes to timezones
- 📅 **Calendar Integration** - Add times directly to Google Calendar
- 🖱️ **Right-Click Context Menu** - Quick actions on timezone cards
- 🌍 **Auto-Detect Local Timezone** - Automatically adds your timezone
- ❌ **Remove Timezones** - Remove any timezone you don't need

## 🆕 Version 2.0.0 - Major Update!

**New Features Added:**
- ✅ Business hours indicator (color-coded cards)
- ✅ Timezone converter tool
- ✅ Meeting time finder
- ✅ Quick time search
- ✅ Export/import settings
- ✅ Countdown timers
- ✅ Multiple view modes (Grid/List/Table)
- ✅ Calendar integration
- ✅ Right-click context menu
- ✅ Custom timezone labels
- ✅ Timezone notes
- ✅ Share timezone view
- ✅ Auto-detect local timezone
- ✅ And 5+ more features!

**To Update:**
1. If you have the extension loaded as unpacked:
   - Go to `chrome://extensions/`
   - Click the **reload** button (🔄) on the World Clock extension
   - Done! New features are now available

2. If you installed from a ZIP file:
   - Download the latest version from GitHub
   - Extract and replace your old extension files
   - Go to `chrome://extensions/` and click **reload**

## 🚀 Quick Installation

### Method 1: Load Unpacked (Recommended for Development)

1. **Download/Clone this repository**
   ```bash
   git clone https://github.com/draphael123/Time-clock.git
   cd Time-clock
   ```

2. **Open Chrome Extensions**
   - Go to `chrome://extensions/`
   - Or: Menu (⋮) → More tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" switch (top-right corner)

4. **Load Extension**
   - Click "Load unpacked"
   - Select the `Clock APp` folder
   - Click "Select Folder"

5. **Done!**
   - Extension icon appears in toolbar
   - Click to open the world clock

### Method 2: Package for Distribution

1. **Create ZIP file**
   - Include only extension files (not website files):
     - `manifest.json`
     - `popup.html`
     - `popup.js`
     - `popup.css`
     - `icons/` folder

2. **Users can install:**
   - Extract ZIP
   - Follow Method 1 steps above

## 📁 File Structure

```
Clock APp/
├── manifest.json          # Extension configuration
├── popup.html             # Main UI structure
├── popup.js               # Extension logic and features
├── popup.css              # Styling and animations
└── icons/
    ├── icon16.png         # 16x16 toolbar icon
    ├── icon48.png         # 48x48 extension management icon
    └── icon128.png        # 128x128 Chrome Web Store icon
```

## 🎯 Usage

### Basic Usage
1. Click the extension icon in your Chrome toolbar
2. View all 4 timezones in a beautiful grid
3. Times update automatically every second

### Advanced Features

#### Copy Time to Clipboard
- **Click any timezone card** → Time is copied to clipboard
- **Keyboard shortcut**: Press `1`, `2`, `3`, or `4` to copy timezone 1-4

#### Settings Panel
- Click the **⚙️ Settings** button
- Toggle options:
  - 24-hour format
  - Show/hide seconds
  - Show UTC offset
  - Show time difference

#### Dark Mode
- Click the **🌙 Dark Mode** button
- Or press `D` key
- Toggle between light and dark themes

#### Compact Mode
- Click the **📐 Compact Mode** button
- Or press `C` key
- Switch to minimal view

#### Keyboard Shortcuts
Press `?` to see all keyboard shortcuts:
- `R` - Refresh all clocks
- `1-4` - Copy timezone 1-4
- `S` - Open settings
- `D` - Toggle dark mode
- `C` - Toggle compact mode
- `Esc` - Close modals

## ⚙️ Settings

Access settings by clicking the ⚙️ button or pressing `S`:

- **24-hour format**: Switch between 12-hour (AM/PM) and 24-hour format
- **Show seconds**: Toggle seconds display on/off
- **Show UTC offset**: Display UTC offset (e.g., UTC-5, UTC+1)
- **Show time difference**: Display time difference from your local time

All settings are automatically saved and persist across browser sessions.

## 🎨 Customization

The extension supports:
- **Dark Mode**: Beautiful dark theme for low-light environments
- **Compact Mode**: Minimal view hiding dates and timezone codes
- **Time Format**: Choose between 12-hour and 24-hour formats
- **Display Options**: Show/hide seconds, offsets, and differences

## 🔧 Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: `storage` (for saving settings)
- **Browser Support**: Chrome 88+
- **Offline Support**: Works completely offline
- **Storage**: Uses Chrome Storage API for settings persistence

## 📋 Requirements

- Google Chrome 88 or later
- No internet connection required
- Less than 1MB storage space

## 🐛 Troubleshooting

### Extension Not Loading
1. Check Developer Mode is enabled
2. Verify all files are in the correct folder
3. Check for errors on `chrome://extensions/` page
4. Ensure `manifest.json` is valid JSON

### Times Not Displaying
1. Reload the extension (click refresh icon)
2. Check browser console for errors (right-click popup → Inspect)
3. Verify JavaScript is enabled in Chrome

### Settings Not Saving
1. Check Chrome Storage permission is granted
2. Clear extension data and try again
3. Check browser console for errors

### Icons Not Showing
1. Verify `icons/` folder exists with all PNG files
2. Check file names are exactly: `icon16.png`, `icon48.png`, `icon128.png`
3. Ensure files are valid PNG format

## 📝 Development

### Making Changes
1. Edit files (`popup.html`, `popup.js`, `popup.css`)
2. Save changes
3. Go to `chrome://extensions/`
4. Click refresh icon on extension card
5. Test changes

### File Descriptions
- **manifest.json**: Extension metadata and configuration
- **popup.html**: HTML structure of the extension popup
- **popup.js**: All JavaScript functionality and features
- **popup.css**: Styling, themes, and animations
- **icons/**: Extension icons at different sizes

## 🌟 Features in Detail

### Time Display
- **12-hour format** by default (with AM/PM)
- **24-hour format** option in settings
- **Seconds** can be shown or hidden
- **Real-time updates** every second

### Timezone Information
- **Timezone codes**: EST/EDT, PST/PDT, BRT, CET/CEST
- **UTC offsets**: Optional display of UTC offset
- **Time differences**: Optional display relative to local time
- **Day/night indicators**: Visual sun/moon icons

### User Experience
- **Copy to clipboard**: One-click time copying
- **Toast notifications**: Visual feedback for actions
- **Smooth animations**: Polished transitions and effects
- **Responsive design**: Works in different popup sizes
- **Accessibility**: ARIA labels and keyboard navigation

## 📦 Distribution

### For Personal Use
- Load unpacked extension (see Installation)

### For Sharing
1. Create ZIP of extension files only
2. Share ZIP file
3. Recipients extract and load unpacked

### For Chrome Web Store (Future)
- Package extension as `.crx` or `.zip`
- Submit to Chrome Web Store
- Follow Chrome Web Store guidelines

## 🔒 Privacy

- **100% Offline**: No data collection
- **No Tracking**: No analytics or tracking
- **Local Storage Only**: Settings stored locally
- **No External Requests**: Works completely offline
- **Open Source**: Code is transparent and auditable

## 📄 License

This project is open source. Feel free to use, modify, and distribute.

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📞 Support

For issues or questions:
- Check the [Troubleshooting](#-troubleshooting) section
- Review error messages in browser console
- Check GitHub repository for updates

## 🎉 Enjoy!

Enjoy tracking time across multiple timezones with this beautiful extension!

---

**Made with ❤️ for global teams and travelers**
