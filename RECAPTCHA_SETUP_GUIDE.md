# reCAPTCHA Setup Guide
## Add Bot Protection to Story Submission Form

This guide will help you add Google reCAPTCHA v3 to your story submission form to prevent spam and bot submissions.

---

## What is reCAPTCHA?

reCAPTCHA is Google's free service that protects your website from spam and abuse. Version 3 works invisibly in the background - no checkboxes or image challenges for users!

**Benefits:**
- ✅ Invisible to legitimate users
- ✅ Blocks automated bots
- ✅ Reduces spam submissions
- ✅ Free to use
- ✅ Easy to implement

---

## Step 1: Register Your Site with Google reCAPTCHA

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)

2. Sign in with your Google account

3. Fill out the registration form:
   - **Label:** `Dr Deepa Pet Vet Clinic - Story Submissions`
   - **reCAPTCHA type:** Select **reCAPTCHA v3**
   - **Domains:** Add your website domain
     - For testing: `localhost`
     - For production: `yourdomain.com` (without http://)
   - **Accept the reCAPTCHA Terms of Service**

4. Click **Submit**

5. You'll receive two keys:
   - **Site Key** (starts with `6L...`) - Used in your website HTML
   - **Secret Key** (starts with `6L...`) - Used in Google Apps Script

6. **IMPORTANT:** Copy both keys and save them securely!

---

## Step 2: Update Google Apps Script

1. Open your Google Sheet with the story submissions

2. Go to **Extensions** → **Apps Script**

3. Find this line in `Code.gs` (around line 29):
   ```javascript
   const RECAPTCHA_SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY_HERE';
   ```

4. Replace `YOUR_RECAPTCHA_SECRET_KEY_HERE` with your **Secret Key**:
   ```javascript
   const RECAPTCHA_SECRET_KEY = '6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
   ```

5. Make sure this line is set to `true` (around line 28):
   ```javascript
   const ENABLE_RECAPTCHA = true;
   ```

6. Save the script (Ctrl+S / Cmd+S)

7. **Redeploy** the web app:
   - Click **Deploy** → **Manage deployments**
   - Click the edit icon (pencil) next to your deployment
   - Change **Version** to **New version**
   - Click **Deploy**

---

## Step 3: Add reCAPTCHA to Your Website

### Option A: Add to Story Submission Form (Recommended)

1. Open your `index.html` or the page with the story submission form

2. Add the reCAPTCHA script in the `<head>` section:
   ```html
   <script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY_HERE"></script>
   ```
   Replace `YOUR_SITE_KEY_HERE` with your **Site Key**

3. Update `js/share-story-modal.js` to include reCAPTCHA token:

Find the form submission code (around line 138) and update it:

```javascript
shareStoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // ... existing validation code ...
    
    // Get reCAPTCHA token
    const siteKey = 'YOUR_SITE_KEY_HERE'; // Replace with your Site Key
    
    try {
        const recaptchaToken = await grecaptcha.execute(siteKey, {action: 'submit_story'});
        
        // Add token to form data
        const formData = {
            petName: document.getElementById('petName').value,
            petType: document.getElementById('petType').value,
            petBreed: finalBreed,
            ownerName: document.getElementById('ownerName').value,
            storyTitle: document.getElementById('storyTitle').value,
            storyText: storyContent,
            email: document.getElementById('email').value,
            photoUrl: document.getElementById('photoUrl').value || '',
            recaptchaToken: recaptchaToken  // Add this line
        };
        
        // ... rest of submission code ...
    } catch (error) {
        console.error('reCAPTCHA error:', error);
        alert('Security verification failed. Please try again.');
    }
});
```

---

## Step 4: Test the Integration

1. Open your website in a browser

2. Fill out the story submission form

3. Submit the form

4. Check your Google Sheet - the submission should appear

5. Check the Apps Script execution logs:
   - In Apps Script editor: **View** → **Logs**
   - Look for: `reCAPTCHA verification result: true`

6. If you see `reCAPTCHA verification result: false`, check:
   - Site Key is correct in HTML
   - Secret Key is correct in Apps Script
   - Domain is registered in reCAPTCHA admin
   - Script has been redeployed

---

## Step 5: Monitor reCAPTCHA Performance

1. Go to [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)

2. Click on your site

3. View analytics:
   - Total requests
   - Suspicious requests blocked
   - Score distribution

4. Adjust settings if needed

---

## Troubleshooting

### "reCAPTCHA verification failed"

**Possible causes:**
- Site Key or Secret Key is incorrect
- Domain not registered in reCAPTCHA admin
- reCAPTCHA script not loaded on page
- Network/firewall blocking Google services

**Solutions:**
1. Verify both keys are correct
2. Check domain is added in reCAPTCHA admin
3. Check browser console for errors
4. Test on different network

### "grecaptcha is not defined"

**Cause:** reCAPTCHA script not loaded

**Solution:**
- Make sure this is in your HTML `<head>`:
  ```html
  <script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
  ```

### Submissions still going through without reCAPTCHA

**Cause:** reCAPTCHA disabled in Apps Script

**Solution:**
- Check `ENABLE_RECAPTCHA = true` in Code.gs
- Redeploy the web app

### Low reCAPTCHA scores

**Cause:** Legitimate users getting low scores

**Solution:**
- reCAPTCHA v3 uses scores (0.0 to 1.0)
- Current implementation accepts all scores
- You can add score threshold if needed:

```javascript
// In Code.gs, update verifyRecaptcha function:
if (result.success === true && result.score >= 0.5) {
    return true;
}
```

---

## Temporarily Disable reCAPTCHA

If you need to disable reCAPTCHA temporarily:

1. Open `Code.gs` in Apps Script

2. Change this line:
   ```javascript
   const ENABLE_RECAPTCHA = false;
   ```

3. Save and redeploy

**Note:** This will allow submissions without verification!

---

## Security Best Practices

1. **Never share your Secret Key** - Keep it private in Apps Script only

2. **Use different keys for testing and production**
   - Create separate reCAPTCHA sites for localhost and your domain

3. **Monitor the admin console regularly**
   - Check for unusual activity
   - Review blocked requests

4. **Keep your Site Key in the code**
   - It's safe to expose in HTML (it's meant to be public)

5. **Combine with rate limiting**
   - reCAPTCHA + rate limiting = strong protection
   - Both are already implemented in your setup!

---

## Advanced: Score-Based Actions

reCAPTCHA v3 returns a score (0.0 = bot, 1.0 = human). You can use this for different actions:

```javascript
// In Code.gs
function verifyRecaptcha(token) {
  // ... existing code ...
  
  const result = JSON.parse(response.getContentText());
  const score = result.score;
  
  if (score >= 0.7) {
    // High confidence - auto-approve
    return {success: true, action: 'auto-approve'};
  } else if (score >= 0.3) {
    // Medium confidence - manual review
    return {success: true, action: 'review'};
  } else {
    // Low confidence - likely bot
    return {success: false, action: 'reject'};
  }
}
```

---

## Summary

✅ **Setup Complete!** You now have:
- reCAPTCHA v3 protecting your form
- Invisible bot protection
- Spam prevention
- Combined with rate limiting for maximum security

**Next Steps:**
1. Monitor submissions in Google Sheet
2. Check reCAPTCHA analytics
3. Adjust settings if needed
4. Enjoy spam-free submissions! 🎉

---

**Need Help?**
- [reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA FAQ](https://developers.google.com/recaptcha/docs/faq)
- Check Apps Script execution logs for errors

---

**Last Updated:** March 2024  
**Created for:** Dr. Deepa Pet Vet Clinic