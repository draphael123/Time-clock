#!/usr/bin/env python3
"""
Script to generate Filipino flag icons for the Chrome extension.
Requires PIL/Pillow: pip install Pillow
"""

try:
    from PIL import Image, ImageDraw
    import os
except ImportError:
    print("Pillow is required. Install it with: pip install Pillow")
    exit(1)

def create_filipino_flag_icon(size):
    """Create a Filipino flag icon at the specified size"""
    # Create image with white background
    img = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(img)
    
    # Flag colors
    blue = (0, 56, 168)  # #0038a8
    red = (206, 17, 38)  # #ce1126
    yellow = (252, 209, 22)  # #fcd116
    white = (255, 255, 255)
    
    # Draw top blue half
    draw.rectangle([0, 0, size, size//2], fill=blue)
    
    # Draw bottom red half
    draw.rectangle([0, size//2, size, size], fill=red)
    
    # Draw white triangle (left side)
    triangle_points = [
        (0, 0),
        (0, size),
        (size//2, size//2)
    ]
    draw.polygon(triangle_points, fill=white)
    
    # Draw sun (yellow circle)
    sun_radius = size // 8
    sun_center_x = size // 4
    sun_center_y = size // 4
    draw.ellipse(
        [sun_center_x - sun_radius, sun_center_y - sun_radius,
         sun_center_x + sun_radius, sun_center_y + sun_radius],
        fill=yellow
    )
    
    # Draw three stars (simplified as small circles for small sizes)
    star_size = max(2, size // 20)
    stars = [
        (sun_center_x + sun_radius + 5, sun_center_y - sun_radius//2),
        (sun_center_x + sun_radius + 5, sun_center_y),
        (sun_center_x + sun_radius + 5, sun_center_y + sun_radius//2),
    ]
    
    for star_x, star_y in stars:
        if size >= 48:  # Only draw stars for larger icons
            draw.ellipse(
                [star_x - star_size, star_y - star_size,
                 star_x + star_size, star_y + star_size],
                fill=yellow
            )
    
    return img

def main():
    # Create icons directory if it doesn't exist
    os.makedirs('icons', exist_ok=True)
    
    # Generate icons at different sizes
    sizes = [16, 48, 128]
    
    for size in sizes:
        icon = create_filipino_flag_icon(size)
        filename = f'icons/icon{size}.png'
        icon.save(filename, 'PNG')
        print(f'Created {filename}')
    
    print('\nAll icons created successfully!')

if __name__ == '__main__':
    main()

