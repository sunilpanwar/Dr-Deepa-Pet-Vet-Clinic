# How to Manage Articles

This guide explains how to add, edit, and manage educational articles on your Dr. Deepa Pet Vet Clinic website.

## Overview

The Articles section provides educational content about pet health, nutrition, preventive care, and more. Articles are stored in a JSON file and displayed dynamically on the website.

## File Location

Articles data is stored in: `data/articles.json`

## Article Structure

Each article in the JSON file has the following structure:

```json
{
    "id": 1,
    "title": "Article Title Here",
    "category": "health",
    "author": "Dr. Deepa",
    "date": "2024-03-15",
    "readTime": "5 min read",
    "image": "images/quiz/dog/golden-retriever.jpg",
    "excerpt": "A brief summary of the article (2-3 sentences)",
    "content": "Full article content goes here...",
    "tags": ["tag1", "tag2", "tag3"]
}
```

## Field Descriptions

- **id**: Unique number for each article (increment for new articles)
- **title**: The article headline (keep it clear and engaging)
- **category**: One of: `health`, `nutrition`, `preventive`, `dental`, `seasonal`
- **author**: Author name (typically "Dr. Deepa")
- **date**: Publication date in YYYY-MM-DD format
- **readTime**: Estimated reading time (e.g., "5 min read")
- **image**: Path to article image (relative to website root)
- **excerpt**: Brief summary shown on article cards (2-3 sentences)
- **content**: Full article text (see formatting guide below)
- **tags**: Array of relevant keywords for search/filtering

## Available Categories

1. **health** - General health topics, warning signs, emergency care
2. **nutrition** - Diet, feeding guidelines, food recommendations
3. **preventive** - Vaccinations, preventive care, wellness checks
4. **dental** - Dental health, oral care, teeth cleaning
5. **seasonal** - Seasonal care tips (summer, winter, monsoon)

## Content Formatting

The article content supports simple markdown-style formatting:

### Bold Text
Use `**text**` for bold:
```
**Important:** This text will be bold
```

### Headers
Use `**Header Text**` on its own line for section headers:
```
**Signs to Watch For**

This creates a header followed by content.
```

### Paragraphs
Separate paragraphs with blank lines:
```
First paragraph here.

Second paragraph here.
```

### Numbered Lists
Start lines with numbers:
```
1. **First Point:** Description here
2. **Second Point:** Description here
3. **Third Point:** Description here
```

### Bullet Lists
Start lines with `-` or `•`:
```
- First item
- Second item
- Third item
```

### Checklists
Use `✓` for yes/good items and `❌` for no/bad items:
```
✓ Good practice
✓ Another good practice
❌ Avoid this
❌ Don't do this
```

## Adding a New Article

1. Open `data/articles.json`
2. Find the last article in the array
3. Add a comma after the closing `}` of the last article
4. Copy this template and paste it:

```json
{
    "id": 7,
    "title": "Your Article Title",
    "category": "health",
    "author": "Dr. Deepa",
    "date": "2024-03-27",
    "readTime": "5 min read",
    "image": "images/quiz/dog/golden-retriever.jpg",
    "excerpt": "Brief summary of your article in 2-3 sentences.",
    "content": "Your full article content here.\n\n**Section Header**\n\nMore content...",
    "tags": ["keyword1", "keyword2", "keyword3"]
}
```

5. Update all fields with your content
6. Make sure the `id` is unique (increment from the last article)
7. Save the file

## Editing an Existing Article

1. Open `data/articles.json`
2. Find the article you want to edit (search by title or id)
3. Update the desired fields
4. Save the file
5. Refresh the website to see changes

## Deleting an Article

1. Open `data/articles.json`
2. Find the article you want to delete
3. Remove the entire article object (from `{` to `}`)
4. Remove the comma before or after it if needed
5. Save the file

**Important:** Make sure the JSON remains valid after deletion (no trailing commas, proper brackets).

## Image Guidelines

### Recommended Images
- Use existing images from `images/quiz/dog/` or `images/quiz/cat/`
- Or add new images to the `images/` folder
- Recommended size: 800x600 pixels or similar aspect ratio
- Format: JPG or PNG

### Image Paths
Always use relative paths from the website root:
```json
"image": "images/quiz/dog/golden-retriever.jpg"
```

## Tags Best Practices

- Use 3-5 relevant tags per article
- Keep tags lowercase
- Use specific keywords that users might search for
- Examples: "emergency", "dog health", "vaccination", "dental care"

## Example: Complete Article

```json
{
    "id": 7,
    "title": "Understanding Pet Allergies: Symptoms and Solutions",
    "category": "health",
    "author": "Dr. Deepa",
    "date": "2024-03-27",
    "readTime": "6 min read",
    "image": "images/quiz/dog/beagle.jpg",
    "excerpt": "Pet allergies are more common than you think. Learn to identify symptoms and discover effective treatment options for your furry friend.",
    "content": "Pet allergies can significantly impact your companion's quality of life. Understanding the signs and knowing when to seek help is crucial for every pet owner.\n\n**Common Allergy Symptoms**\n\n1. **Skin Issues:** Excessive scratching, red patches, or hot spots\n2. **Digestive Problems:** Vomiting or diarrhea after meals\n3. **Respiratory Signs:** Sneezing, coughing, or wheezing\n4. **Behavioral Changes:** Restlessness or irritability\n\n**Types of Allergies**\n\nPets can develop several types of allergies:\n\n- Food allergies (common proteins like chicken, beef, dairy)\n- Environmental allergies (pollen, dust mites, mold)\n- Flea allergy dermatitis\n- Contact allergies (certain fabrics, cleaning products)\n\n**Treatment Options**\n\n**Dietary Management:** Switching to hypoallergenic food can help identify food allergies. Work with your vet to find the right diet.\n\n**Medications:** Antihistamines, steroids, or immunotherapy may be prescribed depending on severity.\n\n**Environmental Control:** Regular cleaning, air purifiers, and limiting outdoor exposure during high pollen seasons.\n\n**When to See a Vet**\n\n✓ Persistent scratching for more than a week\n✓ Skin lesions or hair loss\n✓ Difficulty breathing\n✓ Severe digestive upset\n\n❌ Don't wait if symptoms worsen\n❌ Don't self-medicate without veterinary guidance\n\n**Prevention Tips**\n\nWhile not all allergies can be prevented, you can minimize risks:\n\n- Keep your home clean and dust-free\n- Use pet-safe cleaning products\n- Maintain regular grooming schedules\n- Provide high-quality, balanced nutrition\n- Schedule regular vet check-ups\n\n**Conclusion**\n\nAllergies are manageable with proper care and veterinary support. If you notice any concerning symptoms, don't hesitate to contact our clinic for a consultation.",
    "tags": ["allergies", "pet health", "symptoms", "treatment", "prevention"]
}
```

## Testing Your Changes

After adding or editing articles:

1. Save the `data/articles.json` file
2. Start your local server (see `START_SERVER.md`)
3. Open `articles.html` in your browser
4. Check that:
   - New articles appear in the grid
   - Filtering works correctly
   - Search finds your articles
   - Modal displays content properly
   - Images load correctly

## Common Issues

### Articles Not Showing
- Check JSON syntax (use a JSON validator)
- Ensure the file is saved
- Clear browser cache and refresh
- Check browser console for errors

### Images Not Loading
- Verify image path is correct
- Check that image file exists
- Use forward slashes `/` in paths
- Ensure image format is supported (JPG, PNG)

### Formatting Issues
- Use `\n\n` for paragraph breaks in JSON
- Escape special characters if needed
- Test content in modal view

## Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Validate your JSON at jsonlint.com
3. Compare your article structure with existing examples
4. Ensure your local server is running

## Related Files

- `articles.html` - Articles page template
- `js/load-articles.js` - JavaScript that loads and displays articles
- `css/styles.css` - Styling for articles section
- `includes/header.html` - Navigation (includes Articles link)

---

**Last Updated:** March 2024
**Maintained By:** Dr. Deepa Pet Vet Clinic