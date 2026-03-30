# How to Manage Reviews

## Overview
Reviews are now managed through a JSON file, making it easy to add, edit, or remove reviews without touching the HTML code!

## 📁 File Location
```
data/reviews.json
```

## 📝 JSON Format

Each review has the following fields:

```json
{
  "name": "Customer Name",
  "rating": 5,
  "review": "The review text goes here...",
  "image": "URL to avatar image"
}
```

### Field Descriptions:

- **name**: Customer's full name (string)
- **rating**: Star rating (number: 1-5, can use decimals like 4.5)
- **review**: The review text (string)
- **image**: Avatar image URL (string)

## ✏️ How to Add a New Review

1. Open `data/reviews.json`
2. Add a new review object to the array:

```json
[
  {
    "name": "John Doe",
    "rating": 5,
    "review": "Amazing service! Dr. Deepa took great care of my dog.",
    "image": "https://ui-avatars.com/api/?name=John+Doe&background=4A90E2&color=fff"
  },
  {
    "name": "New Customer",
    "rating": 4.5,
    "review": "Very professional and caring staff!",
    "image": "https://ui-avatars.com/api/?name=New+Customer&background=E24A4A&color=fff"
  }
]
```

**Important:** Don't forget the comma between reviews!

## 🎨 Avatar Images

### Option 1: UI Avatars (Automatic)
Use this URL format to generate avatars automatically:
```
https://ui-avatars.com/api/?name=First+Last&background=COLOR&color=fff
```

**Color Options:**
- `4A90E2` - Blue
- `E24A4A` - Red
- `4AE290` - Green
- `E2A04A` - Orange
- `A04AE2` - Purple
- `4AE2E2` - Cyan

**Example:**
```
https://ui-avatars.com/api/?name=Sarah+Johnson&background=4A90E2&color=fff
```

### Option 2: Custom Images
Upload your own images to the `images/` folder and reference them:
```json
"image": "images/customer-photo.jpg"
```

## ⭐ Star Ratings

- **5 stars**: `"rating": 5`
- **4.5 stars**: `"rating": 4.5`
- **4 stars**: `"rating": 4`
- **3.5 stars**: `"rating": 3.5`
- **3 stars**: `"rating": 3`

The system automatically displays:
- Full stars (★)
- Half stars (½★)
- Empty stars (☆)

## 🗑️ How to Remove a Review

1. Open `data/reviews.json`
2. Delete the entire review object
3. Make sure to remove any extra commas

**Before:**
```json
[
  { "name": "Keep This", ... },
  { "name": "Delete This", ... },
  { "name": "Keep This Too", ... }
]
```

**After:**
```json
[
  { "name": "Keep This", ... },
  { "name": "Keep This Too", ... }
]
```

## ✏️ How to Edit a Review

1. Open `data/reviews.json`
2. Find the review you want to edit
3. Change the values:

```json
{
  "name": "Sarah Johnson",
  "rating": 5,
  "review": "Updated review text here!",
  "image": "https://ui-avatars.com/api/?name=Sarah+Johnson&background=4A90E2&color=fff"
}
```

## 📋 Complete Example

```json
[
  {
    "name": "Sarah Johnson",
    "rating": 5,
    "review": "Dr. Deepa is absolutely wonderful! She took such great care of my golden retriever Max.",
    "image": "https://ui-avatars.com/api/?name=Sarah+Johnson&background=4A90E2&color=fff"
  },
  {
    "name": "Rajesh Kumar",
    "rating": 5,
    "review": "My cat Whiskers had a serious health issue and Dr. Deepa diagnosed and treated it perfectly.",
    "image": "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=E24A4A&color=fff"
  },
  {
    "name": "Michael Brown",
    "rating": 4.5,
    "review": "Professional service and state-of-the-art facilities. My Labrador loves coming here!",
    "image": "https://ui-avatars.com/api/?name=Michael+Brown&background=E2A04A&color=fff"
  }
]
```

## 🔄 How Changes Appear

1. Edit `data/reviews.json`
2. Save the file
3. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
4. Reviews update automatically!

## ⚠️ Important Notes

1. **Valid JSON**: Make sure your JSON is valid (use a JSON validator if needed)
2. **Commas**: Don't forget commas between objects
3. **Quotes**: Always use double quotes `"` not single quotes `'`
4. **No trailing comma**: Don't put a comma after the last review
5. **Server Required**: You need to run a local server (see START_SERVER.md)

## 🎯 Benefits

✅ **Easy to manage** - No HTML editing required
✅ **Quick updates** - Just edit one file
✅ **No code knowledge needed** - Simple JSON format
✅ **Automatic display** - Reviews appear instantly
✅ **Carousel works** - Shows 3 reviews per page automatically

## 🆘 Troubleshooting

### Reviews not showing?
1. Check if `data/reviews.json` exists
2. Validate JSON syntax (use jsonlint.com)
3. Make sure you're running a local server
4. Check browser console for errors (F12)
5. Hard refresh the page (Ctrl+Shift+R)

### Invalid JSON error?
- Check for missing commas
- Check for extra commas
- Make sure all strings use double quotes
- Validate at jsonlint.com

## 📞 Need Help?

If you encounter issues:
1. Check the browser console (F12)
2. Validate your JSON at https://jsonlint.com/
3. Make sure the file is saved as `reviews.json` not `reviews.json.txt`