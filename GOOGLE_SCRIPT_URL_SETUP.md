# Google Apps Script URL Setup Guide

This guide explains how to set up the Google Apps Script URL to work dynamically from GitHub Secrets.

## Overview

The website uses the Google Apps Script URL in two places:
1. **Story submission form** - Opens in a modal when users click "Share Your Story"
2. **Direct link** - In the success stories section

Both now pull the URL from `CONFIG.GOOGLE_SCRIPT_URL`, which is populated from GitHub Secrets during deployment.

## Step-by-Step Setup

### 1. Deploy Your Google Apps Script

1. Open your Google Sheet with the Apps Script
2. Go to **Extensions** → **Apps Script**
3. Make sure you have both files:
   - `Code.gs` (the main script)
   - `Form.html` (the HTML form)

4. **Run the setup function first**:
   - Select `setup` from the function dropdown
   - Click Run ▶️
   - Authorize the script when prompted

5. **Deploy as Web App**:
   - Click **Deploy** → **New deployment**
   - Click the gear icon ⚙️ → Select **Web app**
   - Configure:
     ```
     Description: Story Submission Form
     Execute as: Me (your-email@gmail.com)
     Who has access: Anyone
     ```
   - Click **Deploy**
   - **IMPORTANT**: Authorize when prompted:
     - Click "Review Permissions"
     - Click "Advanced"
     - Click "Go to [Your Project Name] (unsafe)"
     - Click "Allow"

6. **Copy the Web App URL**:
   ```
   https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

### 2. Test the URL

**CRITICAL**: Test before adding to GitHub Secrets!

1. Open the URL in an **incognito/private browser window**
2. You should see the form load WITHOUT asking for login

**If you see "Authorization Required":**
- The deployment isn't public yet
- Try deleting and creating a new deployment
- Make sure "Who has access" is set to "Anyone"
- Consider using a personal Gmail account instead of Workspace

### 3. Add to GitHub Secrets

Once you have a working URL:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the secret:
   ```
   Name: GOOGLE_SCRIPT_URL
   Value: https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
5. Click **Add secret**

### 4. Update Local Development Config

For local testing, update `js/config.js`:

```javascript
const CONFIG = {
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
    // ... other config
};
```

**Note**: Don't commit this change! The file is in `.gitignore`.

### 5. Deploy to GitHub Pages

The GitHub Actions workflow will automatically:
1. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your secret value
2. Deploy to GitHub Pages

**To trigger deployment:**
```bash
git add .
git commit -m "Update Google Script URL configuration"
git push origin main
```

## How It Works

### Files Updated

1. **`js/config.js`** (Line 15):
   ```javascript
   GOOGLE_SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
   ```

2. **`js/open-story-form.js`** (Line 8):
   ```javascript
   const GOOGLE_FORM_URL = window.CONFIG?.GOOGLE_SCRIPT_URL || 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```

3. **`index.html`** (Line 388):
   ```html
   <a href="#" class="btn btn-primary share-story-link" id="shareStoryBtn">Share Your Story</a>
   ```
   - Now uses JavaScript to open the modal instead of direct link

### GitHub Workflow

The `.github/workflows/deploy.yml` file (Line 36) handles the replacement:

```yaml
sed -i "s|YOUR_GOOGLE_APPS_SCRIPT_URL_HERE|${{ secrets.GOOGLE_SCRIPT_URL }}|g" js/config.js
```

## Troubleshooting

### Issue: "Authorization Required" in Incognito Mode

**Cause**: The script isn't deployed for public access.

**Solutions**:
1. **Use a personal Gmail account** (recommended):
   - Create a new Google Sheet in a personal @gmail.com account
   - Copy Code.gs and Form.html there
   - Deploy from the personal account
   - This URL will work for everyone

2. **Fix Workspace restrictions**:
   - Contact your Google Workspace admin
   - Ask them to enable "Allow users to publish files on the web"
   - Re-deploy the script

### Issue: Form Doesn't Open When Clicking "Share Your Story"

**Check**:
1. Browser console for errors (F12)
2. Make sure `js/config.js` is loaded before `js/open-story-form.js`
3. Verify the URL in config.js is correct

**Fix**:
```javascript
// In browser console, check:
console.log(window.CONFIG.GOOGLE_SCRIPT_URL);
// Should show your actual URL, not the placeholder
```

### Issue: Placeholder Still Showing After Deployment

**Cause**: GitHub Secret not set or workflow didn't run.

**Fix**:
1. Check GitHub Secrets are set correctly
2. Check workflow logs: **Actions** tab → Latest workflow run
3. Look for the "Replace configuration values" step
4. Verify the secret has a value (check length in debug step)

### Issue: Script Works for Owner But Not Others

**Cause**: Deployment settings or Workspace restrictions.

**Fix**:
1. Delete the current deployment
2. Create a new deployment with exact settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
3. Fully authorize when prompted
4. Test in incognito mode before adding to GitHub Secrets

## Verification Checklist

Before going live, verify:

- [ ] Google Apps Script deployed with "Anyone" access
- [ ] URL works in incognito/private browser window
- [ ] GitHub Secret `GOOGLE_SCRIPT_URL` is set
- [ ] Local `js/config.js` has the correct URL for testing
- [ ] Pushed changes to GitHub and workflow ran successfully
- [ ] Visited the live site and clicked "Share Your Story"
- [ ] Form opens in modal without errors
- [ ] Test submission works

## Security Notes

- The Google Apps Script URL is **public** and safe to expose
- It only allows form submissions, not data access
- Rate limiting is built into the script (3 submissions per IP per hour)
- Email notifications go to the address set in Code.gs
- All submissions are logged with IP addresses for spam prevention

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review GitHub Actions logs for deployment errors
3. Test the Google Apps Script URL directly in incognito mode
4. Verify all GitHub Secrets are set correctly

For Google Apps Script specific issues, see `TROUBLESHOOTING_GOOGLE_SCRIPT.md`.