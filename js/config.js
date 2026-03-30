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
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwvjw5yxcFgGk1h3g8aCwm3w24WdJROcU8qkHlZCbLho1C6zFNv8r6S1SazRlCS4KdJFw/exec',
    
    // reCAPTCHA Site Key (Public key - safe to expose)
    // Get from: https://www.google.com/recaptcha/admin
    // Leave empty ('') to disable reCAPTCHA
    RECAPTCHA_SITE_KEY: '6Lfw85wsAAAAAPDER4QQW-0Pvm4Kaf_Rba_f0IIh',
    
    // Enable/disable reCAPTCHA
    // Set to true after adding RECAPTCHA_SITE_KEY above
    ENABLE_RECAPTCHA: true,
    
    // JSON Data URLs
    // These can be local files (requires server) or hosted URLs (GitHub Gist, Google Drive, etc.)
    QUOTES_JSON_URL: 'https://gist.githubusercontent.com/sunilpanwar/606de5450c58d75a0415e220f510e0b5/raw/b79a7dfca9a511ed41694a61c280569c7d37856c/quotes.json',
    REVIEWS_JSON_URL: 'https://gist.githubusercontent.com/username/id/raw/reviews.json',
    STORIES_JSON_URL: 'https://gist.githubusercontent.com/sunilpanwar/3ab0d4f0c33a9d15450c1712f21c24d8/raw/21f181a2fe961fc0bda29f6795057fa9cdfe6391/stories.json',
    ARTICLES_JSON_URL: 'https://gist.githubusercontent.com/username/id/raw/articles.json'
};

// Make CONFIG available globally
window.CONFIG = CONFIG;