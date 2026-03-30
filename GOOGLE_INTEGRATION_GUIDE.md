# Google Integration Guide

This guide will help you integrate your actual Google Business reviews, location, and other Google features into your website.

## 📍 Google Maps Integration

### Current Setup
The website currently has a placeholder Google Maps embed. You need to replace it with your actual location.

### How to Add Your Google Maps Location:

1. **Go to Google Maps**: https://www.google.com/maps
2. **Search for your clinic** or enter your address
3. **Click "Share"** button
4. **Select "Embed a map"** tab
5. **Choose size** (Medium or Large recommended)
6. **Copy the iframe code**
7. **Replace the iframe** in [`index.html`](index.html) at line ~632

**Find this section in index.html:**
```html
<iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9373534567!2d72.8776559!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
    width="100%" 
    height="450" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade">
</iframe>
```

**Replace with your iframe code from Google Maps.**

---

## ⭐ Google Reviews Integration

### Option 1: Manual Integration (Current Setup)
The website currently has 6 sample testimonials. You can replace these with your actual Google reviews.

**Steps:**
1. Go to your Google Business Profile
2. Copy your actual reviews
3. Update the testimonials in [`index.html`](index.html) starting at line ~369

**Example testimonial structure:**
```html
<div class="testimonial-card">
    <div class="testimonial-header">
        <img src="images/client-1.jpg" alt="Client" onerror="this.src='https://ui-avatars.com/api/?name=Client+Name&background=4A90E2&color=fff'">
        <div class="testimonial-info">
            <h4>Client Name</h4>
            <div class="testimonial-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
        </div>
    </div>
    <p>"Your actual review text here"</p>
    <div class="testimonial-footer">
        <i class="fab fa-google"></i>
        <span>Google Review</span>
    </div>
</div>
```

### Option 2: Google Reviews Widget (Recommended)

For live, auto-updating reviews, you can use Google's official widget or third-party services:

#### A. Google Reviews Badge (Free)
1. Go to: https://www.google.com/business/
2. Get your Google Reviews badge code
3. Add it to your website

#### B. Elfsight Google Reviews Widget (Paid but Easy)
1. Visit: https://elfsight.com/google-reviews-widget/
2. Create a widget with your Google Business link
3. Copy the embed code
4. Add to your testimonials section

#### C. Custom API Integration (Advanced)
You can use Google Places API to fetch reviews dynamically:

```javascript
// Example using Google Places API
const placeId = 'YOUR_GOOGLE_PLACE_ID';
const apiKey = 'YOUR_GOOGLE_API_KEY';

fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        // Display reviews dynamically
        console.log(data.result.reviews);
    });
```

**Note:** This requires a Google Cloud Platform account and API key.

---

## 🔗 Using Your Google Business Link

Your Google Business link: `https://share.google/pcuUPNWvHFZ2LIPS5`

### Where to Add This Link:

1. **"Get Directions" Button** (Contact Section)
   - Find line ~641 in index.html
   - Replace the href with your link:
   ```html
   <a href="https://share.google/pcuUPNWvHFZ2LIPS5" target="_blank" class="btn btn-primary">
       <i class="fas fa-directions"></i> Get Directions
   </a>
   ```

2. **Footer Contact Section**
   - Add a "View on Google Maps" link in the footer

3. **Hero Section**
   - You can add a "View Reviews" button that links to your Google Business page

---

## 📊 Google Rating Display

### Update Your Actual Rating:

1. **Check your current Google rating** from your Google Business Profile
2. **Update in index.html** at these locations:

**Hero Section (line ~72):**
```html
<div class="google-rating-hero">
    <div class="rating-stars">
        <!-- Adjust stars based on your rating -->
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star-half-alt"></i> <!-- Use fa-star for full, fa-star-half-alt for half -->
    </div>
    <span class="rating-text">4.8/5 on Google Reviews</span> <!-- Update this -->
</div>
```

**Testimonials Section (line ~353):**
```html
<div class="rating-display">
    <div class="rating-stars-large">
        <!-- Update stars -->
    </div>
    <span class="rating-score">4.8 out of 5</span> <!-- Update this -->
    <span class="rating-count">Based on 250+ Google reviews</span> <!-- Update count -->
</div>
```

---

## 🖼️ Google Business Photos

You can use photos from your Google Business Profile:

1. **Download photos** from your Google Business dashboard
2. **Save them** in the `images/` folder
3. **Update image paths** in index.html

**Example locations:**
- Gallery section (line ~307-342)
- About section (line ~100)
- Pet care sections (line ~264, 280)

---

## 🔄 Auto-Updating Reviews (Advanced)

For automatically updating reviews without manual changes:

### Option 1: Use a Reviews Widget Service
- **Elfsight**: https://elfsight.com/google-reviews-widget/
- **Taggbox**: https://taggbox.com/widget/google-reviews-widget
- **EmbedSocial**: https://embedsocial.com/products/reviews/

### Option 2: Build Custom Integration
1. Get Google Places API key
2. Fetch reviews using the API
3. Display them dynamically with JavaScript

**Sample code location:** Add to `js/script.js`

---

## 📱 Google Business Profile Link

Add your Google Business profile link to:

1. **Social media section** in footer
2. **Contact section**
3. **"Leave a Review" button** (encourage customers to review)

**Example button:**
```html
<a href="https://share.google/pcuUPNWvHFZ2LIPS5" target="_blank" class="btn btn-primary">
    <i class="fab fa-google"></i> Leave a Review
</a>
```

---

## ✅ Quick Checklist

- [ ] Replace Google Maps iframe with your location
- [ ] Update Google rating numbers (current rating and review count)
- [ ] Replace sample testimonials with actual Google reviews
- [ ] Update "Get Directions" link to your Google Business link
- [ ] Add your actual clinic photos to images folder
- [ ] Update star ratings to match your actual rating
- [ ] Consider adding a "Leave a Review" button
- [ ] Optional: Integrate a reviews widget for auto-updates

---

## 🆘 Need Help?

If you need assistance with any of these integrations:

1. **Google Maps**: https://support.google.com/maps/answer/144361
2. **Google Business**: https://support.google.com/business/
3. **Google Places API**: https://developers.google.com/maps/documentation/places/web-service/overview

---

## 📝 Notes

- The website is designed to work with or without live Google integration
- Manual updates are perfectly fine for a static website
- For dynamic updates, consider using a reviews widget service
- Always test changes in a browser before deploying

**Your Google Business Link:** https://share.google/pcuUPNWvHFZ2LIPS5