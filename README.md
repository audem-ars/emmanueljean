# EmmanuelJean - Luxury Portfolio Website

A sophisticated luxury portfolio website showcasing premium diamonds, luxury automobiles, precious commodities, advanced technology, and elite properties.

## 🌟 Features

- **Premium Design**: Silky smooth animations with diamond and gold color themes
- **Five Luxury Categories**: 
  - 💎 Premium Diamonds
  - 🏎️ Luxury Automobiles  
  - 🥇 Precious Commodities
  - ⚡ Advanced Technology
  - 🏰 Elite Properties
- **Media Upload**: Support for images and videos
- **Fully Responsive**: Optimized for all devices
- **Dynamic Effects**: Mouse-responsive background gradients
- **Contact System**: Built-in contact forms

## 🚀 Quick Start

### Option 1: Simple File Opening
1. Download all files
2. Open `index.html` in your web browser
3. That's it! The site will work locally.

### Option 2: With Live Server (Recommended)
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will open at `http://localhost:3000`

### Option 3: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📁 File Structure

```
emmanueljean-luxury-portfolio/
├── index.html                 # Main HTML file
├── css/
│   ├── styles.css            # Core styles and variables
│   ├── components.css        # Component-specific styles
│   └── responsive.css        # Mobile responsive styles
├── js/
│   ├── main.js              # Main application logic
│   ├── utils.js             # Utility functions
│   ├── router.js            # Client-side routing
│   └── components/
│       ├── header.js        # Header component
│       ├── footer.js        # Footer component
│       └── modal.js         # Modal functionality
├── assets/
│   ├── images/              # Image assets
│   └── videos/              # Video assets
├── package.json             # Project configuration
└── README.md               # This file
```

## 🎨 Design Features

### Color Palette
- **Primary**: Luxury Gold (#d4af37)
- **Secondary**: Diamond Silver (#c9d6ff) 
- **Accent**: Warm Bronze (#8b6f47)
- **Background**: Deep Black (#0a0a0a)

### Typography
- **Primary**: Playfair Display (serif) - for headings
- **Secondary**: Dancing Script (cursive) - for "Jean" in logo
- **Body**: Roboto (sans-serif) - for body text

### Animations
- Smooth 60fps animations using CSS transforms
- Hardware acceleration with `translate3d()`
- Dynamic mouse-responsive backgrounds
- Parallax scrolling effects

## 📱 Mobile Responsive

- **Desktop**: Full navigation and features
- **Tablet**: Adapted layouts and touch-friendly controls  
- **Mobile**: Hamburger menu and stacked layouts
- **Print**: Clean print styles for portfolios

## 🔧 Customization

### Adding New Items
1. Navigate to any category page
2. Use the "Upload Media" button for images/videos
3. Use "Add Item Details" for text information
4. Items are stored locally in browser storage

### Modifying Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
  --luxury-gold: #your-color;
  --diamond-silver: #your-color;
  /* etc... */
}
```

### Adding New Categories
1. Add new navigation link in `js/main.js`
2. Create new page template in `getCategoryPage()`
3. Add corresponding data structure in `this.items`

## 🌐 Contact Information

- **Phone**: +12407266550
- **Email**: contact@emmanueljean.com
- **Offices**: New York • Saudi Arabia • Monaco

## 🚀 Deployment

### Static Hosting (Recommended)
Upload all files to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Traditional web hosting

### No Build Process Required
This is a vanilla HTML/CSS/JavaScript project with no build dependencies.

## 📊 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Notes

- File uploads are handled client-side only (for demo)
- For production, implement server-side upload handling
- Add proper form validation and sanitization
- Consider adding HTTPS and security headers

## 📄 License

MIT License - feel free to customize for your luxury brand.

## 🛠 Development

### Local Development
```bash
# Start development server
npm run dev

# For production preview
npm run start
```

### File Organization
- Keep components modular in separate files
- CSS is split by purpose (base, components, responsive)
- JavaScript uses ES6 classes for organization

---

**Built for luxury. Designed for excellence.**