# Quick Guide: Create Chrome Web Store Assets

## 🎯 What You Need (From the Form)

1. **Store Icon** - 128x128 ✅ (You have: `icons/icon128.png`)
2. **Screenshots** - 1280x800 or 640x400, JPEG/PNG (no alpha), **at least 1 required**
3. **Small Promo Tile** - 440x280, JPEG/PNG (no alpha)
4. **Marquee Promo Tile** - 1400x560, JPEG/PNG (no alpha) - Optional

## ⚡ Quick Steps

### 1. Create Screenshots (REQUIRED - At least 1)

**Option A: From HTML Template**
1. Open `store-assets/screenshot-template.html` in Chrome
2. Press `F12` → `Ctrl+Shift+P` → Type "Capture full size screenshot"
3. Save as `screenshot-1.jpg` (JPEG format)

**Option B: From Your Actual Extension**
1. Open your extension popup
2. Take screenshot (Win+Shift+S or Cmd+Shift+4)
3. Resize to 1280x800 or 640x400
4. Save as JPEG

### 2. Create Small Promo Tile (REQUIRED)

1. Open `store-assets/promo-tile-small.html` in Chrome
2. Use Chrome DevTools to screenshot
3. Or use image editor to create at exactly 440x280
4. Save as `promo-tile-small.jpg`

### 3. Create Marquee Promo Tile (OPTIONAL)

1. Open `store-assets/promo-tile-marquee.html` in Chrome
2. Take full page screenshot
3. Save as `promo-tile-marquee.jpg`

### 4. Remove Alpha Channel (If Using PNG)

If you have PNG files with transparency:
1. Open `store-assets/convert-to-jpeg.html`
2. Upload your PNG
3. Click "Convert to JPEG"
4. Download the converted file

## 📋 Format Requirements

- ✅ **JPEG** - Always safe, no alpha channel
- ✅ **24-bit PNG** - Must have NO transparency
- ❌ **32-bit PNG with alpha** - NOT allowed

**Recommendation:** Use JPEG format to avoid alpha channel issues.

## ✅ Final Checklist

Before uploading to Chrome Web Store:

- [ ] Store icon: 128x128 ✅ (icons/icon128.png)
- [ ] Screenshot 1: 1280x800 or 640x400, JPEG format
- [ ] Small promo tile: 440x280, JPEG format
- [ ] All files are JPEG (or 24-bit PNG with no alpha)
- [ ] All files are under 1MB
- [ ] Dimensions are exact

## 🚀 Start Here

1. **Open:** `store-assets/create-assets.html`
2. **Click links** to open each template
3. **Take screenshots** as described
4. **Save as JPEG** format
5. **Upload to Chrome Web Store!**

---

**Need help?** See `GENERATE_ASSETS.md` for detailed instructions.

