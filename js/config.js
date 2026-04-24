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
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyfg_4_Ox61NysVylokDOex1T-1qJnkX0OmFUYdLMA8QwC_-mEr1QVmTPIsn2JX9cJKfw/exec',
    
    // reCAPTCHA Site Key (Public key - safe to expose)
    // Get from: https://www.google.com/recaptcha/admin
    // Leave empty ('') to disable reCAPTCHA
    RECAPTCHA_SITE_KEY: '',
    
    // Enable/disable reCAPTCHA
    // Set to true after adding RECAPTCHA_SITE_KEY above
    ENABLE_RECAPTCHA: true,
    
    // JSON Data URLs
    // These can be local files (requires server) or hosted URLs (GitHub Gist, Google Drive, etc.)
    QUOTES_JSON_URL: 'https://gist.githubusercontent.com/sunilpanwar/606de5450c58d75a0415e220f510e0b5/raw/quotes.json',
    REVIEWS_JSON_URL: 'https://gist.githubusercontent.com/sunilpanwar/215ab7f9c7a11a8bd14028cab010b474/raw/reviews.json',
    STORIES_JSON_URL: 'https://gist.githubusercontent.com/sunilpanwar/3ab0d4f0c33a9d15450c1712f21c24d8/raw/stories.json',
    ARTICLES_JSON_URL: 'https://gist.githubusercontent.com/sunilpanwar/fa4e354dc34faf45136f9eed89d07c7c/raw/articles.json',
    
    // Debug Mode
    // Set to false in production to disable console logs
    // Set to true during development to see debug information
    DEBUG_MODE: false
};

// Make CONFIG available globally
window.CONFIG = CONFIG;
