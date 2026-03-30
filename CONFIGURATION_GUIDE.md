# Configuration Management Guide

## Overview

This project uses a centralized configuration system that allows you to manage all URLs and settings from a single location. This makes it easy to update URLs without modifying code files.

## Configuration File: `js/config.js`

All configuration is managed through `js/config.js`. This file contains:

1. **Google Apps Script URL** - For form submissions
2. **reCAPTCHA Settings** - For bot protection (optional)
3. **JSON Data URLs** - For dynamic content (quotes, reviews, stories, articles)

## Two-Environment Setup

### 1. Local Development
For local development, edit `js/config.js` directly with your actual URLs:

```javascript
const CONFIG = {
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec',
    RECAPTCHA_SITE_KEY: 'your_actual_site_key',
    ENABLE_RECAPTCHA: true,
    
    QUOTES_JSON_URL: 'https://gist.githubusercontent.com/username/id/raw/quotes.json',
    REVIEWS_JSON_URL: 'https://gist.githubusercontent.com/username/id/raw/reviews.json',
    STORIES_JSON_URL: 'https://gist.githubusercontent.com/username/id/raw/stories.json',
    ARTICLES_JSON_URL: 'https://gist.githubusercontent.com/username/id/raw/articles.json'
};
```

### 2. Production (GitHub Pages)
For production, keep placeholder values in the repository:

```javascript
const CONFIG = {
    GOOGLE_SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
    RECAPTCHA_SITE_KEY: '',
    ENABLE_RECAPTCHA: false,
    
    QUOTES_JSON_URL: 'YOUR_QUOTES_JSON_URL_HERE',
    REVIEWS_JSON_URL: 'YOUR_REVIEWS_JSON_URL_HERE',
    STORIES_JSON_URL: 'YOUR_STORIES_JSON_URL_HERE',
    ARTICLES_JSON_URL: 'YOUR_ARTICLES_JSON_URL_HERE'
};
```

GitHub Actions will automatically replace these placeholders with actual values from GitHub Secrets during deployment.

## Setting Up GitHub Secrets

### Step 1: Navigate to Repository Settings
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**

### Step 2: Add Required Secrets

Click **New repository secret** and add each of the following:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `GOOGLE_SCRIPT_URL` | Your Google Apps Script web app URL | `https://script.google.com/macros/s/ABC123.../exec` |
| `RECAPTCHA_SITE_KEY` | reCAPTCHA site key (optional) | `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` |
| `QUOTES_JSON_URL` | URL to quotes JSON file | `https://gist.githubusercontent.com/.../quotes.json` |
| `REVIEWS_JSON_URL` | URL to reviews JSON file | `https://gist.githubusercontent.com/.../reviews.json` |
| `STORIES_JSON_URL` | URL to stories JSON file | `https://gist.githubusercontent.com/.../stories.json` |
| `ARTICLES_JSON_URL` | URL to articles JSON file | `https://gist.githubusercontent.com/.../articles.json` |

### Step 3: Verify Secrets
After adding all secrets, you should see them listed (values are hidden for security).

## JSON Data Hosting Options

You have several options for hosting your JSON data files:

### Option 1: GitHub Gist (Recommended)
**Pros:** Free, easy to update, version controlled
**Cons:** Public (anyone can view)

1. Go to https://gist.github.com
2. Create a new gist for each JSON file
3. Make it public
4. Click "Raw" button to get the direct URL
5. Use this URL in your GitHub Secrets

Example URL format:
```
https://gist.githubusercontent.com/username/gist-id/raw/filename.json
```

### Option 2: GitHub Repository (Raw)
**Pros:** Part of your repo, version controlled
**Cons:** Public, requires repo to be public

1. Upload JSON files to a `data/` folder in your repo
2. Get the raw URL from GitHub
3. Use format: `https://raw.githubusercontent.com/username/repo/branch/data/file.json`

### Option 3: Google Drive
**Pros:** Easy to update, can be private
**Cons:** Requires specific sharing settings

1. Upload JSON file to Google Drive
2. Right-click → Get link → Anyone with the link can view
3. Get the file ID from the URL
4. Use format: `https://drive.google.com/uc?export=download&id=FILE_ID`

### Option 4: Other Cloud Storage
- **Dropbox**: Use direct download links
- **AWS S3**: Use public bucket URLs
- **Cloudflare R2**: Use public URLs

## How It Works

### Deployment Process

1. **You commit code** with placeholder values in `js/config.js`
2. **GitHub Actions triggers** on push to main/master branch
3. **Workflow replaces placeholders** with actual values from secrets
4. **Modified files are deployed** to GitHub Pages
5. **Users see** the production site with real URLs

### Replacement Logic

The `.github/workflows/deploy.yml` file contains sed commands that replace placeholders:

```yaml
- name: Replace configuration values
  run: |
    # Replace Google Apps Script URL
    sed -i "s|YOUR_GOOGLE_APPS_SCRIPT_URL_HERE|${{ secrets.GOOGLE_SCRIPT_URL }}|g" js/config.js
    
    # Replace reCAPTCHA settings
    sed -i "s|RECAPTCHA_SITE_KEY: ''|RECAPTCHA_SITE_KEY: '${{ secrets.RECAPTCHA_SITE_KEY }}'|g" js/config.js
    sed -i "s|ENABLE_RECAPTCHA: false|ENABLE_RECAPTCHA: true|g" js/config.js
    
    # Replace JSON URLs
    sed -i "s|YOUR_QUOTES_JSON_URL_HERE|${{ secrets.QUOTES_JSON_URL }}|g" js/config.js
    sed -i "s|YOUR_REVIEWS_JSON_URL_HERE|${{ secrets.REVIEWS_JSON_URL }}|g" js/config.js
    sed -i "s|YOUR_STORIES_JSON_URL_HERE|${{ secrets.STORIES_JSON_URL }}|g" js/config.js
    sed -i "s|YOUR_ARTICLES_JSON_URL_HERE|${{ secrets.ARTICLES_JSON_URL }}|g" js/config.js
```

## Updating Configuration

### To Update a URL:

1. **Go to GitHub Secrets** (Settings → Secrets and variables → Actions)
2. **Click on the secret** you want to update
3. **Click "Update secret"**
4. **Enter the new value**
5. **Save**
6. **Trigger a new deployment** (push a commit or manually trigger workflow)

### To Update Locally:

Simply edit `js/config.js` with your local values. **Do not commit these changes** if they contain real URLs.

## Files That Use Config

The following files read from `window.CONFIG`:

| File | Config Used |
|------|-------------|
| `js/share-story-modal.js` | `GOOGLE_SCRIPT_URL`, `RECAPTCHA_SITE_KEY`, `ENABLE_RECAPTCHA` |
| `js/load-quotes.js` | `QUOTES_JSON_URL` |
| `js/load-reviews.js` | `REVIEWS_JSON_URL` |
| `js/load-stories.js` | `STORIES_JSON_URL` |
| `js/load-articles.js` | `ARTICLES_JSON_URL` |

## HTML Files That Load Config

These HTML files must include `<script src="js/config.js"></script>`:

- ✅ `index.html` (line 16)
- ✅ `stories.html` (line 16)
- ✅ `articles.html` (line 16)

## Troubleshooting

### Issue: "URL not configured" error

**Cause:** Config file not loaded or placeholder not replaced

**Solution:**
1. Check if `<script src="js/config.js"></script>` is in the HTML file
2. Verify GitHub Secrets are set correctly
3. Check GitHub Actions workflow logs for errors
4. Ensure placeholder text matches exactly what's in the workflow

### Issue: JSON data not loading

**Cause:** Invalid JSON URL or CORS issues

**Solution:**
1. Test the URL directly in browser
2. Ensure URL returns valid JSON
3. Check browser console for CORS errors
4. Use GitHub Gist or raw GitHub URLs (they support CORS)

### Issue: Changes not reflecting on production

**Cause:** GitHub Actions didn't run or failed

**Solution:**
1. Go to Actions tab in GitHub
2. Check if workflow ran successfully
3. Review workflow logs for errors
4. Manually trigger workflow if needed

## Best Practices

1. **Never commit real URLs** to the repository
2. **Always use placeholders** in `js/config.js` before committing
3. **Test locally** before pushing to production
4. **Keep secrets secure** - don't share them publicly
5. **Use descriptive secret names** for easy management
6. **Document any new config** values you add
7. **Update this guide** when adding new configuration options

## Security Notes

- ✅ **reCAPTCHA Site Key** is PUBLIC and safe to expose
- ❌ **reCAPTCHA Secret Key** must NEVER be in client-side code (keep in Google Apps Script)
- ✅ **JSON URLs** are public and safe to expose
- ⚠️ **Google Apps Script URL** is semi-public (anyone can submit, but you control what happens)

## Quick Reference

### Local Development Workflow
```bash
# 1. Edit js/config.js with real URLs
# 2. Test locally
# 3. Reset js/config.js to placeholders
# 4. Commit and push
```

### Production Update Workflow
```bash
# 1. Update GitHub Secret
# 2. Push any commit (or manually trigger workflow)
# 3. Wait for deployment
# 4. Verify on production site
```

## Need Help?

- Check [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md) for detailed GitHub Secrets setup
- Check [GOOGLE_APPS_SCRIPT_SETUP.md](GOOGLE_APPS_SCRIPT_SETUP.md) for Google Apps Script setup
- Check [RECAPTCHA_SETUP_GUIDE.md](RECAPTCHA_SETUP_GUIDE.md) for reCAPTCHA setup
- Review GitHub Actions logs for deployment issues