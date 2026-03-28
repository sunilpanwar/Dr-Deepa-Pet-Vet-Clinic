# How to Add Success Stories from Submissions

This guide explains how to add new success stories to your website from user submissions.

## Overview

When users submit stories through the "Share Your Story" form:
1. Their default email client opens with a pre-formatted email
2. The email contains all story details and ready-to-use HTML code
3. You review the submission and add it to your website manually

## Step-by-Step Process

### Step 1: Receive Submission Email

When a user submits a story, you'll receive an email with:
- Story category, title, and content
- Pet information (name, type, breed, age)
- Owner information (name, email)
- Treatment date and outcome
- Ready-to-use HTML code

### Step 2: Save the Pet Image

1. Ask the user to email you the pet photo separately (or they can attach it to the submission email)
2. Save the image to: `/images/stories/`
3. Name it sequentially: `story-7.jpg`, `story-8.jpg`, etc.
4. Recommended image size: 600x400 pixels
5. Supported formats: JPG, PNG, WebP

**Image Directory Structure:**
```
/images/stories/
├── story-1.jpg
├── story-2.jpg
├── story-3.jpg
└── story-7.jpg (new story)
```

### Step 3: Add Story to Website

1. Open `stories.html` in your code editor
2. Find the stories grid section (around line 200)
3. Copy the HTML code from the submission email
4. Paste it into the `<div class="stories-grid">` section
5. Update the image path to match your saved image

**Example HTML to add:**
```html
<div class="story-card" data-category="recovery">
    <div class="story-image">
        <img src="images/stories/story-7.jpg" alt="Bella the Labrador">
        <div class="story-badge">Recovery Story</div>
    </div>
    <div class="story-content">
        <h3>Bella's Amazing Recovery</h3>
        <p class="story-meta"><i class="fas fa-dog"></i> Labrador • 5 years old</p>
        <p class="story-text">Story content here...</p>
        <div class="story-footer">
            <span class="story-date"><i class="fas fa-calendar"></i> March 2024</span>
            <span class="story-outcome"><i class="fas fa-heart"></i> Fully Recovered</span>
        </div>
    </div>
</div>
```

### Step 4: Update Homepage (Optional)

If you want to feature the story on the homepage:

1. Open `index.html`
2. Find the Success Stories section (around line 350)
3. Replace one of the existing featured stories with the new one
4. Keep only 2 stories on the homepage (featured stories)

### Step 5: Upload Changes

1. Save all files
2. Upload to your web server:
   - `stories.html` (updated with new story)
   - `images/stories/story-X.jpg` (new image)
   - `index.html` (if you updated featured stories)

## Story Categories

Use these category values in `data-category`:
- `recovery` - Recovery Story
- `rescue` - Rescue Story
- `emergency` - Emergency Save
- `long-term` - Long-term Care
- `preventive` - Preventive Care
- `surgery` - Surgery Success

## Pet Type Icons

Use these Font Awesome icons:
- Dog: `<i class="fas fa-dog"></i>`
- Cat: `<i class="fas fa-cat"></i>`

## Tips for Quality Stories

### Before Publishing:
- ✅ Review story for grammar and clarity
- ✅ Ensure image is high quality and appropriate
- ✅ Verify all information is accurate
- ✅ Get owner's final approval if needed
- ✅ Optimize image size (compress if over 500KB)

### Story Guidelines:
- Keep stories between 100-300 words
- Focus on the journey and outcome
- Include specific details (treatment, recovery time)
- Maintain positive, hopeful tone
- Respect privacy (use first names only if preferred)

## Troubleshooting

### Image Not Showing?
- Check file path is correct: `images/stories/story-X.jpg`
- Verify image file exists in the correct folder
- Ensure image filename matches HTML code
- Check image file extension (jpg, png, webp)

### Story Not Filtering Correctly?
- Verify `data-category` attribute matches one of the valid categories
- Check spelling of category value
- Ensure category is lowercase

### Layout Issues?
- Make sure you copied the complete HTML structure
- Check all opening and closing tags are present
- Verify no extra or missing `</div>` tags

## Automated Solutions (Future)

For automatic story submission handling, you would need:
1. **Backend Server** (PHP, Node.js, Python)
2. **Database** (MySQL, MongoDB)
3. **File Upload System**
4. **Admin Panel** for approval

This would allow:
- Automatic email notifications
- Story approval workflow
- Automatic image upload and optimization
- Direct publishing to website

## Contact

For questions about adding stories, contact your web developer or refer to the website documentation.

---

**Last Updated:** March 2024
**Version:** 1.0