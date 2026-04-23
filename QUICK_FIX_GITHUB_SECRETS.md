# Quick Fix: Add GitHub Secrets for JSON URLs

## The Problem

You're seeing 404 errors because the placeholders in `js/config.js` haven't been replaced yet:
```
GET https://sunilpanwar.github.io/Dr-Deepa-Pet-Vet-Clinic/YOUR_QUOTES_JSON_URL_HERE 404
```

This happens because GitHub Actions needs the secrets to replace the placeholders during deployment.

## The Solution: Add GitHub Secrets

### Step 1: Go to GitHub Secrets
1. Open your repository on GitHub: https://github.com/sunilpanwar/Dr-Deepa-Pet-Vet-Clinic
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions** (left sidebar)

### Step 2: Add These 4 Secrets

Click **"New repository secret"** button and add each one:

#### Secret 1: QUOTES_JSON_URL
- **Name:** `QUOTES_JSON_URL`
- **Value:** `https://gist.githubusercontent.com/sunilpanwar/606de5450c58d75a0415e220f510e0b5/raw/b79a7dfca9a511ed41694a61c280569c7d37856c/quotes.json`

#### Secret 2: REVIEWS_JSON_URL
- **Name:** `REVIEWS_JSON_URL`
- **Value:** `https://gist.githubusercontent.com/sunilpanwar/215ab7f9c7a11a8bd14028cab010b474/raw/60ce26465bea5ad9e1bc3d0fefb72dd6ba962bbd/reviews.json`

#### Secret 3: STORIES_JSON_URL
- **Name:** `STORIES_JSON_URL`
- **Value:** `https://gist.githubusercontent.com/sunilpanwar/3ab0d4f0c33a9d15450c1712f21c24d8/raw/775c65a99737ac98c7ba0c53adaa125d0918cdfe/stories.json`

#### Secret 4: ARTICLES_JSON_URL
- **Name:** `ARTICLES_JSON_URL`
- **Value:** `https://gist.githubusercontent.com/sunilpanwar/fa4e354dc34faf45136f9eed89d07c7c/raw/d3f24571647fdf34dfd2a05960579a667f6cce42/articles.json`

### Step 3: Verify Secrets Are Added

After adding all 4 secrets, you should see them listed:
- ✅ ARTICLES_JSON_URL
- ✅ GOOGLE_SCRIPT_URL (if already added)
- ✅ QUOTES_JSON_URL
- ✅ RECAPTCHA_SITE_KEY (if already added)
- ✅ REVIEWS_JSON_URL
- ✅ STORIES_JSON_URL

### Step 4: Trigger Deployment

You have two options:

**Option A: Push a commit**
```bash
git add .
git commit -m "Add config centralization"
git push
```

**Option B: Manually trigger workflow**
1. Go to **Actions** tab
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Click green **Run workflow** button

### Step 5: Wait for Deployment

1. Go to **Actions** tab
2. Watch the workflow run (takes ~1-2 minutes)
3. Wait for green checkmark ✅

### Step 6: Test Your Site

1. Visit: https://sunilpanwar.github.io/Dr-Deepa-Pet-Vet-Clinic/
2. Check browser console (F12) - should see no 404 errors
3. Verify quotes, reviews, stories, and articles load correctly
4. Test "Share Your Story" button

## What Happens During Deployment

The GitHub Actions workflow:
1. Checks out your code
2. Runs sed commands to replace placeholders:
   ```bash
   sed -i "s|YOUR_QUOTES_JSON_URL_HERE|${{ secrets.QUOTES_JSON_URL }}|g" js/config.js
   sed -i "s|YOUR_REVIEWS_JSON_URL_HERE|${{ secrets.REVIEWS_JSON_URL }}|g" js/config.js
   sed -i "s|YOUR_STORIES_JSON_URL_HERE|${{ secrets.STORIES_JSON_URL }}|g" js/config.js
   sed -i "s|YOUR_ARTICLES_JSON_URL_HERE|${{ secrets.ARTICLES_JSON_URL }}|g" js/config.js
   ```
3. Deploys the modified files to GitHub Pages

## Troubleshooting

### If secrets don't work:
1. Check secret names match exactly (case-sensitive)
2. Check workflow file has the sed commands
3. Review GitHub Actions logs for errors
4. Ensure you pushed the latest code with updated workflow

### If you still see 404 errors:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check GitHub Actions completed successfully
4. Verify secrets are set correctly

## Alternative: Temporary Fix

If you need the site working immediately while setting up secrets, you can temporarily:

1. Edit `js/config.js` locally with real URLs
2. Commit and push
3. Site will work immediately
4. Later, reset to placeholders and add secrets

But the **recommended approach** is to use GitHub Secrets as described above.