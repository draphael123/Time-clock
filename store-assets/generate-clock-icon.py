#!/usr/bin/env python3
"""
Generate a clock icon for Chrome Web Store
Creates a 128x128 pixel clock icon
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    import math
except ImportError:
    print("Pillow is required. Install it with: pip install Pillow")
    exit(1)

def create_clock_icon(size=128, output_path='icons/icon128-clock.png'):
    """Create a clock icon"""
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colors - using your extension's gradient colors
    background_color = (102, 126, 234, 255)  # #667eea
    secondary_color = (118, 75, 162, 255)  # #764ba2
    clock_face = (255, 255, 255, 255)  # White
    hour_hand_color = (51, 51, 51, 255)  # Dark gray
    minute_hand_color = (51, 51, 51, 255)  # Dark gray
    center_color = (102, 126, 234, 255)  # Blue center
    
    # Center point
    center = (size // 2, size // 2)
    radius = size // 2 - 8
    
    # Draw background circle (gradient for large, solid for small)
    if size >= 64:
        # For larger sizes, draw gradient
        steps = min(radius, 15)  # Limit steps for performance
        for i in range(steps):
            ratio = i / steps if steps > 0 else 0
            r = int(102 + (118 - 102) * ratio)
            g = int(126 + (75 - 126) * ratio)
            b = int(234 + (162 - 234) * ratio)
            outer_radius = radius - (i * radius // steps)
            if outer_radius > 0:
                x0 = max(0, center[0] - outer_radius)
                y0 = max(0, center[1] - outer_radius)
                x1 = min(size, center[0] + outer_radius)
                y1 = min(size, center[1] + outer_radius)
                if x1 > x0 and y1 > y0:
                    draw.ellipse([x0, y0, x1, y1], fill=(r, g, b, 255))
    else:
        # For small sizes, just draw solid color
        draw.ellipse(
            [center[0] - radius, center[1] - radius,
             center[0] + radius, center[1] + radius],
            fill=background_color
        )
    
    # Draw white clock face
    face_radius = radius - 4
    draw.ellipse(
        [center[0] - face_radius, center[1] - face_radius,
         center[0] + face_radius, center[1] + face_radius],
        fill=clock_face,
        outline=(200, 200, 200, 255),
        width=2
    )
    
    # Draw hour markers (12, 3, 6, 9) - adjust for size
    marker_length = max(4, size // 16)
    marker_width = max(2, size // 40)
    for hour in [12, 3, 6, 9]:
        angle = math.radians((hour * 30) - 90)  # Convert to radians, adjust for 12 o'clock
        start_radius = face_radius - marker_length
        end_radius = face_radius - max(1, size // 64)
        
        x1 = center[0] + start_radius * math.cos(angle)
        y1 = center[1] + start_radius * math.sin(angle)
        x2 = center[0] + end_radius * math.cos(angle)
        y2 = center[1] + end_radius * math.sin(angle)
        
        draw.line([(x1, y1), (x2, y2)], fill=hour_hand_color, width=marker_width)
    
    # Draw smaller hour markers (only for larger sizes)
    if size >= 48:
        for hour in range(1, 13):
            if hour not in [12, 3, 6, 9]:
                angle = math.radians((hour * 30) - 90)
                start_radius = face_radius - max(2, size // 32)
                end_radius = face_radius - max(1, size // 64)
                
                x1 = center[0] + start_radius * math.cos(angle)
                y1 = center[1] + start_radius * math.sin(angle)
                x2 = center[0] + end_radius * math.cos(angle)
                y2 = center[1] + end_radius * math.sin(angle)
                
                draw.line([(x1, y1), (x2, y2)], fill=hour_hand_color, width=max(1, size // 64))
    
    # Draw hour hand (pointing to 3)
    hour_angle = math.radians((3 * 30) - 90)
    hour_length = face_radius * 0.5
    hour_x = center[0] + hour_length * math.cos(hour_angle)
    hour_y = center[1] + hour_length * math.sin(hour_angle)
    draw.line([center, (hour_x, hour_y)], fill=hour_hand_color, width=max(2, size // 32))
    
    # Draw minute hand (pointing to 12)
    minute_angle = math.radians((12 * 30) - 90)
    minute_length = face_radius * 0.7
    minute_x = center[0] + minute_length * math.cos(minute_angle)
    minute_y = center[1] + minute_length * math.sin(minute_angle)
    draw.line([center, (minute_x, minute_y)], fill=minute_hand_color, width=max(2, size // 42))
    
    # Draw center circle
    center_radius = max(2, size // 32)
    draw.ellipse(
        [center[0] - center_radius, center[1] - center_radius,
         center[0] + center_radius, center[1] + center_radius],
        fill=center_color
    )
    
    # Save as PNG
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG')
    
    # Also save as JPEG (no alpha)
    jpeg_path = output_path.replace('.png', '.jpg')
    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
    rgb_img.paste(img, mask=img.split()[-1])
    rgb_img.save(jpeg_path, 'JPEG', quality=95)
    
    print(f"[OK] Created clock icon: {output_path}")
    print(f"[OK] Created clock icon (JPEG): {jpeg_path}")
    print(f"   Dimensions: {size}x{size} pixels")
    
    return output_path, jpeg_path

if __name__ == '__main__':
    print("Creating clock icon for Chrome Web Store...\n")
    
    # Create 128x128 icon (main store icon)
    png_path, jpg_path = create_clock_icon(128, 'icons/icon128-clock.png')
    
    print("\n[SUCCESS] Clock icon created successfully!")
    print("\nFiles created:")
    print("  - icons/icon128-clock.png")
    print("  - icons/icon128-clock.jpg")
    print("\nUse icon128-clock.jpg for Chrome Web Store!")
    print("   Size: 128x128 pixels")
    print("   Format: JPEG (no alpha channel)")

