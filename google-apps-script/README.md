# Google Apps Script Integration

This folder contains the Google Apps Script code for collecting story submissions from your website.

## Quick Start

1. **Create a Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create a new blank spreadsheet
   - Name it: "Dr Deepa Pet Vet - Story Submissions"

2. **Add the Script**
   - In your Google Sheet: Extensions → Apps Script
   - Copy the code from `Code.gs` and paste it into the Apps Script editor
   - Save the project

3. **Run Setup**
   - Select the `setup` function from the dropdown
   - Click Run (▶️)
   - Authorize the script when prompted
   - This creates the necessary sheets with headers

4. **Deploy as Web App**
   - Click Deploy → New deployment
   - Select "Web app" as the type
   - Configure:
     - Execute as: Me
     - Who has access: Anyone
   - Click Deploy
   - **Copy the Web App URL** (you'll need this!)

5. **Update Your Website**
   - Open `js/share-story-modal.js`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL
   - Save and upload to your website

## Files in This Folder

- **Code.gs** - The main Google Apps Script code
  - Handles form submissions
  - Stores data in Google Sheets
  - Provides moderation functions
  - Exports approved stories to JSON

## Features

✅ **Automatic Collection** - Stories submitted from your website are automatically saved to Google Sheets

✅ **Moderation Workflow** - Review, approve, or reject submissions before publishing

✅ **JSON Export** - One-click export of approved stories to JSON format

✅ **Email Notifications** - Optional email alerts for new submissions

✅ **Spam Protection** - Manual review prevents spam from appearing on your site

## How It Works

```
Website Form → Google Apps Script → Google Sheets → Review → Approve → Export JSON → Update Website
```

1. User fills out "Share Your Story" form on your website
2. Form data is sent to Google Apps Script Web App
3. Script saves the submission to "Story Submissions" sheet
4. You review the submission in Google Sheets
5. Approve good stories (they move to "Approved Stories" sheet)
6. Export approved stories to JSON
7. Copy JSON to `data/stories.json` on your website
8. Approved stories appear on your website!

## Sheet Structure

### Story Submissions Sheet
- Timestamp
- Status (Pending/Approved/Rejected)
- Pet Name
- Pet Type
- Owner Name
- Story Title
- Story Text
- Email
- Photo URL
- IP Address
- User Agent

### Approved Stories Sheet
- ID
- Pet Name
- Pet Type
- Owner Name
- Story Title
- Story Text
- Photo URL
- Date Approved

## Common Tasks

### Approve a Story
1. Open Apps Script editor
2. Select function: `approveStory`
3. Click Run
4. Enter the row number when prompted
5. Story moves to "Approved Stories" sheet

### Export to JSON
1. In Google Sheets: Story Management → Export Approved Stories to JSON
2. View → Logs to see the JSON output
3. Copy the JSON
4. Paste into `data/stories.json`
5. Upload to your website

### Enable Email Notifications
1. Open `Code.gs`
2. In the `doPost` function, add after line with `sheet.appendRow(rowData);`:
   ```javascript
   sendNotificationEmail('your-email@example.com');
   ```
3. Save and redeploy

## Troubleshooting

**Submissions not appearing?**
- Check the Web App URL is correct in `js/share-story-modal.js`
- Verify deployment settings (Execute as: Me, Access: Anyone)
- Check Apps Script execution logs for errors

**Authorization errors?**
- Re-run the `setup` function
- Follow the authorization prompts
- Make sure you're using the same Google account

**Can't export JSON?**
- Make sure you have approved stories in the "Approved Stories" sheet
- Check that sheet names are exactly: "Story Submissions" and "Approved Stories"

## Security

- Only you can see the Google Sheet
- Submissions are reviewed before publishing
- Email addresses are not published to the website
- The Web App URL is public but only accepts story submissions

## Support

For detailed setup instructions, see: **GOOGLE_APPS_SCRIPT_SETUP.md**

For questions or issues, check the Apps Script execution logs:
- In Apps Script editor: View → Logs

---

**Created for:** Dr. Deepa Pet Vet Clinic  
**Last Updated:** March 2024