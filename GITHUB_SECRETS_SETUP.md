# GitHub Secrets Setup Guide
## Secure Configuration Management with GitHub Actions

This guide explains how to use GitHub Secrets to securely manage your configuration values (Google Apps Script URL and reCAPTCHA keys) for automatic deployment.

---

## Why Use GitHub Secrets?

✅ **Security** - Keys are encrypted and never exposed in your code  
✅ **Automation** - Automatic deployment with GitHub Actions  
✅ **Best Practice** - Industry-standard approach for managing sensitive data  
✅ **Easy Updates** - Change keys without modifying code  

---

## Overview

Your website uses a configuration file (`js/config.js`) that contains:
- Google Apps Script Web App URL
- reCAPTCHA Site Key

Instead of hardcoding these values, we use GitHub Secrets to inject them during deployment.

---

## Step 1: Add Secrets to GitHub Repository

1. **Go to your GitHub repository**
   - Navigate to: `https://github.com/YOUR_USERNAME/YOUR_REPO`

2. **Open Settings**
   - Click the **Settings** tab (top right)

3. **Navigate to Secrets**
   - In the left sidebar, click **Secrets and variables** → **Actions**

4. **Add New Repository Secret**
   - Click **New repository secret** button

5. **Add GOOGLE_SCRIPT_URL Secret**
   - **Name:** `GOOGLE_SCRIPT_URL`
   - **Value:** Your Google Apps Script Web App URL
     ```
     https://script.google.com/macros/s/AKfycby.../exec
     ```
   - Click **Add secret**

6. **Add RECAPTCHA_SITE_KEY Secret**
   - Click **New repository secret** again
   - **Name:** `RECAPTCHA_SITE_KEY`
   - **Value:** Your reCAPTCHA Site Key (starts with `6L...`)
     ```
     6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     ```
   - Click **Add secret**

---

## Step 2: Verify GitHub Actions Workflow

The workflow file is already created at `.github/workflows/deploy.yml`

**What it does:**
1. Triggers on push to main/master branch
2. Checks out your code
3. Replaces placeholders in `js/config.js` with actual values from secrets
4. Deploys to GitHub Pages

**Workflow content:**
```yaml
- name: Replace configuration values
  run: |
    sed -i "s|YOUR_GOOGLE_APPS_SCRIPT_URL_HERE|${{ secrets.GOOGLE_SCRIPT_URL }}|g" js/config.js
    sed -i "s|RECAPTCHA_SITE_KEY: ''|RECAPTCHA_SITE_KEY: '${{ secrets.RECAPTCHA_SITE_KEY }}'|g" js/config.js
    sed -i "s|ENABLE_RECAPTCHA: false|ENABLE_RECAPTCHA: true|g" js/config.js
```

---

## Step 3: Enable GitHub Pages

1. **Go to Repository Settings**
   - Settings → Pages (in left sidebar)

2. **Configure Source**
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`

3. **Save**

---

## Step 4: Update index.html

Make sure `config.js` is loaded before `share-story-modal.js`:

```html
<!-- Add this in the <head> or before closing </body> -->
<script src="js/config.js"></script>
<script src="js/share-story-modal.js"></script>
```

---

## Step 5: Deploy

### Automatic Deployment

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Setup GitHub Secrets configuration"
   git push origin main
   ```

2. **GitHub Actions will automatically:**
   - Replace config values with secrets
   - Deploy to GitHub Pages
   - Your site will be live with secure configuration!

3. **Check deployment status:**
   - Go to **Actions** tab in your repository
   - Watch the workflow run
   - Green checkmark = successful deployment

### Manual Deployment

You can also trigger deployment manually:
1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

---

## Step 6: Verify Deployment

1. **Visit your GitHub Pages URL:**
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

2. **Test the form:**
   - Click "Share Your Story"
   - Fill out the form
   - Submit
   - Should work with reCAPTCHA enabled!

3. **Check browser console:**
   - Press F12 to open Developer Tools
   - Go to Console tab
   - Look for: `reCAPTCHA token obtained`

---

## Local Development

For local development (without GitHub Actions):

1. **Update `js/config.js` directly:**
   ```javascript
   const CONFIG = {
       GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_URL/exec',
       RECAPTCHA_SITE_KEY: '6LcYOUR_SITE_KEY',
       ENABLE_RECAPTCHA: true
   };
   ```

2. **Add to `.gitignore`:**
   ```
   js/config.js
   ```

3. **Keep `js/config.template.js` in repository**
   - This serves as a template for others

---

## Security Best Practices

### ✅ DO:
- Use GitHub Secrets for sensitive values
- Keep Secret Key (for Google Apps Script) private
- Regularly rotate keys
- Use different keys for development and production

### ❌ DON'T:
- Commit actual keys to repository
- Share Secret Keys publicly
- Use production keys in development
- Expose Secret Keys in client-side code

---

## Important Notes

### About reCAPTCHA Site Key

**The Site Key is PUBLIC and safe to expose:**
- It's meant to be visible in client-side code
- It's used by the browser to communicate with Google
- Only the Secret Key (in Google Apps Script) must be private

**Why use GitHub Secrets for Site Key?**
- Easier key rotation
- Consistent deployment process
- Separate dev/prod environments
- Best practice for all configuration

---

## Troubleshooting

### Secrets not working

**Check:**
1. Secret names match exactly: `GOOGLE_SCRIPT_URL` and `RECAPTCHA_SITE_KEY`
2. No extra spaces in secret values
3. Workflow file is in `.github/workflows/` directory
4. GitHub Actions is enabled in repository settings

### Deployment fails

**Check:**
1. GitHub Actions tab for error messages
2. Workflow syntax is correct
3. Branch name matches (main or master)
4. GitHub Pages is enabled

### Form still not working

**Check:**
1. Browser console for errors
2. `config.js` is loaded before `share-story-modal.js`
3. reCAPTCHA script is loaded in HTML
4. Google Apps Script has `ENABLE_RECAPTCHA = true`

---

## Updating Secrets

To update a secret:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click on the secret name
3. Click **Update secret**
4. Enter new value
5. Click **Update secret**
6. Push a new commit to trigger redeployment

---

## Alternative: Environment-Specific Config

For multiple environments (dev, staging, prod):

1. **Create separate workflow files:**
   - `.github/workflows/deploy-dev.yml`
   - `.github/workflows/deploy-prod.yml`

2. **Use different secrets:**
   - `DEV_GOOGLE_SCRIPT_URL`
   - `PROD_GOOGLE_SCRIPT_URL`
   - `DEV_RECAPTCHA_SITE_KEY`
   - `PROD_RECAPTCHA_SITE_KEY`

3. **Deploy to different branches:**
   - Dev → `gh-pages-dev`
   - Prod → `gh-pages`

---

## Summary

✅ **Setup Complete!** You now have:
- Secure configuration management
- Automatic deployment with GitHub Actions
- Separate secrets for sensitive values
- Production-ready setup

**Workflow:**
```
1. Update secrets in GitHub → 2. Push code → 3. GitHub Actions deploys → 4. Site live with secure config!
```

---

## Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Last Updated:** March 2024  
**Created for:** Dr. Deepa Pet Vet Clinic