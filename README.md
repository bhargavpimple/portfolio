# Bhargav Pimple Portfolio Website

A static, recruiter-friendly portfolio website.

## Files

- `index.html` - Home page
- `documents.html` - Resume, certificates, and experience letters
- `contact.html` - Email, phone, and LinkedIn
- `style.css` - Styling
- `assets/` - Upload your PDFs here
- `admin/` - Optional Netlify CMS admin setup

## Deploy with GitHub Pages

1. Create a new GitHub repository, for example `portfolio`.
2. Upload all files from this folder.
3. Go to repository **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select branch `main` and folder `/root`.
6. Save.

Your website will be available at:

`https://YOUR_GITHUB_USERNAME.github.io/portfolio/`

## Admin access

To give admin/collaborator access to `bhargavpimple2@gmail.com`, invite the GitHub account connected to that email from:

Repository → Settings → Collaborators and teams → Add people

For Netlify CMS, replace this line in `admin/config.yml`:

`repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME`

with your real GitHub repo, for example:

`repo: bhargavpimple/portfolio`
