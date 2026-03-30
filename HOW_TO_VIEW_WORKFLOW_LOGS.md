# How to View GitHub Actions Workflow Logs

## Step-by-Step Guide to Find the "Replace configuration values" Log

### Step 1: Go to Actions Tab
1. Open your repository: https://github.com/sunilpanwar/Dr-Deepa-Pet-Vet-Clinic
2. Click the **"Actions"** tab (top menu, between "Pull requests" and "Projects")

### Step 2: Find the Latest Workflow Run
You'll see a list of workflow runs. Look for:
- **Name**: "Deploy to GitHub Pages"
- **Status**: 
  - ✅ Green checkmark = Success
  - ❌ Red X = Failed
  - 🟡 Yellow dot = Running

Click on the **most recent** workflow run (top of the list)

### Step 3: Open the "deploy" Job
On the workflow run page, you'll see:
- Left side: Summary
- Right side: Jobs section with "deploy"

Click on **"deploy"** (it might already be expanded)

### Step 4: Find "Replace configuration values" Step
You'll see a list of steps with expandable sections:
- ✅ Set up job
- ✅ Checkout code
- ✅ **Replace configuration values** ← **THIS IS THE ONE YOU NEED**
- ✅ Deploy to GitHub Pages
- ✅ Complete job

Click on **"Replace configuration values"** to expand it

### Step 5: Read the Output
You should see something like this:

```bash
Run # Replace placeholders in config.js with actual values from secrets
  sed -i "s|YOUR_GOOGLE_APPS_SCRIPT_URL_HERE|***|g" js/config.js
  sed -i "s|RECAPTCHA_SITE_KEY: ''|RECAPTCHA_SITE_KEY: '***'|g" js/config.js
  sed -i "s|ENABLE_RECAPTCHA: false|ENABLE_RECAPTCHA: true|g" js/config.js
  
  # Replace JSON data URLs
  sed -i "s|YOUR_QUOTES_JSON_URL_HERE|***|g" js/config.js
  sed -i "s|YOUR_REVIEWS_JSON_URL_HERE|***|g" js/config.js
  sed -i "s|YOUR_STORIES_JSON_URL_HERE|***|g" js/config.js
  sed -i "s|YOUR_ARTICLES_JSON_URL_HERE|***|g" js/config.js
  shell: /usr/bin/bash -e {0}
```

**Note:** GitHub replaces actual secret values with `***` for security

## What to Look For

### ✅ Good Signs:
- All sed commands are listed
- No error messages
- Step has green checkmark ✅

### ❌ Bad Signs:
- Red X on the step
- Error messages like "command not found"
- Missing sed commands

## If You Don't See the Step

If "Replace configuration values" step is missing, it means:
1. The workflow file doesn't have this step yet
2. You're looking at an old workflow run (before we added the step)

**Solution:** Make sure you're looking at the LATEST workflow run after you pushed the changes.

## Alternative: View Raw Log

If you want to see everything:
1. On the workflow run page (after Step 2)
2. Click the **⚙️ gear icon** (top right)
3. Click **"View raw logs"**
4. Search for "Replace configuration" (Ctrl+F)

## What the Output Tells You

### If you see the sed commands:
✅ The workflow is trying to replace the placeholders

### If secrets are working:
The sed commands will show `***` where the secret values are

### If secrets are NOT working:
You might see the actual placeholder text in the output, or errors

## Next Step: Check the Deployed File

After viewing the logs, check if it worked:

Visit: https://sunilpanwar.github.io/Dr-Deepa-Pet-Vet-Clinic/js/config.js

Look for line 28:
- ❌ `QUOTES_JSON_URL: 'YOUR_QUOTES_JSON_URL_HERE',` = Didn't work
- ✅ `QUOTES_JSON_URL: 'https://gist.githubusercontent.com/...',` = Worked!

## Screenshot Guide

If you're still having trouble, take screenshots of:
1. The Actions tab showing the workflow list
2. The workflow run page showing the jobs
3. The expanded "Replace configuration values" step

This will help me diagnose the exact issue!