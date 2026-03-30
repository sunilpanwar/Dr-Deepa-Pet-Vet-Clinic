# Dr. Deepa Pet Vet Clinic Website

A beautiful, responsive static website for a veterinary clinic specializing in cat and dog care.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices (desktop, tablet, mobile)
- **Modern UI**: Clean and professional design with smooth animations
- **Google Integration**: 
  - Google Maps embedded for location
  - Google Reviews rating display (4.8/5 stars)
- **Interactive Elements**:
  - Mobile-friendly navigation menu
  - Smooth scrolling
  - FAQ accordion
  - Image gallery with modal view
  - Form validation
  - Scroll-to-top button
- **Comprehensive Sections**:
  - Hero section with call-to-action
  - About Dr. Deepa
  - Services offered
  - Pet care specialization (Cats & Dogs)
  - Photo gallery
  - Client testimonials
  - Appointment booking form
  - Contact information with map
  - FAQ section

## 📁 Project Structure

```
Dr-Deepa-Pet-Vet-Clinic/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles and responsive design
├── js/
│   └── script.js       # Interactive functionality
├── images/             # Image assets folder
└── README.md           # This file
```

## 🚀 Getting Started

### Option 1: Open Directly
1. Navigate to the project folder
2. Double-click `index.html` to open in your default browser

### Option 2: Use Live Server (Recommended)
1. Install a local server (e.g., VS Code Live Server extension)
2. Right-click on `index.html` and select "Open with Live Server"

### Option 3: Python Simple Server
```bash
# Navigate to project directory
cd /Users/c2096299/Documents/learningProjects/Dr-Deepa-Pet-Vet-Clinic

# Python 3
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## 🎨 Customization

### Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #4A90E2;    /* Main blue */
    --secondary-color: #50C878;   /* Green accent */
    --accent-color: #FF6B6B;      /* Red accent */
    /* ... more colors */
}
```

### Content
- **Clinic Information**: Edit contact details in `index.html`
- **Services**: Modify the services section
- **Testimonials**: Update client reviews
- **Google Maps**: Replace the iframe src with your actual location

### Images
Place your images in the `images/` folder and update the image paths in `index.html`:
- `vet-with-pet.jpg` - About section
- `dog-care.jpg` - Dog care section
- `cat-care.jpg` - Cat care section
- `gallery-1.jpg` through `gallery-6.jpg` - Gallery images
- `client-1.jpg` through `client-6.jpg` - Testimonial avatars

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1024px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Vanilla JS for interactivity
- **Font Awesome**: Icons
- **Google Fonts**: Poppins & Playfair Display

## ✨ Key Features Explained

### Google Rating Integration
The website displays a 4.8/5 star rating based on Google reviews. Update the rating in:
- Hero section
- Testimonials section header

### Google Maps
The embedded map shows the clinic location. To update:
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your location
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the iframe in the Contact section

### Appointment Form
The form includes:
- Client validation
- Date validation (prevents past dates)
- Email format validation
- Phone number validation
- Success/error notifications

### Mobile Menu
Automatically activates on screens below 768px with:
- Hamburger menu icon
- Slide-in navigation
- Click-outside-to-close functionality

## 🎯 SEO Optimization

The website includes:
- Meta descriptions
- Semantic HTML5 tags
- Alt text for images
- Proper heading hierarchy
- Mobile-friendly design

## 📞 Contact Information

Update these in `index.html`:
- **Phone**: +91 98765 43210
- **Emergency**: +91 98765 43211
- **Email**: info@drdeepapetvet.com
- **Address**: 123 Pet Care Street, Mumbai, Maharashtra 400001

## 🐾 Services Offered

1. General Checkups
2. Vaccinations
3. Surgery
4. Dental Care
5. Emergency Care (24/7)
6. Diagnostics
7. Grooming
8. Nutrition Counseling

## 📝 License

This is a template project for educational purposes.

## 🤝 Support

For questions or support, contact the clinic at:
- Email: info@drdeepapetvet.com
- Phone: +91 98765 43210

---

**Made with ❤️ for pet care**