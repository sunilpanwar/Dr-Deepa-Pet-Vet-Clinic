# Common Header Usage Guide

This guide explains how to use the common header component across all pages in the Dr. Deepa Pet Vet Clinic website.

## 📁 Files Created

1. **`includes/header.html`** - Common header HTML template
2. **`js/header-loader.js`** - JavaScript to load and manage the header

## 🎯 Benefits

✅ **Consistent Navigation** - All pages have identical navigation menus
✅ **Easy Maintenance** - Update header once, applies to all pages
✅ **Automatic Active States** - Current page is automatically highlighted
✅ **Mobile Responsive** - Mobile menu works automatically
✅ **Future-Proof** - Easy to add new pages

## 🚀 How to Use

### For New Pages

When creating a new page, follow these steps:

1. **Remove the old header** from your HTML (lines 16-44 in index.html or 367-391 in stories.html)

2. **Add the header loader script** in the `<head>` section BEFORE other scripts:

```html
<head>
    <!-- ... other head content ... -->
    <script src="js/header-loader.js"></script>
</head>
```

3. **That's it!** The header will load automatically when the page loads.

### Example: Converting index.html

**BEFORE:**
```html
<body>
    <!-- Header & Navigation -->
    <header class="header">
        <nav class="navbar">
            <!-- ... lots of header code ... -->
        </nav>
    </header>
    
    <!-- Hero Section -->
    <section id="home" class="hero">
```

**AFTER:**
```html
<head>
    <!-- ... existing head content ... -->
    <script src="js/header-loader.js"></script>
</head>
<body>
    <!-- Header loads automatically here -->
    
    <!-- Hero Section -->
    <section id="home" class="hero">
```

## 📋 Navigation Menu Structure

The common header includes these navigation items:

| Link | Destination | Description |
|------|-------------|-------------|
| Home | `index.html` | Homepage |
| About | `index.html#about` | About section |
| Services | `index.html#services` | Services section |
| Gallery | `index.html#gallery` | Gallery section |
| Stories | `stories.html` | Success stories page |
| Quiz | `index.html#breed-quiz` | Pet breed quiz |
| Reviews | `index.html#testimonials` | Testimonials section |
| Contact | `index.html#contact` | Contact section |

## 🎨 Active Link Highlighting

The header automatically highlights the current page/section:

- **On index.html**: Highlights based on scroll position and hash
- **On stories.html**: Highlights "Stories" link
- **On other pages**: Highlights the corresponding link

## 📱 Mobile Menu

The mobile menu works automatically:

- Click hamburger icon to open/close
- Click any link to close menu
- Click outside menu to close
- Responsive breakpoint: 768px

## 🔧 Customization

### To Add a New Navigation Item

Edit `includes/header.html`:

```html
<ul class="nav-menu">
    <!-- ... existing items ... -->
    <li><a href="new-page.html" class="nav-link" data-page="new-page">New Page</a></li>
</ul>
```

### To Change Navigation Order

Simply reorder the `<li>` items in `includes/header.html`.

### To Update Logo or Branding

Edit the logo section in `includes/header.html`:

```html
<div class="logo">
    <i class="fas fa-paw"></i>
    <span>Dr. Deepa Pet Vet Clinic</span>
</div>
```

## 🐛 Troubleshooting

### Header Not Loading?

1. **Check file path**: Ensure `includes/header.html` exists
2. **Check script path**: Verify `js/header-loader.js` is loaded
3. **Check console**: Open browser DevTools for error messages
4. **Server required**: Must run on local server (not file://)

### Active Link Not Highlighting?

1. **Check data-page attribute**: Ensure it matches the page name
2. **Check file naming**: Page files should match the data-page value
3. **Clear cache**: Browser might be caching old JavaScript

### Mobile Menu Not Working?

1. **Check script loading**: Ensure header-loader.js loads before other scripts
2. **Check CSS**: Ensure styles.css is loaded
3. **Check viewport**: Ensure viewport meta tag is present

## 📝 Migration Checklist

To migrate existing pages to use the common header:

- [ ] Create `includes/` directory if it doesn't exist
- [ ] Copy `header.html` to `includes/` folder
- [ ] Copy `header-loader.js` to `js/` folder
- [ ] Remove old header HTML from each page
- [ ] Add `<script src="js/header-loader.js"></script>` to each page's `<head>`
- [ ] Test each page to ensure header loads correctly
- [ ] Verify active link highlighting works
- [ ] Test mobile menu functionality
- [ ] Check all navigation links work correctly

## 🎓 Best Practices

1. **Always use relative paths** in navigation links
2. **Keep header.html simple** - only navigation structure
3. **Don't modify header-loader.js** unless necessary
4. **Test on local server** before deploying
5. **Clear browser cache** when testing changes

## 🔄 Future Updates

When you need to update the header:

1. Edit `includes/header.html`
2. Save the file
3. Refresh any page - all pages will have the updated header!

No need to edit multiple HTML files! 🎉

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Verify all files are in correct locations
3. Ensure you're running on a local server
4. Review this guide for common solutions

---

**Last Updated**: March 2024
**Version**: 1.0