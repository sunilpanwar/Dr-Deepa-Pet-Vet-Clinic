/**
 * Configuration Template
 * 
 * This file is a template for configuration values.
 * During deployment, GitHub Actions will replace placeholders with actual values.
 * 
 * For local development:
 * 1. Copy this file to js/config.js
 * 2. Replace placeholders with your actual values
 * 3. Add js/config.js to .gitignore
 */

const CONFIG = {
    // Google Apps Script Web App URL
    GOOGLE_SCRIPT_URL: '${GOOGLE_SCRIPT_URL}',
    
    // reCAPTCHA Site Key (Public - safe to expose in client-side code)
    RECAPTCHA_SITE_KEY: '${RECAPTCHA_SITE_KEY}',
    
    // Enable/disable reCAPTCHA
    ENABLE_RECAPTCHA: ${ENABLE_RECAPTCHA}
};