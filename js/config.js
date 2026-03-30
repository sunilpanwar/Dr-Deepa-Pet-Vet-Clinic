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
    // TODO: Add your reCAPTCHA Site Key here if you want to enable it
    RECAPTCHA_SITE_KEY: '',
    
    // Enable/disable reCAPTCHA
    // Set to true after adding RECAPTCHA_SITE_KEY above
    ENABLE_RECAPTCHA: false
};

// Make CONFIG available globally
window.CONFIG = CONFIG;