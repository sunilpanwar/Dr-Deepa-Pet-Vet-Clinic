# How to Manage Success Stories

This guide explains how to add, edit, or remove success stories from your website using the `data/stories.json` file.

## 📁 File Location

**`data/stories.json`** - Contains all success stories displayed on the stories page

## 📋 Story Structure

Each story in the JSON file has the following fields:

```json
{
    "id": 1,
    "title": "Max's Miraculous Recovery",
    "petName": "Max",
    "petType": "dog",
    "breed": "Golden Retriever",
    "age": "7 years old",
    "category": "recovery",
    "badge": "Recovery Story",
    "story": "Full story text here...",
    "date": "March 2024",
    "outcome": "Fully Recovered",
    "image": "images/stories/story-1.jpg",
    "fallbackImage": "https://images.unsplash.com/photo-..."
}
```

## 🔧 Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | Number | ✅ Yes | Unique identifier for the story |
| `title` | String | ✅ Yes | Story headline (e.g., "Max's Miraculous Recovery") |
| `petName` | String | ✅ Yes | Name of the pet |
| `petType` | String | ✅ Yes | Either "dog" or "cat" |
| `breed` | String | ✅ Yes | Pet breed (e.g., "Golden Retriever") |
| `age` | String | ✅ Yes | Pet's age (e.g., "7 years old") |
| `category` | String | ✅ Yes | Story category (see categories below) |
| `badge` | String | ✅ Yes | Badge text displayed on image |
| `story` | String | ✅ Yes | Full story text (2-3 sentences) |
| `date` | String | ✅ Yes | Treatment date or timeframe |
| `outcome` | String | ✅ Yes | Final outcome (e.g., "Fully Recovered") |
| `image` | String | ✅ Yes | Path to story image |
| `fallbackImage` | String | ✅ Yes | Backup image URL if main image fails |

## 📂 Story Categories

Use one of these categories for filtering:

- **`recovery`** - Recovery Story
- **`rescue`** - Rescue Story
- **`emergency`** - Emergency Save
- **`long-term`** - Long-term Care
- **`preventive`** - Preventive Care
- **`surgery`** - Surgery Success

## ➕ Adding a New Story

1. Open `data/stories.json`
2. Add a comma after the last story
3. Add your new story object:

```json
{
    "id": 7,
    "title": "Bella's Amazing Journey",
    "petName": "Bella",
    "petType": "dog",
    "breed": "Poodle",
    "age": "4 years old",
    "category": "recovery",
    "badge": "Recovery Story",
    "story": "Bella came to us with a broken leg. After surgery and rehabilitation, she's now running and playing like never before!",
    "date": "April 2024",
    "outcome": "Fully Healed",
    "image": "images/stories/story-7.jpg",
    "fallbackImage": "https://images.unsplash.com/photo-1234567890?w=600&h=400&fit=crop"
}
```

4. Save the file
5. Refresh the stories page

## ✏️ Editing an Existing Story

1. Open `data/stories.json`
2. Find the story by its `id`
3. Update the fields you want to change
4. Save the file
5. Refresh the page

## ❌ Removing a Story

1. Open `data/stories.json`
2. Find the story object you want to remove
3. Delete the entire object (including the comma)
4. Save the file
5. Refresh the page

## 🖼️ Adding Story Images

### Option 1: Local Images
1. Save your image in `images/stories/`
2. Name it descriptively (e.g., `story-7.jpg`)
3. Reference it in JSON: `"image": "images/stories/story-7.jpg"`

### Option 2: Online Images
Use a free image service like Unsplash:
```json
"fallbackImage": "https://images.unsplash.com/photo-1234567890?w=600&h=400&fit=crop"
```

## 📝 Example: Complete Story Entry

```json
{
    "id": 8,
    "title": "Charlie's Cancer Battle",
    "petName": "Charlie",
    "petType": "cat",
    "breed": "Maine Coon",
    "age": "8 years old",
    "category": "surgery",
    "badge": "Surgery Success",
    "story": "When Charlie was diagnosed with cancer, we immediately started treatment. After successful surgery and chemotherapy, Charlie is now cancer-free and enjoying life!",
    "date": "May 2024",
    "outcome": "Cancer-Free",
    "image": "images/stories/charlie.jpg",
    "fallbackImage": "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop"
}
```

## ⚠️ Important Notes

1. **Always use valid JSON format** - Use a JSON validator if unsure
2. **Unique IDs** - Each story must have a unique `id` number
3. **Commas** - Add commas between stories, but NOT after the last one
4. **Quotes** - All text values must be in double quotes `""`
5. **Image paths** - Use forward slashes `/` not backslashes `\`

## 🔍 Troubleshooting

### Stories Not Showing?
- Check browser console for errors (F12)
- Verify JSON syntax is correct
- Make sure you're running a local server
- Check that `load-stories.js` is loaded

### Images Not Loading?
- Verify image path is correct
- Check that image file exists
- Fallback image will show if main image fails

### Filtering Not Working?
- Ensure `category` matches one of the valid categories
- Check that category buttons have correct `data-filter` attributes

## 🌐 Hosting Stories Online

Similar to reviews, you can host `stories.json` online:

### GitHub Repository (Recommended)
1. Create a GitHub repository
2. Upload `stories.json`
3. Get the RAW URL
4. Update `js/load-stories.js` line 6:
```javascript
this.jsonUrl = 'https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/stories.json';
```

### Benefits:
- ✅ URL never changes
- ✅ Easy to edit on GitHub
- ✅ No code updates needed
- ✅ Free forever

## 📊 Story Statistics

The page automatically updates:
- Total story count
- Filtered story count
- Pagination based on number of stories

## 🎨 Customization

### Change Stories Per Page
Edit `js/stories-page.js` and modify the `itemsPerPage` value.

### Add New Categories
1. Add category to filter buttons in `stories.html`
2. Add corresponding option in share story form
3. Use the new category in `stories.json`

---

**Need Help?** Check the browser console (F12) for error messages or refer to `START_SERVER.md` for server setup instructions.