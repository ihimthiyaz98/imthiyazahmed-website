# Imthiyaz Ahmed - Photography Portfolio Website

A modern, interactive photography portfolio website featuring smooth scroll transitions, 3D elements, and an immersive browsing experience. Built with a purple color scheme and photography-specific 3D elements including a camera on gimbal and studio lighting setup.

## 🌟 Features

- **3D Interactive Elements** - Three.js powered camera on gimbal and studio lights
- **Smooth Scrolling** - GSAP ScrollTrigger for seamless navigation
- **Purple Color Scheme** - Dreamscape aesthetic with holographic effects
- **12 Portfolio Categories** - Events, Fashion, Product, Wedding, Commercial, Newborn/Toddler, Maternity, Outdoor, Portraits, Couples, Retouch, Lifestyle
- **Fully Responsive** - Mobile, tablet, and desktop optimized
- **Image Lightbox** - Full-size image viewing
- **Category Filtering** - Dynamic portfolio filtering system
- **Lazy Loading** - Optimized image loading for performance
- **Contact Form** - Integrated contact functionality
- **Modern Animations** - Fade-ins, parallax effects, and scroll-triggered animations

## 🚀 Live Demo

Visit the live site: [https://ihimthiyaz98.github.io/imthiyazahmed-website/](https://ihimthiyaz98.github.io/imthiyazahmed-website/)

## 📁 Project Structure

```
imthiyazahmed-website/
├── index.html                 # Main HTML file
├── css/
│   ├── style.css             # Main styles with purple color scheme
│   ├── animations.css        # Keyframe animations and effects
│   └── responsive.css        # Responsive design rules
├── js/
│   ├── main.js              # Main app logic and utilities
│   ├── scroll.js            # Smooth scrolling with GSAP
│   ├── threejs-scene.js     # 3D scene with camera and lights
│   └── portfolio.js         # Portfolio filtering and lightbox
├── assets/
│   ├── images/              # Photography portfolio images
│   └── models/              # 3D model files (if needed)
└── README.md                # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid, Flexbox, and CSS Variables
- **JavaScript (ES6+)** - Modern JavaScript features
- **Three.js** - 3D graphics and WebGL rendering
- **GSAP** - Animation library with ScrollTrigger
- **Google Fonts** - Poppins and Playfair Display

## 🎨 Color Scheme

The website uses a purple-themed color palette:

- Primary Purple: `#8b5cf6`
- Deep Purple: `#6d28d9`
- Light Purple: `#a78bfa`
- Violet: `#7c3aed`
- Lavender: `#c4b5fd`
- Magenta: `#c026d3`
- Accent Gold: `#fbbf24`
- Accent Teal: `#14b8a6`

## 📝 Customization Guide

### 1. Replace Placeholder Images

Replace the Unsplash placeholder images with your own photography:

1. Add your images to the `assets/images/` folder
2. Open `index.html`
3. Find the portfolio items and update the `src` attributes:

```html
<!-- Before -->
<img src="https://images.unsplash.com/photo-..." alt="Events Photography">

<!-- After -->
<img src="assets/images/events-01.jpg" alt="Events Photography">
```

### 2. Customize Colors

To change the color scheme, edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-purple: #8b5cf6;  /* Change to your preferred color */
    --deep-purple: #6d28d9;
    /* ... other colors */
}
```

### 3. Modify 3D Elements

To adjust the 3D scene, edit `js/threejs-scene.js`:

```javascript
// Change camera position
this.camera.position.z = 8; // Adjust distance

// Modify rotation speed
this.cameraModel.rotation.y += 0.002; // Change speed

// Adjust lighting colors
const mainLight = new THREE.DirectionalLight(0x8b5cf6, 0.8);
```

### 4. Update Contact Information

Edit the contact details in `index.html`:

```html
<div class="info-item">
    <h3>Email</h3>
    <p>your-email@example.com</p> <!-- Update here -->
</div>
```

### 5. Add More Portfolio Items

To add more portfolio items, copy this template in `index.html`:

```html
<div class="portfolio-item" data-category="your-category">
    <div class="portfolio-image">
        <img src="path/to/image.jpg" alt="Description" loading="lazy">
        <div class="portfolio-overlay">
            <h3>Category Name</h3>
        </div>
    </div>
</div>
```

### 6. Configure Contact Form

To connect the contact form to a backend service:

1. Open `js/main.js`
2. Find the `handleFormSubmission` method
3. Uncomment and configure the fetch API call:

```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
```

Or integrate with services like:
- **Formspree**: https://formspree.io/
- **EmailJS**: https://www.emailjs.com/
- **Netlify Forms**: https://www.netlify.com/products/forms/

## 🚀 Deployment to GitHub Pages

### Option 1: Automatic Deployment

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Click "Save"

3. Your site will be available at: `https://[username].github.io/[repository-name]/`

### Option 2: Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 🖥️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/ihimthiyaz98/imthiyazahmed-website.git
cd imthiyazahmed-website
```

2. Open `index.html` in your browser, or use a local server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server
```

**Using VS Code Live Server:**
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

3. Visit `http://localhost:8000` (or the port shown)

## ⚡ Performance Optimization

The website includes several performance optimizations:

- **Lazy Loading** - Images load only when needed
- **Hardware Acceleration** - GPU-accelerated animations
- **Efficient 3D Rendering** - Optimized Three.js scene
- **Debounced Events** - Optimized resize and scroll handlers
- **Minification Ready** - Code structure ready for minification

### To Further Optimize:

1. **Minify CSS and JavaScript:**
```bash
# Using online tools or build tools like:
npm install -g minify
minify css/style.css > css/style.min.css
```

2. **Compress Images:**
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Convert to WebP format for better compression

3. **Enable Caching:**
   - Configure your server to cache static assets
   - Add appropriate cache headers

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**WebGL Support Required** for 3D features. The site gracefully degrades on browsers without WebGL support.

## 🐛 Troubleshooting

### 3D Elements Not Showing

- Ensure WebGL is supported and enabled in your browser
- Check browser console for errors
- Try updating your graphics drivers

### Images Not Loading

- Check image paths are correct and relative
- Ensure images exist in the specified location
- Check browser console for 404 errors

### Animations Not Working

- Ensure GSAP library is loading correctly
- Check browser console for JavaScript errors
- Verify ScrollTrigger plugin is registered

### Mobile Menu Not Working

- Clear browser cache
- Check if JavaScript is enabled
- Verify no console errors

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Imthiyaz Ahmed**
- Website: [imthiyazahmed.com](https://ihimthiyaz98.github.io/imthiyazahmed-website/)
- GitHub: [@ihimthiyaz98](https://github.com/ihimthiyaz98)

## 🙏 Acknowledgments

- Inspiration: [masontywong.com](https://masontywong.com)
- Three.js community
- GSAP animation library
- Unsplash for placeholder images

## 📞 Support

For questions or support, please contact:
- Email: contact@imthiyazahmed.com
- Create an issue on GitHub

---

**Note:** Remember to replace all placeholder images with your actual photography work before deploying to production. The current images are from Unsplash and are for demonstration purposes only.