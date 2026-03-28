# How to Run the Website with a Local Server

## The Problem

FormSubmit (and many web features) require the website to be served through a **web server**, not opened directly as HTML files.

**Won't Work:** `file:///Users/c2096299/Documents/learningProjects/Dr-Deepa-Pet-Vet-Clinic/index.html`

**Will Work:** `http://localhost:8000/index.html`

## Solution: Start a Local Web Server

### Option 1: Using Python (Easiest - Already Installed on Mac)

1. **Open Terminal**
2. **Navigate to project folder:**
   ```bash
   cd /Users/c2096299/Documents/learningProjects/Dr-Deepa-Pet-Vet-Clinic
   ```

3. **Start the server:**
   
   **For Python 3:**
   ```bash
   python3 -m http.server 8000
   ```
   
   **For Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

4. **Open browser and go to:**
   ```
   http://localhost:8000
   ```

5. **To stop the server:**
   Press `Ctrl + C` in Terminal

### Option 2: Using Node.js (If Installed)

1. **Install http-server globally (one-time):**
   ```bash
   npm install -g http-server
   ```

2. **Navigate to project:**
   ```bash
   cd /Users/c2096299/Documents/learningProjects/Dr-Deepa-Pet-Vet-Clinic
   ```

3. **Start server:**
   ```bash
   http-server -p 8000
   ```

4. **Open browser:**
   ```
   http://localhost:8000
   ```

### Option 3: Using VS Code Live Server Extension

1. **Install "Live Server" extension** in VS Code
2. **Right-click on `index.html`**
3. **Select "Open with Live Server"**
4. **Browser opens automatically** at `http://127.0.0.1:5500`

### Option 4: Using PHP (If Installed)

1. **Navigate to project:**
   ```bash
   cd /Users/c2096299/Documents/learningProjects/Dr-Deepa-Pet-Vet-Clinic
   ```

2. **Start server:**
   ```bash
   php -S localhost:8000
   ```

3. **Open browser:**
   ```
   http://localhost:8000
   ```

## Quick Start Script (Recommended)

I've created a simple script for you. Just double-click it!

### For Mac/Linux:

Create file `start-server.sh`:
```bash
#!/bin/bash
cd "$(dirname "$0")"
echo "Starting web server..."
echo "Open your browser and go to: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
python3 -m http.server 8000
```

Make it executable:
```bash
chmod +x start-server.sh
```

Run it:
```bash
./start-server.sh
```

## After Starting Server

1. **Open browser**
2. **Go to:** `http://localhost:8000`
3. **Navigate to Success Stories**
4. **Click "Share Your Story"**
5. **Fill and submit form**
6. **FormSubmit will work!** ✅

## Troubleshooting

### "Port already in use"
Try a different port:
```bash
python3 -m http.server 8080
```
Then use: `http://localhost:8080`

### "Python not found"
- Mac/Linux: Python should be pre-installed
- Check version: `python3 --version`
- If not installed, download from python.org

### "Permission denied"
Use sudo (Mac/Linux):
```bash
sudo python3 -m http.server 8000
```

## For Production (Real Website)

When you're ready to publish online, you can use:

1. **GitHub Pages** (Free)
   - Push code to GitHub
   - Enable GitHub Pages
   - Your site: `https://username.github.io/repo-name`

2. **Netlify** (Free)
   - Drag & drop your folder
   - Instant deployment
   - Custom domain support

3. **Vercel** (Free)
   - Connect GitHub repo
   - Auto-deploy on push
   - Fast CDN

4. **Traditional Web Hosting**
   - Upload via FTP
   - Any shared hosting works

## Current Status

✅ Website is complete and ready
✅ FormSubmit is configured
❌ **Needs web server to work**

**Next Step:** Start a local server using one of the methods above, then test the form!