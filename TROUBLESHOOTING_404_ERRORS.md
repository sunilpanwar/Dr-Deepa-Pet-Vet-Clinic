# Troubleshooting 404 Errors for JSON URLs

## The Error You're Seeing

```
GET https://sunilpanwar.github.io/Dr-Deepa-Pet-Vet-Clinic/YOUR_QUOTES_JSON_URL_HERE 404 (Not Found)
```

This means the placeholders in `js/config.js` are NOT being replaced during deployment.

## Diagnostic Steps

### Step 1: Check if You Pushed the Changes

```bash
# Check your git status
git status

# If you see uncommitted changes, you need to commit and push:
git add .
git commit -m "Centralize configuration"
git push
```

**Important:** The workflow only runs when you push to GitHub!

### Step 2: Check GitHub Actions Workflow

1. Go to your repository: https://github.com/sunilpanwar/Dr-Deepa-Pet-Vet-Clinic
2. Click the **Actions** tab
3. Look for the most recent workflow run

**What to check:**
- ✅ Green checkmark = Success
- ❌ Red X = Failed
- 🟡 Yellow dot = Running

### Step 3: Review Workflow Logs

If the workflow ran, click on it and check:

1. Click on the workflow run
2. Click on "deploy" job
3. Expand "Replace configuration values" step
4. Look for the sed commands output

**What you should see:**
```bash
sed -i "s|YOUR_QUOTES_JSON_URL_HERE|https://gist.githubusercontent.com/...|g" js/config.js
sed -i "s|YOUR_REVIEWS_JSON_URL_HERE|https://gist.githubusercontent.com/...|g" js/config.js
...
```

### Step 4: Verify GitHub Secrets

1. Go to Settings → Secrets and variables → Actions
2. Verify these secrets exist:
   - `QUOTES_JSON_URL`
   - `REVIEWS_JSON_URL`
   - `STORIES_JSON_URL`
   - `ARTICLES_JSON_URL`

**Important:** Secret names are case-sensitive!

### Step 5: Clear Browser Cache

The browser might be showing cached files:

**Chrome/Edge:**
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Or just do a hard refresh: `Ctrl + F5`

**Firefox:**
1. Press `Ctrl + Shift + Delete`
2. Select "Cache"
3. Click "Clear Now"

### Step 6: Check Deployed File

Visit this URL directly in your browser:
```
https://sunilpanwar.github.io/Dr-Deepa-Pet-Vet-Clinic/js/config.js
```

**What you should see:**
- ✅ Real URLs (not placeholders) = Deployment worked
- ❌ Placeholders still there = Deployment didn't work

## Common Issues and Solutions

### Issue 1: Workflow Didn't Run

**Symptom:** No recent workflow run in Actions tab

**Solution:**
```bash
# Make sure you pushed
git push

# Or manually trigger workflow:
# Go to Actions → Deploy to GitHub Pages → Run workflow
```

### Issue 2: Secrets Not Set

**Symptom:** Workflow runs but placeholders remain

**Solution:**
1. Double-check secret names match exactly:
   - `QUOTES_JSON_URL` (not `QUOTES_URL` or `quotes_json_url`)
   - `REVIEWS_JSON_URL`
   - `STORIES_JSON_URL`
   - `ARTICLES_JSON_URL`

### Issue 3: Workflow Failed

**Symptom:** Red X in Actions tab

**Solution:**
1. Click on the failed workflow
2. Read the error message
3. Common errors:
   - Missing secrets
   - Syntax error in workflow file
   - Permission issues

### Issue 4: Browser Cache

**Symptom:** Deployed file is correct but site still shows errors

**Solution:**
1. Hard refresh: `Ctrl + F5`
2. Clear cache completely
3. Try incognito/private window
4. Try different browser

## Quick Test

Run this in browser console (F12):

```javascript
// Check if config is loaded
console.log('CONFIG:', window.CONFIG);

// Check specific URLs
console.log('Quotes URL:', window.CONFIG?.QUOTES_JSON_URL);
console.log('Reviews URL:', window.CONFIG?.REVIEWS_JSON_URL);
console.log('Stories URL:', window.CONFIG?.STORIES_JSON_URL);
console.log('Articles URL:', window.CONFIG?.ARTICLES_JSON_URL);
```

**Expected output:**
```
CONFIG: {GOOGLE_SCRIPT_URL: "...", QUOTES_JSON_URL: "https://gist...", ...}
Quotes URL: https://gist.githubusercontent.com/...
Reviews URL: https://gist.githubusercontent.com/...
Stories URL: https://gist.githubusercontent.com/...
Articles URL: https://gist.githubusercontent.com/...
```

**If you see placeholders:**
- Deployment didn't work
- Check GitHub Actions logs

**If you see real URLs but still get 404:**
- Browser cache issue
- Clear cache and hard refresh

## Manual Verification Checklist

- [ ] Changes committed and pushed to GitHub
- [ ] GitHub Actions workflow ran successfully (green checkmark)
- [ ] All 4 secrets are set in GitHub (QUOTES_JSON_URL, REVIEWS_JSON_URL, STORIES_JSON_URL, ARTICLES_JSON_URL)
- [ ] Deployed config.js file shows real URLs (not placeholders)
- [ ] Browser cache cleared
- [ ] Hard refresh performed (Ctrl+F5)

## Still Not Working?

If you've checked everything above and it's still not working, the issue might be:

1. **Workflow file syntax error** - Check `.github/workflows/deploy.yml`
2. **Secret values are wrong** - Verify the URLs in secrets are correct
3. **Deployment branch mismatch** - Ensure GitHub Pages is serving from `gh-pages` branch

### Last Resort: Temporary Fix

If you need the site working immediately:

1. Edit `js/config.js` locally with real URLs
2. Commit and push
3. Site will work (but you lose the secrets benefit)
4. Later, investigate why secrets aren't working

## Need More Help?

Share:
1. Screenshot of GitHub Actions workflow run
2. Screenshot of GitHub Secrets page (names only, not values)
3. Output from browser console test above
4. Content of deployed config.js file