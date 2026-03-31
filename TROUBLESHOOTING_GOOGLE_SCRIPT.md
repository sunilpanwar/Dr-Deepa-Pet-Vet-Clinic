# Troubleshooting Google Apps Script Submissions

## Issue: "Moved Temporarily" Error

If you see this error when submitting the form:
```html
<HTML>
<HEAD>
<TITLE>Moved Temporarily</TITLE>
</HEAD>
```

**This means your deployment URL has changed.**

---

## Solution: Get the New Deployment URL

### Step 1: Open Apps Script
1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**

### Step 2: Get Current Deployment URL
1. Click **Deploy** → **Manage deployments**
2. You'll see your active deployment
3. Click the **Copy** icon next to the Web app URL
4. The URL should look like:
   ```
   https://script.google.com/macros/s/ABC123.../exec
   ```

### Step 3: Update Your Configuration

**Option A: Update GitHub Secret (Recommended for Production)**
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Find `GOOGLE_SCRIPT_URL`
4. Click **Update**
5. Paste the new URL
6. Click **Update secret**
7. Commit any change to trigger deployment

**Option B: Update Local Config (For Testing)**
1. Open `js/config.js`
2. Update the `GOOGLE_SCRIPT_URL` value:
   ```javascript
   GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_NEW_URL/exec',
   ```
3. Save and test locally

---

## Common Causes of URL Changes

1. **Redeploying the script** - Creates a new version with new URL
2. **Creating a new deployment** - Generates a different URL
3. **Deleting and recreating deployment** - New URL assigned

---

## How to Avoid This Issue

### Use "Manage Deployments" Instead of "New Deployment"

When updating your script:
1. Make changes in Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the **Edit** icon (pencil) next to your existing deployment
4. Change **Version** to "New version"
5. Add description (optional)
6. Click **Deploy**

**This keeps the same URL!** ✅

---

## Verify the Script is Working

### Test with cURL:
```bash
curl -X POST "YOUR_SCRIPT_URL_HERE" \
  -H "Content-Type: application/json" \
  -d '{"petName":"Test","petType":"dog","email":"test@example.com"}'
```

**Expected response:**
```json
{
  "status": "success",
  "message": "Thank you for sharing your story! We will review it and publish it soon."
}
```

---

## Check Apps Script Execution Logs

1. In Apps Script editor, click **Executions** (clock icon on left)
2. Look for recent executions
3. Click on any execution to see details
4. Check for errors

---

## Common Errors and Solutions

### Error: "Script function not found: doPost"
**Solution:** Make sure you copied ALL the code from `google-apps-script/Code.gs`

### Error: "Authorization required"
**Solution:** 
1. In Apps Script, select function: `setup`
2. Click **Run**
3. Authorize the script
4. Try again

### Error: "Access denied"
**Solution:**
1. Deploy → Manage deployments
2. Edit deployment
3. Make sure:
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. Click **Deploy**

### No data appearing in sheet
**Solution:**
1. Check the sheet name is exactly "Story Submissions"
2. Run the `setup()` function to create headers
3. Check Apps Script execution logs for errors

---

## Debug Mode

Enable debug mode to see detailed logs:

1. Open `js/config.js`
2. Set `DEBUG_MODE: true`
3. Open browser console (F12)
4. Submit the form
5. Check console for detailed logs

---

## Still Not Working?

1. **Verify the URL is correct:**
   - Should end with `/exec` not `/dev`
   - Should be the Web app URL, not the script URL

2. **Check deployment settings:**
   - Execute as: Me
   - Who has access: Anyone

3. **Test with a simple GET request:**
   - Open the URL in your browser
   - You should see: `{"status":"success","message":"Story submission endpoint is working! Use POST to submit stories."}`

4. **Check Google Sheet:**
   - Make sure "Story Submissions" sheet exists
   - Check if headers are present
   - Look for any error messages

---

## Quick Fix Checklist

- [ ] Updated Google Apps Script code
- [ ] Ran `setup()` function
- [ ] Deployed as Web app
- [ ] Copied the correct deployment URL
- [ ] Updated GitHub Secret or local config
- [ ] Tested with cURL or browser
- [ ] Checked Apps Script execution logs
- [ ] Verified deployment settings (Execute as: Me, Access: Anyone)

---

**Last Updated:** March 2026  
**For:** Dr. Deepa Pet Vet Clinic