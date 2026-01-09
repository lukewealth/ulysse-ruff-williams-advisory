# Image Setup Instructions

## Ulysse Ruff Williams Profile Image

The application is now configured to display the professional headshot with automatic fallback support.

### ✅ Current Configuration

1. **Hero.tsx** - Points to `/images/ulysse-ruff-williams.png`
2. **TeamPage.tsx** - Points to `/images/ulysse-ruff-williams.png`
3. **Fallback Support** - If image not found, displays professional placeholder

### 🖼️ Setting Up the Image

The application looks for the image at:
```
/public/images/ulysse-ruff-williams.png
```

#### Quick Setup

```bash
# Navigate to project root
cd /Users/Apple/Downloads/ulysse-ruff-williams-advisory

# Copy your image file
cp /path/to/your/image.png ./public/images/ulysse-ruff-williams.png
```

#### What to Do with Your Provided Image

1. **Export/Save** the provided headshot image as PNG format
2. **Name it** `ulysse-ruff-williams.png`
3. **Place it** in the `public/images/` folder

### 📋 File Format

- **Format**: PNG (recommended), JPG also works
- **Dimensions**: Best at 4:5 aspect ratio (e.g., 400×500px, 600×750px)
- **File Size**: Keep under 500KB for optimal performance
- **Color**: Color or grayscale (styling applied automatically)

### 🎨 Image Display Behavior

#### Hero Section (Landing Page)
- Displays without filters initially
- Loads from `/images/ulysse-ruff-williams.png`
- **Fallback**: Uses professional Unsplash image if not found

#### Team Page
- Shows with grayscale filter
- Hover effect: Removes grayscale for color effect
- Loads from `/images/ulysse-ruff-williams.png`
- **Fallback**: Professional placeholder image

### 🧪 Testing

After adding the image:

```bash
# Start the development server
npm run dev
```

Visit:
- **Homepage**: http://localhost:5173 (look for hero image on right)
- **Team Page**: http://localhost:5173/team (top profile card)

### ✨ Image Features

- **Responsive**: Adapts to mobile and desktop
- **Lazy Loading**: Optimized for performance
- **Error Handling**: Automatic fallback if missing
- **Styling**: Professional rounded corners and shadows
- **Accessibility**: Proper alt text for screen readers

### 📝 Technical Details

The code includes error handling that automatically:
- Falls back to Unsplash placeholder if PNG not found
- Shows alt text for accessibility
- Maintains aspect ratio
- Applies CSS styling (grayscale, hover effects)

### ✅ Current Status

- ✅ Code configured for `/images/ulysse-ruff-williams.png`
- ✅ Fallback images working
- ⏳ Waiting for your image file in `public/images/`
- ✅ Ready for production once image added

### 🔧 Manual File Copy (If Needed)

Using macOS Finder:
1. Open Finder
2. Navigate to: `/Users/Apple/Downloads/ulysse-ruff-williams-advisory/public/images/`
3. Drag and drop your image file into this folder
4. Ensure file is named: `ulysse-ruff-williams.png`
5. Refresh browser (or restart dev server)

### 📞 Troubleshooting

**Image still not showing?**
1. Check file is in `public/images/ulysse-ruff-williams.png`
2. Verify file name spelling (case-sensitive)
3. Ensure file is PNG or JPG format
4. Restart dev server: `npm run dev`

**Want to test with placeholder?**
- The fallback image will display automatically
- No action needed, just refresh the page

---

**Last Updated**: January 9, 2026  
**Status**: Ready for image deployment
