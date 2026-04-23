# Google Apps Script Web Form Setup Guide
## Host Your Story Submission Form Directly on Google

This is a **simpler alternative** to the POST API approach. The form is hosted by Google Apps Script, eliminating CORS issues and deployment URL problems.

---

## Benefits of This Approach

✅ **No CORS issues** - Form runs on Google's domain  
✅ **No deployment URL changes** - Same URL always works  
✅ **Direct sheet access** - No API calls needed  
✅ **Simpler setup** - Just upload HTML and deploy  
✅ **Always works** - No configuration needed on your website  

---

## Step 1: Upload Files to Apps Script

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. You should already have `Code.gs` from previous setup

### Add the HTML Form:

1. In Apps Script editor, click the **+** next to "Files"
2. Select **HTML**
3. Name it: `Form`
4. Delete the default content
5. Copy ALL content from `google-apps-script/Form.html` in your project
6. Paste it into the Form.html file
7. Click **Save** (💾)

### Update Code.gs:

1. Open `Code.gs` in Apps Script editor
2. Replace ALL the code with the updated version from `google-apps-script/Code.gs`
3. Click **Save** (💾)

---

## Step 2: Deploy as Web App

1. Click **Deploy** → **New deployment** (or **Manage deployments** if you already have one)
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description:** `Story Submission Form`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone`
5. Click **Deploy**
6. **Copy the Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/ABC123.../exec
   ```
7. Click **Done**

---

## Step 3: Update Your Website

Instead of opening a modal, link directly to the Google-hosted form.

### Option A: Update Share Story Button (Recommended)

Update your "Share Your Story" buttons to open the Google form:

```html
<!-- In your HTML files (index.html, stories.html, etc.) -->
<a href="YOUR_GOOGLE_FORM_URL_HERE" target="_blank" class="btn btn-primary">
    <i class="fas fa-plus-circle"></i> Share Your Story
</a>
```

### Option B: Open in Modal/iFrame

If you want to keep it embedded on your site:

```html
<iframe 
    src="YOUR_GOOGLE_FORM_URL_HERE" 
    width="100%" 
    height="800px" 
    frameborder="0"
    style="border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>
```

### Option C: Open in Popup Window

```javascript
function openStoryForm() {
    window.open(
        'YOUR_GOOGLE_FORM_URL_HERE',
        'Share Your Story',
        'width=900,height=800,scrollbars=yes,resizable=yes'
    );
}
```

---

## Step 4: Test the Form

1. Open the Web app URL in your browser
2. You should see the beautiful story submission form
3. Fill it out with test data
4. Click Submit
5. Check your Google Sheet - the submission should appear!

---

## How It Works

### User Flow:
1. User clicks "Share Your Story" on your website
2. Google-hosted form opens (new tab/popup/iframe)
3. User fills out the form
4. Form submits directly to Google Sheets
5. Success message appears
6. You receive email notification (if enabled)

### Technical Flow:
```
Your Website → Google Form URL → Google Apps Script → Google Sheets
```

**No API calls, no CORS, no configuration needed!**

---

## Customization

### Change Form Styling

Edit `Form.html` in Apps Script:
- Update colors in the `:root` CSS variables
- Modify layout and spacing
- Add your clinic logo
- Change fonts

### Add More Fields

1. Add HTML input in `Form.html`
2. Update `formData` object in the JavaScript
3. Update `rowData` array in `Code.gs` `submitStory()` function
4. Run `setup()` again to update sheet headers

### Customize Success Message

Edit the `onSuccess()` function in `Form.html`:
```javascript
function onSuccess(response) {
    // Customize this HTML
    document.getElementById('formContainer').innerHTML = `
        <div class="success-message">
            <!-- Your custom success message here -->
        </div>
    `;
}
```

---

## Advantages Over POST API

| Feature | POST API | Web Form |
|---------|----------|----------|
| CORS Issues | ❌ Yes | ✅ No |
| URL Changes | ❌ Yes | ✅ No |
| Configuration | ❌ Complex | ✅ Simple |
| Deployment | ❌ Needs secrets | ✅ Just deploy |
| Maintenance | ❌ High | ✅ Low |
| Works Offline | ❌ No | ✅ Yes |

---

## Updating the Form

When you need to make changes:

1. Edit `Form.html` or `Code.gs` in Apps Script
2. Click **Save**
3. Click **Deploy** → **Manage deployments**
4. Click edit icon (pencil)
5. Change **Version** to "New version"
6. Click **Deploy**

**The URL stays the same!** ✅

---

## Troubleshooting

### Form doesn't load
- Check deployment settings: Execute as "Me", Access "Anyone"
- Make sure Form.html file exists in Apps Script
- Check browser console for errors

### Submissions not appearing in sheet
- Run `setup()` function to create sheet headers
- Check Apps Script execution logs
- Verify sheet name is "Story Submissions"

### "Script function not found: submitStory"
- Make sure you updated Code.gs with the new `submitStory()` function
- Save and redeploy

### Form looks broken
- Check that ALL HTML from Form.html was copied
- Verify no syntax errors in the HTML
- Check browser console for CSS/JS errors

---

## Security Notes

- Form runs on Google's secure domain
- No sensitive data exposed
- Rate limiting still applies
- Email notifications still work
- You still control what gets published

---

## Comparison: Which Approach to Use?

### Use **Web Form** (This Guide) if:
- ✅ You want simplicity
- ✅ You don't mind users leaving your site
- ✅ You want zero configuration
- ✅ You want it to "just work"

### Use **POST API** (Previous Setup) if:
- ✅ You want users to stay on your site
- ✅ You want full control over the UI
- ✅ You need custom validation
- ✅ You want to integrate with other services

**Recommendation:** Start with Web Form for simplicity, switch to POST API later if needed.

---

## Next Steps

1. ✅ Upload Form.html to Apps Script
2. ✅ Update Code.gs with new functions
3. ✅ Deploy as Web app
4. ✅ Update your website links
5. ✅ Test the form
6. ✅ Share with pet owners!

---

**Last Updated:** March 2026  
**Created for:** Dr. Deepa Pet Vet Clinic