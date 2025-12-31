# Generate Chrome Web Store Assets

Step-by-step guide to create the exact screenshots and images needed for Chrome Web Store submission.

## 📋 Required Assets

Based on the Chrome Web Store form, you need:

1. **Store Icon** - 128x128 pixels ✅ (Already have: `icons/icon128.png`)
2. **Screenshots** - 1280x800 or 640x400, JPEG or 24-bit PNG (no alpha), at least 1 required
3. **Small Promo Tile** - 440x280, JPEG or 24-bit PNG (no alpha)
4. **Marquee Promo Tile** - 1400x560, JPEG or 24-bit PNG (no alpha) - Optional

## 🎯 Step 1: Open Templates

1. Open `store-assets/create-assets.html` in Chrome
2. This page has links to all templates

## 📸 Step 2: Create Screenshots (1280x800 or 640x400)

### Method A: Using Chrome DevTools (Recommended)

1. **Open the screenshot template:**
   - Open `store-assets/screenshot-template.html` in Chrome
   - Or click the link in `create-assets.html`

2. **Take Full Page Screenshot:**
   - Press `F12` to open DevTools
   - Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
   - Type: `Capture full size screenshot`
   - Press Enter
   - Screenshot will download automatically

3. **Resize if needed:**
   - Required: 1280x800 or 640x400 pixels
   - Use image editor to resize if necessary

4. **Save as required format:**
   - Save as: **JPEG** or **24-bit PNG (no alpha)**
   - Name: `screenshot-1-main.jpg` or `screenshot-1-main.png`

### Method B: Using Browser Extension

1. Install a screenshot extension (like "Full Page Screen Capture")
2. Open the template HTML file
3. Take screenshot
4. Crop/resize to 1280x800 or 640x400
5. Save as JPEG or PNG

### Method C: Using Snipping Tool / Screenshot Tool

1. Open the template in Chrome
2. Use Windows Snipping Tool or Mac Screenshot
3. Capture the area
4. Resize to 1280x800 or 640x400
5. Save as JPEG or PNG

### Create Multiple Screenshots (Optional)

Create up to 5 screenshots:
- `screenshot-1-main.jpg` - Main extension view
- `screenshot-2-dark-mode.jpg` - Dark mode (use `screenshot-dark-mode.html`)
- `screenshot-3-settings.jpg` - Settings panel (take from actual extension)
- `screenshot-4-copy.jpg` - Copy feature (take from actual extension)
- `screenshot-5-compact.jpg` - Compact mode (take from actual extension)

## 🎨 Step 3: Create Small Promo Tile (440x280)

1. **Open the template:**
   - Open `store-assets/promo-tile-small.html` in Chrome

2. **Take Screenshot:**
   - Use Chrome DevTools: `F12` → `Ctrl+Shift+P` → "Capture node screenshot"
   - Or use browser zoom to make it fit, then screenshot
   - Or use image editor to create at exact size

3. **Verify dimensions:**
   - Must be exactly **440x280 pixels**

4. **Save:**
   - Save as: `promo-tile-small.jpg` or `promo-tile-small.png`
   - Format: JPEG or 24-bit PNG (no alpha)

## 🖼️ Step 4: Create Marquee Promo Tile (1400x560) - Optional

1. **Open the template:**
   - Open `store-assets/promo-tile-marquee.html` in Chrome

2. **Take Screenshot:**
   - Use Chrome DevTools full page screenshot
   - Or use image editor

3. **Verify dimensions:**
   - Must be exactly **1400x560 pixels**

4. **Save:**
   - Save as: `promo-tile-marquee.jpg` or `promo-tile-marquee.png`
   - Format: JPEG or 24-bit PNG (no alpha)

## ⚠️ Important Format Requirements

### File Format Rules:
- ✅ **JPEG** - Any JPEG file
- ✅ **24-bit PNG (no alpha)** - PNG without transparency
- ❌ **32-bit PNG with alpha** - NOT allowed (transparency not supported)

### How to Ensure No Alpha Channel:

**Using Image Editor (GIMP/Photoshop):**
1. Open your PNG file
2. Go to: Image → Mode → RGB (remove alpha channel)
3. Flatten image (remove transparency)
4. Save as PNG

**Using Online Tool:**
- Use: https://www.remove.bg/upload (then download as JPEG)
- Or: https://ezgif.com/png-to-jpg (convert PNG to JPEG)

**Using Command Line (ImageMagick):**
```bash
convert input.png -alpha off output.png
```

## 📁 File Organization

Create a folder structure:
```
store-assets/
├── screenshots/
│   ├── screenshot-1-main.jpg
│   ├── screenshot-2-dark-mode.jpg (optional)
│   └── ...
├── promo-tiles/
│   ├── promo-tile-small.jpg
│   └── promo-tile-marquee.jpg (optional)
└── icons/
    └── icon128.png (already have)
```

## ✅ Checklist Before Uploading

- [ ] Store icon: 128x128 pixels ✅ (already have)
- [ ] Screenshot 1: 1280x800 or 640x400, JPEG/PNG (no alpha)
- [ ] Screenshot 2-5: Optional additional screenshots
- [ ] Small promo tile: 440x280, JPEG/PNG (no alpha)
- [ ] Marquee promo tile: 1400x560, JPEG/PNG (no alpha) - Optional
- [ ] All files are under 1MB each
- [ ] All PNG files have no alpha channel (24-bit only)
- [ ] All dimensions are exact

## 🚀 Quick Start Commands

### Open All Templates:
1. Open `store-assets/create-assets.html` in Chrome
2. Click each template link
3. Take screenshots as described above

### Verify Dimensions:
- Right-click image → Properties → Check dimensions
- Or use image editor to verify

## 🛠️ Tools for Creating Assets

### Free Tools:
- **Chrome DevTools** - Built-in screenshot tool
- **GIMP** - Free image editor (remove alpha channel)
- **Photopea** - Free online Photoshop alternative
- **Canva** - Online design tool

### Paid Tools:
- **Adobe Photoshop**
- **Figma**

## 💡 Pro Tips

1. **Use Chrome DevTools** for exact dimensions
2. **Save as JPEG** to avoid alpha channel issues
3. **Keep file sizes under 1MB** each
4. **Use consistent styling** across all screenshots
5. **Show key features** clearly in screenshots
6. **Make promo tiles eye-catching** with your brand colors

## 📝 Next Steps

After creating all assets:

1. **Verify all files:**
   - Check dimensions are correct
   - Ensure no alpha channel in PNG files
   - Verify file sizes are reasonable

2. **Upload to Chrome Web Store:**
   - Go to Chrome Web Store Developer Dashboard
   - Upload each asset in the appropriate section
   - Follow the upload form requirements

3. **Test before submitting:**
   - Preview how assets look in the store
   - Make sure everything displays correctly

---

**Ready to create your assets?** Open `store-assets/create-assets.html` to get started!

