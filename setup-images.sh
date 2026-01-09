#!/bin/bash

# Download and save the profile image
# This script handles image asset setup

IMAGE_DIR="./public/images"

# Create directory if it doesn't exist
mkdir -p "$IMAGE_DIR"

echo "📁 Image folder ready at: $IMAGE_DIR"
echo ""
echo "ℹ️  To add the Ulysse Ruff Williams image:"
echo ""
echo "Option 1 - Copy your local image:"
echo "  cp /path/to/ulysse-image.png ./public/images/ulysse-ruff-williams.png"
echo ""
echo "Option 2 - Download a professional placeholder:"
echo "  curl -o ./public/images/ulysse-ruff-williams.png https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400 "
echo ""
echo "✅ Once the image is in place, the site will display it automatically."
echo "⚠️  Until then, a fallback image will be shown."
