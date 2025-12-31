#!/usr/bin/env python3
"""
Convert PNG assets to JPEG format for Chrome Web Store submission.
Removes alpha channel and ensures 24-bit format.
"""

try:
    from PIL import Image
    import os
    import sys
except ImportError:
    print("Pillow is required. Install it with: pip install Pillow")
    sys.exit(1)

def convert_png_to_jpeg(input_path, output_path=None, quality=90):
    """Convert PNG to JPEG, removing alpha channel"""
    try:
        # Open PNG image
        img = Image.open(input_path)
        
        # Convert RGBA to RGB (removes alpha channel)
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Generate output filename if not provided
        if output_path is None:
            base_name = os.path.splitext(input_path)[0]
            output_path = f"{base_name}.jpg"
        
        # Save as JPEG
        img.save(output_path, 'JPEG', quality=quality, optimize=True)
        
        # Get file sizes
        input_size = os.path.getsize(input_path) / 1024  # KB
        output_size = os.path.getsize(output_path) / 1024  # KB
        
        print(f"[OK] Converted: {os.path.basename(input_path)} -> {os.path.basename(output_path)}")
        print(f"   Size: {input_size:.1f} KB -> {output_size:.1f} KB")
        print(f"   Dimensions: {img.size[0]}x{img.size[1]} pixels")
        
        return output_path
    except Exception as e:
        print(f"[ERROR] Error converting {input_path}: {e}")
        return None

def convert_directory(directory, recursive=False):
    """Convert all PNG files in a directory to JPEG"""
    converted = []
    failed = []
    
    if recursive:
        pattern = "**/*.png"
    else:
        pattern = "*.png"
    
    import glob
    png_files = glob.glob(os.path.join(directory, pattern), recursive=recursive)
    
    if not png_files:
        print(f"No PNG files found in {directory}")
        return converted, failed
    
    print(f"Found {len(png_files)} PNG file(s) to convert...\n")
    
    for png_file in png_files:
        # Skip if already has a corresponding JPG
        jpg_file = os.path.splitext(png_file)[0] + '.jpg'
        if os.path.exists(jpg_file):
            print(f"[SKIP] Skipping {os.path.basename(png_file)} (JPG already exists)")
            continue
        
        result = convert_png_to_jpeg(png_file)
        if result:
            converted.append(result)
        else:
            failed.append(png_file)
        print()
    
    return converted, failed

def main():
    print("PNG to JPEG Converter for Chrome Web Store Assets\n")
    print("=" * 60)
    
    # Check for command line arguments
    if len(sys.argv) > 1:
        input_path = sys.argv[1]
        if os.path.isfile(input_path):
            # Convert single file
            convert_png_to_jpeg(input_path)
        elif os.path.isdir(input_path):
            # Convert directory
            convert_directory(input_path, recursive=True)
        else:
            print(f"Error: {input_path} is not a valid file or directory")
            sys.exit(1)
    else:
        # Convert icons directory
        icons_dir = os.path.join(os.path.dirname(__file__), '..', 'icons')
        if os.path.exists(icons_dir):
            print(f"Converting PNG files in {icons_dir}...\n")
            converted, failed = convert_directory(icons_dir)
            
            print("\n" + "=" * 60)
            print(f"[SUCCESS] Successfully converted: {len(converted)} file(s)")
            if failed:
                print(f"[FAILED] Failed: {len(failed)} file(s)")
        else:
            print("No icons directory found.")
            print("\nUsage:")
            print("  python convert-assets.py <file_or_directory>")
            print("\nExamples:")
            print("  python convert-assets.py icon128.png")
            print("  python convert-assets.py icons/")
            print("  python convert-assets.py store-assets/")

if __name__ == "__main__":
    main()

