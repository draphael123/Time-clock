# Converted Assets Summary

## ✅ Successfully Converted to JPEG

### Icons (in `icons/` folder):
- ✅ `icon128.png` → `icon128.jpg` (128x128 pixels) - **Use this for Chrome Web Store**
- ✅ `icon16.png` → `icon16.jpg` (16x16 pixels)
- ✅ `icon48.png` → `icon48.jpg` (48x48 pixels)

## 📋 For Chrome Web Store Submission

### Store Icon (REQUIRED):
- **File:** `icons/icon128.jpg`
- **Size:** 128x128 pixels ✅
- **Format:** JPEG ✅ (no alpha channel)
- **Ready to upload!**

### Screenshots (REQUIRED - At least 1):
You still need to create these from the HTML templates:
1. Open `store-assets/screenshot-template.html` in Chrome
2. Take screenshot (F12 → Ctrl+Shift+P → "Capture full size screenshot")
3. Save as `screenshot-1.jpg` (1280x800 or 640x400)

### Small Promo Tile (REQUIRED):
1. Open `store-assets/promo-tile-small.html` in Chrome
2. Take screenshot
3. Save as `promo-tile-small.jpg` (440x280)

### Marquee Promo Tile (OPTIONAL):
1. Open `store-assets/promo-tile-marquee.html` in Chrome
2. Take screenshot
3. Save as `promo-tile-marquee.jpg` (1400x560)

## 🛠️ Conversion Tool

To convert more PNG files to JPEG:
```bash
python store-assets/convert-assets.py <file_or_directory>
```

Examples:
```bash
# Convert single file
python store-assets/convert-assets.py icon128.png

# Convert all PNGs in a directory
python store-assets/convert-assets.py icons/

# Convert all PNGs recursively
python store-assets/convert-assets.py store-assets/
```

## ✅ Checklist

- [x] Store icon converted to JPEG (icon128.jpg)
- [ ] Screenshot 1 created (1280x800 or 640x400)
- [ ] Small promo tile created (440x280)
- [ ] Marquee promo tile created (1400x560) - Optional

---

**Next Step:** Create screenshots from the HTML templates in `store-assets/` folder!

