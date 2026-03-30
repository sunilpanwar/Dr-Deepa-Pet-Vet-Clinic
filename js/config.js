/**
 * Configuration File
 *
 * IMPORTANT: For security best practices:
 * 1. For local development: Update values directly in this file
 * 2. For production: Use GitHub Actions to replace values during deployment
 *
 * Note: reCAPTCHA Site Key is PUBLIC and safe to expose in client-side code.
 * Only the Secret Key (used in Google Apps Script) must be kept private.
 */

const CONFIG = {
    // Google Apps Script Web App URL
    // Get this after deploying your Google Apps Script
    GOOGLE_SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
    
    // reCAPTCHA Site Key (Public key - safe to expose)
    // Get from: https://www.google.com/recaptcha/admin
    // Leave empty ('') to disable reCAPTCHA
    RECAPTCHA_SITE_KEY: '',
    
    // Enable/disable reCAPTCHA
    // Set to true after adding RECAPTCHA_SITE_KEY above
    ENABLE_RECAPTCHA: false,
    
    // JSON Data URLs
    // These can be local files (requires server) or hosted URLs (GitHub Gist, Google Drive, etc.)
    QUOTES_JSON_URL: 'YOUR_QUOTES_JSON_URL_HERE',
    REVIEWS_JSON_URL: 'YOUR_REVIEWS_JSON_URL_HERE',
    STORIES_JSON_URL: 'YOUR_STORIES_JSON_URL_HERE',
    ARTICLES_JSON_URL: 'YOUR_ARTICLES_JSON_URL_HERE'
};

// Make CONFIG available globally
window.CONFIG = CONFIG;