#!/usr/bin/env python3
"""
HEIC to JPG conversion script using Python
Requires: pip install pillow-heif pillow
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:
    print("Required libraries not found. Installing...")
    os.system("pip3 install pillow pillow-heif")
    from PIL import Image
    import pillow_heif
    pillow_heif.register_heif_opener()

def convert_heic_to_jpg(input_dir):
    """Convert all HEIC files in directory to JPG"""
    input_path = Path(input_dir)
    if not input_path.exists():
        print(f"Directory not found: {input_dir}")
        return
    
    heic_files = list(input_path.glob("*.HEIC")) + list(input_path.glob("*.heic"))
    
    if not heic_files:
        print("No HEIC files found in directory")
        return
    
    print(f"Found {len(heic_files)} HEIC files to convert...")
    
    converted_count = 0
    for heic_file in heic_files:
        try:
            # Open HEIC image
            img = Image.open(heic_file)
            
            # Convert to RGB if necessary
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Generate output filename
            jpg_file = heic_file.with_suffix('.JPG')
            
            # Save as JPG
            img.save(jpg_file, 'JPEG', quality=85)
            print(f"✅ Converted: {heic_file.name} → {jpg_file.name}")
            converted_count += 1
            
        except Exception as e:
            print(f"❌ Failed to convert {heic_file.name}: {e}")
    
    print(f"\n🎉 Conversion complete! {converted_count}/{len(heic_files)} files converted successfully.")

if __name__ == "__main__":
    # Use current directory or provided path
    input_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    convert_heic_to_jpg(input_dir)