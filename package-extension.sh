#!/bin/bash
# Bash script to package Chrome extension
# Creates a ZIP file with only the necessary extension files

EXTENSION_NAME="World-Clock-Extension"
VERSION="1.0.0"
ZIP_NAME="${EXTENSION_NAME}-v${VERSION}.zip"

echo "Packaging Chrome Extension..."

# Files to include
FILES=("manifest.json" "popup.html" "popup.js" "popup.css" "icons")

# Check if all files exist
for file in "${FILES[@]}"; do
    if [ ! -e "$file" ]; then
        echo "Error: Missing required file: $file"
        exit 1
    fi
done

# Remove old ZIP if exists
if [ -f "$ZIP_NAME" ]; then
    rm "$ZIP_NAME"
    echo "Removed old package: $ZIP_NAME"
fi

# Create temporary directory
TEMP_DIR="temp-extension-package"
rm -rf "$TEMP_DIR"
mkdir "$TEMP_DIR"

# Copy files
echo "Copying files..."
cp manifest.json "$TEMP_DIR/"
cp popup.html "$TEMP_DIR/"
cp popup.js "$TEMP_DIR/"
cp popup.css "$TEMP_DIR/"
cp -r icons "$TEMP_DIR/"

# Create ZIP
echo "Creating ZIP file..."
cd "$TEMP_DIR"
zip -r "../$ZIP_NAME" . > /dev/null
cd ..
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Extension packaged successfully!"
echo "📦 Package: $ZIP_NAME"
echo ""
echo "To install:"
echo "1. Extract the ZIP file"
echo "2. Go to chrome://extensions/"
echo "3. Enable Developer mode"
echo "4. Click 'Load unpacked' and select the extracted folder"

