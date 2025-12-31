# PowerShell script to package Chrome extension
# Creates a ZIP file with only the necessary extension files

$extensionName = "World-Clock-Extension"
$version = "1.0.0"
$zipName = "$extensionName-v$version.zip"

Write-Host "Packaging Chrome Extension..." -ForegroundColor Green

# Files to include
$filesToInclude = @(
    "manifest.json",
    "popup.html",
    "popup.js",
    "popup.css",
    "icons"
)

# Check if all files exist
$missingFiles = @()
foreach ($file in $filesToInclude) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "Error: Missing required files:" -ForegroundColor Red
    foreach ($file in $missingFiles) {
        Write-Host "  - $file" -ForegroundColor Red
    }
    exit 1
}

# Remove old ZIP if exists
if (Test-Path $zipName) {
    Remove-Item $zipName -Force
    Write-Host "Removed old package: $zipName" -ForegroundColor Yellow
}

# Create temporary directory
$tempDir = "temp-extension-package"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy files
Write-Host "Copying files..." -ForegroundColor Cyan
Copy-Item "manifest.json" -Destination $tempDir
Copy-Item "popup.html" -Destination $tempDir
Copy-Item "popup.js" -Destination $tempDir
Copy-Item "popup.css" -Destination $tempDir
Copy-Item "icons" -Destination $tempDir -Recurse

# Create ZIP
Write-Host "Creating ZIP file..." -ForegroundColor Cyan
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipName -Force

# Cleanup
Remove-Item $tempDir -Recurse -Force

Write-Host "`n✅ Extension packaged successfully!" -ForegroundColor Green
Write-Host "📦 Package: $zipName" -ForegroundColor Cyan
Write-Host "`nTo install:" -ForegroundColor Yellow
Write-Host "1. Extract the ZIP file" -ForegroundColor White
Write-Host "2. Go to chrome://extensions/" -ForegroundColor White
Write-Host "3. Enable Developer mode" -ForegroundColor White
Write-Host "4. Click 'Load unpacked' and select the extracted folder" -ForegroundColor White

