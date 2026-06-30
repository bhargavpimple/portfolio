# Netlify CMS Setup Guide

## GitHub OAuth Setup

To use Netlify CMS with GitHub OAuth authentication, follow these steps:

### 1. Create GitHub OAuth Application
- Go to GitHub Settings → Developer settings → OAuth Apps
- Click "New OAuth App"
- Fill in the application details:
  - **Application name:** Bhargav Portfolio CMS
  - **Homepage URL:** `https://app.netlify.com`
  - **Authorization callback URL:** `https://api.netlify.com/auth/done`
- Copy the **Client ID** and **Client Secret**

### 2. Connect to Netlify
- Go to Netlify Site Settings → Build & Deploy → Access Control
- Authorize with the GitHub OAuth credentials
- Or connect your repository through Netlify dashboard

### 3. Access CMS
- Visit `/admin/` on your deployed site
- Authenticate with GitHub
- Start managing your content!

## Local Development

### Run locally:
```bash
git clone https://github.com/bhargavpimple/portfolio.git
cd portfolio
# Open index.html in a browser or use a local server
python -m http.server 8000
```

## Document Management

### Via CMS:
1. Go to `/admin/`
2. Navigate to "Documents" section
3. Add new documents with:
   - Title
   - Type (resume, certificate, experience_letter, other)
   - File name
   - Description

### Manual Upload:
1. Add files to `assets/` folder
2. Update links in `documents.html`
3. Commit and push changes

## Adding Certificates

Place certificate PDFs in `assets/` and update `documents.html`:
```html
<a class="btn secondary" href="assets/your-certificate.pdf" target="_blank">Open File</a>
```
