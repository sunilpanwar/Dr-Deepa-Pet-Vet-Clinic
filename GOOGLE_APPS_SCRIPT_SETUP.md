# Google Apps Script Setup Guide
## Collect Story Submissions to Google Sheets

This guide will help you set up Google Apps Script to collect story submissions from your website and store them in Google Sheets for review and moderation.

---

## Overview

**What this does:**
- Collects story submissions from your website
- Stores them in Google Sheets for review
- Allows you to approve/reject submissions
- Exports approved stories to JSON format
- No server or database required!

**Benefits:**
- ✅ Free to use
- ✅ Easy moderation workflow
- ✅ Spam protection
- ✅ Email notifications (optional)
- ✅ Export to JSON with one click

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it: `Dr Deepa Pet Vet - Story Submissions`
4. Keep this tab open

---

## Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. A new tab will open with the Apps Script editor
3. You'll see a file called `   .gs` with some default code
4. Delete all the default code

---

## Step 3: Add the Script Code

1. Copy ALL the code from `google-apps-script/Code.gs` in your project
2. Paste it into the Apps Script editor (replacing any existing code)
3. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
4. Name your project: `Story Submission Handler`

---

## Step 4: Run Initial Setup

1. In the Apps Script editor, find the function dropdown (it says "Select function")
2. Select **`setup`** from the dropdown
3. Click the **Run** button (▶️)
4. **First time only:** You'll see an authorization prompt:
   - Click **Review Permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to Story Submission Handler (unsafe)**
   - Click **Allow**
5. Wait for the script to finish (you'll see "Execution completed" in the log)
6. Go back to your Google Sheet tab and refresh the page

**You should now see two sheets:**
- `Story Submissions` - For new submissions
- `Approved Stories` - For approved stories ready to publish

---

## Step 5: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description:** `Story Submission Endpoint`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone`
5. Click **Deploy**
6. **Important:** Copy the **Web app URL** that appears
   - It will look like: `https://script.google.com/macros/s/ABC123.../exec`
   - Save this URL - you'll need it in Step 6!
7. Click **Done**

---

## Step 6: Update Your Website

### Option A: Update the Share Story Modal (Recommended)

1. Open `js/share-story-modal.js` in your project
2. Find the line that says `const FORM_ENDPOINT = 'YOUR_GOOGLE_APPS_SCRIPT_URL';`
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with the Web app URL from Step 5
4. Save the file

### Option B: Manual Update

If you don't have the file yet, add this to your form submission code:

```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';

async function submitStory(formData) {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Show success message
        alert('Thank you for sharing your story! We will review it soon.');
    } catch (error) {
        console.error('Error:', error);
        alert('Sorry, there was an error. Please try again.');
    }
}
```

---

## Step 7: Test the Submission

1. Go to your website
2. Click "Share Your Story"
3. Fill out the form with test data
4. Click Submit
5. Go back to your Google Sheet
6. Check the "Story Submissions" sheet - you should see your test submission!

---

## How to Use: Moderating Stories

### Reviewing Submissions

1. Open your Google Sheet
2. Go to the **Story Submissions** sheet
3. You'll see all submissions with:
   - Timestamp
   - Status (Pending/Approved/Rejected)
   - Pet details
   - Story content
   - Contact info

### Approving a Story

**Method 1: Using the Script (Recommended)**
1. Note the row number of the story you want to approve (e.g., row 2)
2. In Apps Script editor, select function: `approveStory`
3. Click **Run**
4. When prompted, enter the row number
5. The story will be moved to "Approved Stories" sheet

**Method 2: Manual**
1. Change the Status column to "Approved"
2. Copy the row data
3. Paste it into the "Approved Stories" sheet
4. Assign it an ID number

### Rejecting a Story

1. Note the row number
2. In Apps Script editor, select function: `rejectStory`
3. Click **Run**
4. Enter the row number
5. Status will change to "Rejected"

---

## Step 8: Export to JSON

Once you have approved stories, export them to your website:

1. In your Google Sheet, click **Story Management** → **Export Approved Stories to JSON**
   - (If you don't see this menu, refresh the page)
2. The script will run and generate JSON
3. In Apps Script editor, click **View** → **Logs**
4. You'll see the JSON output between `=== APPROVED STORIES JSON ===` markers
5. Copy the entire JSON array
6. Open `data/stories.json` in your project
7. Paste the JSON (replacing the existing content)
8. Save the file
9. Upload to your website

**Your approved stories are now live on your website!**

---

## Optional: Email Notifications

To receive an email when someone submits a story:

1. Open `Code.gs` in Apps Script editor
2. Find the `doPost` function
3. After the line `sheet.appendRow(rowData);`, add:
   ```javascript
   sendNotificationEmail('your-email@example.com');
   ```
4. Replace `your-email@example.com` with your actual email
5. Save and redeploy

---

## Troubleshooting

### "Script function not found: setup"
- Make sure you copied ALL the code from `Code.gs`
- Save the script and try again

### "Authorization required"
- This is normal the first time
- Follow the authorization steps in Step 4

### Form submissions not appearing in sheet
- Check that you're using the correct Web app URL
- Make sure the deployment is set to "Anyone" can access
- Check the Apps Script execution logs for errors

### "Access denied" error
- Redeploy the web app
- Make sure "Execute as" is set to "Me"
- Make sure "Who has access" is set to "Anyone"

### JSON export shows no data
- Make sure you have approved stories in the "Approved Stories" sheet
- Check that the sheet name is exactly "Approved Stories"

---

## Security Notes

- The script only accepts POST requests with JSON data
- No sensitive data is exposed publicly
- You control which stories get published
- Email addresses are stored in the sheet but not published to the website
- Consider adding reCAPTCHA to your form for additional spam protection

---

## Maintenance

### Regular Tasks
1. **Weekly:** Review new submissions
2. **As needed:** Approve/reject stories
3. **After approvals:** Export to JSON and update website

### Updating the Script
If you need to modify the script:
1. Make changes in Apps Script editor
2. Save the changes
3. Click **Deploy** → **Manage deployments**
4. Click the edit icon (pencil) next to your deployment
5. Change "Version" to "New version"
6. Click **Deploy**

---

## Advanced Features

### Custom Fields
To add more fields to collect:
1. Update the sheet headers in the `setup()` function
2. Update the `rowData` array in `doPost()` function
3. Update your website form to include the new fields

### Automatic Publishing
If you want approved stories to automatically appear on your website:
1. Set up a GitHub repository for your website
2. Use GitHub Actions to fetch the JSON from Google Sheets
3. Automatically commit and deploy changes

(This requires more advanced setup - contact a developer if needed)

---

## Support

If you encounter issues:
1. Check the Apps Script execution logs: **View** → **Logs**
2. Verify your Web app URL is correct
3. Test with a simple submission
4. Check the Google Sheet for any error messages

---

## Summary

✅ **Setup Complete!** You now have:
- A Google Sheet collecting story submissions
- A moderation workflow for reviewing stories
- One-click JSON export for publishing
- Full control over what appears on your website

**Next Steps:**
1. Share your website with pet owners
2. Review submissions regularly
3. Approve great stories
4. Export and publish to your website
5. Celebrate the wonderful pet stories! 🐾

---

**Last Updated:** March 2024  
**Created for:** Dr. Deepa Pet Vet Clinic