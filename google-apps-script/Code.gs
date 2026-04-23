/**
 * Google Apps Script for Dr. Deepa Pet Vet Clinic
 * Collects story submissions from website and stores them in Google Sheets
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Copy this code into Code.gs
 * 4. Configure settings below
 * 5. Run setup() function once to create headers
 * 6. Deploy as Web App (see GOOGLE_APPS_SCRIPT_SETUP.md)
 */

// ===================================
// CONFIGURATION - UPDATE THESE VALUES
// ===================================

// Sheet names
const SHEET_NAME = 'Story Submissions';
const APPROVED_SHEET_NAME = 'Approved Stories';
const RATE_LIMIT_SHEET_NAME = 'Rate Limiting';

// Email notification settings
const ENABLE_EMAIL_NOTIFICATIONS = true; // Set to false to disable
const NOTIFICATION_EMAIL = 'panwarsunilsingh87@gmail.com'; // CHANGE THIS to your email

// reCAPTCHA settings
const ENABLE_RECAPTCHA = false; // Set to true after setting up reCAPTCHA (see RECAPTCHA_SETUP_GUIDE.md)
const RECAPTCHA_SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY_HERE'; // Get from Google reCAPTCHA

// Rate limiting settings (prevents spam)
const ENABLE_RATE_LIMITING = true;
const MAX_SUBMISSIONS_PER_IP_PER_HOUR = 3; // Maximum submissions from same IP per hour
const MAX_SUBMISSIONS_PER_EMAIL_PER_DAY = 5; // Maximum submissions from same email per day

// IP logging
const ENABLE_IP_LOGGING = true; // Already enabled, tracks all submissions

/**
 * Initial setup - Run this once to create sheet headers
 */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create submissions sheet if it doesn't exist
  let submissionsSheet = ss.getSheetByName(SHEET_NAME);
  if (!submissionsSheet) {
    submissionsSheet = ss.insertSheet(SHEET_NAME);
  }
  
  // Set headers for submissions
  const headers = [
    'Timestamp',
    'Status',
    'Pet Name',
    'Pet Type',
    'Pet Breed',
    'Pet Age',
    'Owner Name',
    'Story Title',
    'Story Category',
    'Story Text',
    'Treatment Date',
    'Outcome',
    'Email',
    'Photo URL',
    'IP Address',
    'User Agent',
    'Submission Count (IP)',
    'Submission Count (Email)'
  ];
  submissionsSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  submissionsSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  submissionsSheet.setFrozenRows(1);
  
  // Create approved stories sheet if it doesn't exist
  let approvedSheet = ss.getSheetByName(APPROVED_SHEET_NAME);
  if (!approvedSheet) {
    approvedSheet = ss.insertSheet(APPROVED_SHEET_NAME);
  }
  
  // Set headers for approved stories
  const approvedHeaders = [
    'ID',
    'Pet Name',
    'Pet Type',
    'Pet Breed',
    'Pet Age',
    'Owner Name',
    'Story Title',
    'Story Category',
    'Story Text',
    'Treatment Date',
    'Outcome',
    'Photo URL',
    'Date Approved'
  ];
  approvedSheet.getRange(1, 1, 1, approvedHeaders.length).setValues([approvedHeaders]);
  approvedSheet.getRange(1, 1, 1, approvedHeaders.length).setFontWeight('bold');
  approvedSheet.setFrozenRows(1);
  
  // Create rate limiting sheet if it doesn't exist
  let rateLimitSheet = ss.getSheetByName(RATE_LIMIT_SHEET_NAME);
  if (!rateLimitSheet) {
    rateLimitSheet = ss.insertSheet(RATE_LIMIT_SHEET_NAME);
  }
  
  // Set headers for rate limiting
  const rateLimitHeaders = [
    'IP Address',
    'Email',
    'Last Submission',
    'Hourly Count',
    'Daily Count',
    'Last Reset Hour',
    'Last Reset Day'
  ];
  rateLimitSheet.getRange(1, 1, 1, rateLimitHeaders.length).setValues([rateLimitHeaders]);
  rateLimitSheet.getRange(1, 1, 1, rateLimitHeaders.length).setFontWeight('bold');
  rateLimitSheet.setFrozenRows(1);
  
  //Logger.log('Setup complete! All sheets created with headers.');
  //Logger.log('Remember to update NOTIFICATION_EMAIL and RECAPTCHA_SECRET_KEY in the configuration!');
}

// ===================================
// HELPER FUNCTIONS
// ===================================

/**
 * Verify reCAPTCHA token
 * @param {string} token - The reCAPTCHA token from the client
 * @returns {boolean} - True if verification successful
 */
function verifyRecaptcha(token) {
  if (!ENABLE_RECAPTCHA) {
    return true; // Skip verification if disabled
  }
  
  if (!token) {
    //Logger.log('reCAPTCHA: No token provided');
    return false;
  }
  
  try {
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    const payload = {
      'secret': RECAPTCHA_SECRET_KEY,
      'response': token
    };
    
    const options = {
      'method': 'post',
      'payload': payload
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    //Logger.log('reCAPTCHA verification result: ' + result.success);
    return result.success === true;
    
  } catch (error) {
    //Logger.log('reCAPTCHA verification error: ' + error.toString());
    return false;
  }
}

/**
 * Check rate limiting for IP address and email
 * @param {string} ipAddress - The IP address
 * @param {string} email - The email address
 * @returns {object} - {allowed: boolean, reason: string}
 */
function checkRateLimit(ipAddress, email) {
  if (!ENABLE_RATE_LIMITING) {
    return {allowed: true, reason: ''};
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let rateLimitSheet = ss.getSheetByName(RATE_LIMIT_SHEET_NAME);
  
  if (!rateLimitSheet) {
    // Create sheet if it doesn't exist
    setup();
    rateLimitSheet = ss.getSheetByName(RATE_LIMIT_SHEET_NAME);
  }
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDate();
  
  // Get all rate limit data
  const lastRow = rateLimitSheet.getLastRow();
  if (lastRow > 1) {
    const data = rateLimitSheet.getRange(2, 1, lastRow - 1, 7).getValues();
    
    // Find existing entry for this IP or email
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowIP = row[0];
      const rowEmail = row[1];
      const lastResetHour = row[5];
      const lastResetDay = row[6];
      
      // Check IP rate limit
      if (rowIP === ipAddress) {
        let hourlyCount = row[3];
        
        // Reset hourly count if hour has changed
        if (lastResetHour !== currentHour) {
          hourlyCount = 0;
        }
        
        if (hourlyCount >= MAX_SUBMISSIONS_PER_IP_PER_HOUR) {
          return {
            allowed: false,
            reason: `Too many submissions from your IP address. Please try again in ${60 - now.getMinutes()} minutes.`
          };
        }
      }
      
      // Check email rate limit
      if (rowEmail === email) {
        let dailyCount = row[4];
        
        // Reset daily count if day has changed
        if (lastResetDay !== currentDay) {
          dailyCount = 0;
        }
        
        if (dailyCount >= MAX_SUBMISSIONS_PER_EMAIL_PER_DAY) {
          return {
            allowed: false,
            reason: 'You have reached the maximum number of submissions for today. Please try again tomorrow.'
          };
        }
      }
    }
  }
  
  return {allowed: true, reason: ''};
}

/**
 * Update rate limiting counters
 * @param {string} ipAddress - The IP address
 * @param {string} email - The email address
 */
function updateRateLimit(ipAddress, email) {
  if (!ENABLE_RATE_LIMITING) {
    return;
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rateLimitSheet = ss.getSheetByName(RATE_LIMIT_SHEET_NAME);
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDate();
  
  const lastRow = rateLimitSheet.getLastRow();
  let found = false;
  
  if (lastRow > 1) {
    const data = rateLimitSheet.getRange(2, 1, lastRow - 1, 7).getValues();
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowIP = row[0];
      const rowEmail = row[1];
      
      if (rowIP === ipAddress && rowEmail === email) {
        found = true;
        const rowNumber = i + 2;
        
        let hourlyCount = row[3];
        let dailyCount = row[4];
        const lastResetHour = row[5];
        const lastResetDay = row[6];
        
        // Reset counters if time period has changed
        if (lastResetHour !== currentHour) {
          hourlyCount = 0;
        }
        if (lastResetDay !== currentDay) {
          dailyCount = 0;
        }
        
        // Increment counters
        hourlyCount++;
        dailyCount++;
        
        // Update the row
        rateLimitSheet.getRange(rowNumber, 3).setValue(now);
        rateLimitSheet.getRange(rowNumber, 4).setValue(hourlyCount);
        rateLimitSheet.getRange(rowNumber, 5).setValue(dailyCount);
        rateLimitSheet.getRange(rowNumber, 6).setValue(currentHour);
        rateLimitSheet.getRange(rowNumber, 7).setValue(currentDay);
        
        break;
      }
    }
  }
  
  // If not found, add new entry
  if (!found) {
    rateLimitSheet.appendRow([
      ipAddress,
      email,
      now,
      1, // hourly count
      1, // daily count
      currentHour,
      currentDay
    ]);
  }
}

/**
 * Get submission counts for IP and email
 * @param {string} ipAddress - The IP address
 * @param {string} email - The email address
 * @returns {object} - {ipCount: number, emailCount: number}
 */
function getSubmissionCounts(ipAddress, email) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const submissionsSheet = ss.getSheetByName(SHEET_NAME);
  
  const lastRow = submissionsSheet.getLastRow();
  let ipCount = 0;
  let emailCount = 0;
  
  if (lastRow > 1) {
    const data = submissionsSheet.getRange(2, 1, lastRow - 1, 18).getValues();
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (row[14] === ipAddress) ipCount++; // IP is column 15
      if (row[12] === email) emailCount++; // Email is column 13
    }
  }
  
  return {ipCount: ipCount, emailCount: emailCount};
}

// ===================================
// MAIN FUNCTIONS
// ===================================

/**
 * Handle POST requests from the website form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Verify reCAPTCHA if enabled
    if (ENABLE_RECAPTCHA) {
      const recaptchaToken = data.recaptchaToken;
      if (!verifyRecaptcha(recaptchaToken)) {
        return ContentService
          .createTextOutput(JSON.stringify({
            'status': 'error',
            'message': 'reCAPTCHA verification failed. Please try again.'
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Get IP address (from parameters or headers)
    const ipAddress = e.parameter.userIp || e.parameters?.['X-Forwarded-For']?.[0] || 'Unknown';
    const email = data.email || '';
    
    // Check rate limiting
    const rateLimitCheck = checkRateLimit(ipAddress, email);
    if (!rateLimitCheck.allowed) {
      return ContentService
        .createTextOutput(JSON.stringify({
          'status': 'error',
          'message': rateLimitCheck.reason
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the spreadsheet and submissions sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it
    if (!sheet) {
      setup();
      sheet = ss.getSheetByName(SHEET_NAME);
    }
    
    // Get submission counts
    const counts = getSubmissionCounts(ipAddress, email);
    
    // Prepare the row data
    const timestamp = new Date();
    const userAgent = e.parameter.userAgent || e.headers?.['User-Agent'] || 'Unknown';
    
    const rowData = [
      timestamp,
      'Pending',  // Status
      data.petName || '',
      data.petType || '',
      data.petBreed || '',
      data.petAge || '',
      data.ownerName || '',
      data.storyTitle || '',
      data.storyCategory || '',
      data.storyText || '',
      data.treatmentDate || '',
      data.outcome || '',
      email,
      data.photoUrl || '',
      ipAddress,
      userAgent,
      counts.ipCount + 1,  // Submission count for this IP
      counts.emailCount + 1  // Submission count for this email
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Update rate limiting counters
    updateRateLimit(ipAddress, email);
    
    // Send email notification if enabled
    if (ENABLE_EMAIL_NOTIFICATIONS && NOTIFICATION_EMAIL && NOTIFICATION_EMAIL !== 'your-email@example.com') {
      try {
        sendNotificationEmail(data, ipAddress, counts);
      } catch (emailError) {
        //Logger.log('Email notification error: ' + emailError.toString());
        // Don't fail the submission if email fails
      }
    }
    
    // Send success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Thank you for sharing your story! We will review it and publish it soon.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Send error response
    //Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Sorry, there was an error submitting your story. Please try again later.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests - Serve the HTML form
 */
function doGet(e) {
  try {
    return HtmlService.createHtmlOutputFromFile('Form')
      .setTitle('Share Your Success Story - Dr. Deepa Pet Vet Clinic')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  } catch (error) {
    return HtmlService.createHtmlOutput('<h1>Error loading form</h1><p>' + error.toString() + '</p>');
  }
}

/**
 * Submit story from HTML form
 * Called by google.script.run from Form.html
 */
function submitStory(formData) {
  try {
    // Get IP address (not available in HTML service, so we'll use 'Web Form')
    const ipAddress = 'Web Form Submission';
    const email = formData.email || '';
    
    // Check rate limiting
    const rateLimitCheck = checkRateLimit(ipAddress, email);
    if (!rateLimitCheck.allowed) {
      throw new Error(rateLimitCheck.reason);
    }
    
    // Get the spreadsheet and submissions sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it
    if (!sheet) {
      setup();
      sheet = ss.getSheetByName(SHEET_NAME);
    }
    
    // Get submission counts
    const counts = getSubmissionCounts(ipAddress, email);
    
    // Prepare the row data
    const timestamp = new Date();
    const userAgent = 'Google Apps Script Web Form';
    
    const rowData = [
      timestamp,
      'Pending',  // Status
      formData.petName || '',
      formData.petType || '',
      formData.petBreed || '',
      formData.petAge || '',
      formData.ownerName || '',
      formData.storyTitle || '',
      formData.storyCategory || '',
      formData.storyText || '',
      formData.treatmentDate || '',
      formData.outcome || '',
      email,
      '', // Photo URL (sent separately via email)
      ipAddress,
      userAgent,
      counts.ipCount + 1,  // Submission count for this IP
      counts.emailCount + 1  // Submission count for this email
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Update rate limiting counters
    updateRateLimit(ipAddress, email);
    
    // Send email notification if enabled
    if (ENABLE_EMAIL_NOTIFICATIONS && NOTIFICATION_EMAIL && NOTIFICATION_EMAIL !== 'your-email@example.com') {
      try {
        sendNotificationEmail(formData, ipAddress, counts);
      } catch (emailError) {
        //Logger.log('Email notification error: ' + emailError.toString());
        // Don't fail the submission if email fails
      }
    }
    
    return {
      status: 'success',
      message: 'Thank you for sharing your story! We will review it and publish it soon.'
    };
    
  } catch (error) {
    //Logger.log('Error in submitStory: ' + error.toString());
    throw new Error('Sorry, there was an error submitting your story. Please try again later.');
  }
}

/**
 * Approve a story and move it to the approved sheet
 * @param {number} rowNumber - The row number in the submissions sheet to approve
 */
function approveStory(rowNumber) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const submissionsSheet = ss.getSheetByName(SHEET_NAME);
  const approvedSheet = ss.getSheetByName(APPROVED_SHEET_NAME);
  
  if (!submissionsSheet || !approvedSheet) {
    //Logger.log('Error: Required sheets not found. Run setup() first.');
    return;
  }
  
  // Get the story data from submissions sheet
  const storyData = submissionsSheet.getRange(rowNumber, 1, 1, 18).getValues()[0];
  
  // Update status to "Approved" in submissions sheet
  submissionsSheet.getRange(rowNumber, 2).setValue('Approved');
  
  // Get next ID for approved stories
  const lastRow = approvedSheet.getLastRow();
  const nextId = lastRow > 1 ? lastRow : 1;
  
  // Prepare approved story data
  const approvedData = [
    nextId,                    // ID
    storyData[2],              // Pet Name
    storyData[3],              // Pet Type
    storyData[4],              // Pet Breed
    storyData[5],              // Pet Age
    storyData[6],              // Owner Name
    storyData[7],              // Story Title
    storyData[8],              // Story Category
    storyData[9],              // Story Text
    storyData[10],             // Treatment Date
    storyData[11],             // Outcome
    storyData[13],             // Photo URL
    new Date()                 // Date Approved
  ];
  
  // Add to approved sheet
  approvedSheet.appendRow(approvedData);
  
  //Logger.log('Story approved and added to approved stories sheet.');
}

/**
 * Reject a story
 * @param {number} rowNumber - The row number in the submissions sheet to reject
 */
function rejectStory(rowNumber) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const submissionsSheet = ss.getSheetByName(SHEET_NAME);
  
  if (!submissionsSheet) {
    //Logger.log('Error: Submissions sheet not found. Run setup() first.');
    return;
  }
  
  // Update status to "Rejected"
  submissionsSheet.getRange(rowNumber, 2).setValue('Rejected');
  
  //Logger.log('Story rejected.');
}

/**
 * Export approved stories to JSON format
 * This generates JSON that you can copy and paste into data/stories.json
 */
function exportApprovedStoriesToJSON() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const approvedSheet = ss.getSheetByName(APPROVED_SHEET_NAME);
  
  if (!approvedSheet) {
    //Logger.log('Error: Approved stories sheet not found. Run setup() first.');
    return;
  }
  
  const lastRow = approvedSheet.getLastRow();
  if (lastRow <= 1) {
    //Logger.log('No approved stories to export.');
    return;
  }
  
  // Get all approved stories (skip header row)
  const data = approvedSheet.getRange(2, 1, lastRow - 1, 13).getValues();
  
  // Convert to JSON format
  const stories = data.map(row => ({
    id: row[0],
    petName: row[1],
    petType: row[2].toLowerCase(),
    breed: row[3],
    age: row[4],
    ownerName: row[5],
    title: row[6],
    category: row[7],
    story: row[8],
    treatmentDate: row[9] ? Utilities.formatDate(row[9], Session.getScriptTimeZone(), 'yyyy-MM-dd') : '',
    outcome: row[10],
    image: row[11] || 'images/quiz/dog/golden-retriever.jpg',
    date: Utilities.formatDate(row[12], Session.getScriptTimeZone(), 'yyyy-MM-dd')
  }));
  
  // Create formatted JSON
  const json = JSON.stringify(stories, null, 2);
  
  // Log the JSON (you can copy this from the logs)
  //Logger.log('=== APPROVED STORIES JSON ===');
  //Logger.log(json);
  //Logger.log('=== END JSON ===');
  //Logger.log('Copy the JSON above and paste it into data/stories.json');
  
  return json;
}

/**
 * Send email notification when a new story is submitted
 * @param {object} data - The submission data
 * @param {string} ipAddress - The submitter's IP address
 * @param {object} counts - Submission counts {ipCount, emailCount}
 */
function sendNotificationEmail(data, ipAddress, counts) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const timestamp = new Date();
  
  // Determine if this might be spam based on submission counts
  const spamWarning = (counts.ipCount >= 2 || counts.emailCount >= 3)
    ? '\n⚠️ WARNING: Multiple submissions from this IP/email. Possible spam.\n'
    : '';
  
  const subject = `🐾 New Story Submission - ${data.petName || 'Pet Story'}`;
  
  const htmlBody = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #667eea; }
          .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #667eea; }
          .story { white-space: pre-wrap; }
          .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; margin: 10px 0; }
          .stats { background: #e3f2fd; padding: 10px; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🐾 New Story Submission</h2>
            <p>Received: ${timestamp.toLocaleString()}</p>
          </div>
          
          <div class="content">
            ${spamWarning ? `<div class="warning"><strong>⚠️ Spam Alert</strong><br>${spamWarning}</div>` : ''}
            
            <div class="stats">
              <strong>📊 Submission Statistics:</strong><br>
              • Total submissions from this IP: ${counts.ipCount + 1}<br>
              • Total submissions from this email: ${counts.emailCount + 1}
            </div>
            
            <div class="field">
              <div class="label">🐕 Pet Name:</div>
              <div class="value">${data.petName || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">🏷️ Pet Type:</div>
              <div class="value">${data.petType || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">🐾 Pet Breed:</div>
              <div class="value">${data.petBreed || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">📅 Pet Age:</div>
              <div class="value">${data.petAge || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">👤 Owner Name:</div>
              <div class="value">${data.ownerName || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value">${data.email || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">📝 Story Title:</div>
              <div class="value">${data.storyTitle || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">🏷️ Category:</div>
              <div class="value">${data.storyCategory || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">📖 Story:</div>
              <div class="value story">${data.storyText || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">🏥 Treatment Date:</div>
              <div class="value">${data.treatmentDate || 'Not provided'}</div>
            </div>
            
            <div class="field">
              <div class="label">✅ Outcome:</div>
              <div class="value">${data.outcome || 'Not provided'}</div>
            </div>
            
            ${data.photoUrl ? `
            <div class="field">
              <div class="label">📷 Photo URL:</div>
              <div class="value">${data.photoUrl}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">🌐 IP Address:</div>
              <div class="value">${ipAddress}</div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="${ss.getUrl()}" class="button">📋 View in Google Sheets</a>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Dr. Deepa Pet Vet Clinic</strong></p>
            <p style="font-size: 12px;">Story Submission System</p>
          </div>
        </div>
      </body>
    </html>
  `;
  
  const plainBody = `
New Story Submission Received
==============================

${spamWarning}

Submission Statistics:
- Total submissions from this IP: ${counts.ipCount + 1}
- Total submissions from this email: ${counts.emailCount + 1}

Pet Details:
------------
Pet Name: ${data.petName || 'Not provided'}
Pet Type: ${data.petType || 'Not provided'}
Pet Breed: ${data.petBreed || 'Not provided'}
Pet Age: ${data.petAge || 'Not provided'}
Owner Name: ${data.ownerName || 'Not provided'}
Email: ${data.email || 'Not provided'}

Story:
------
Title: ${data.storyTitle || 'Not provided'}
Category: ${data.storyCategory || 'Not provided'}

${data.storyText || 'Not provided'}

Treatment Date: ${data.treatmentDate || 'Not provided'}
Outcome: ${data.outcome || 'Not provided'}

${data.photoUrl ? 'Photo URL: ' + data.photoUrl : ''}

Technical Details:
------------------
IP Address: ${ipAddress}
Submitted: ${timestamp.toLocaleString()}

Review this submission in your Google Sheet:
${ss.getUrl()}

---
Dr. Deepa Pet Vet Clinic - Story Submission System
  `;
  
  try {
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });
    //Logger.log('Email notification sent successfully to: ' + NOTIFICATION_EMAIL);
  } catch (error) {
    //Logger.log('Failed to send email notification: ' + error.toString());
    throw error;
  }
}

/**
 * Create a custom menu in Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Story Management')
    .addItem('Export Approved Stories to JSON', 'exportApprovedStoriesToJSON')
    .addSeparator()
    .addItem('Setup Sheets', 'setup')
    .addToUi();
}