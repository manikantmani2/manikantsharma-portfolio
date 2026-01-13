# GitHub Push Instructions

Your repository has been initialized locally with all files committed. Follow these steps to push to GitHub:

## Step 1: Create Repository on GitHub

1. Go to [GitHub.com](https://github.com)
2. Click the **+** icon in top-right corner → **New repository**
3. **Repository name:** `manikantsharma-portfolio`
4. **Description:** Professional portfolio website with animations, projects showcase, and contact integration
5. **Visibility:** Public (for recruiter access)
6. **Initialize repository:** ❌ Do NOT check (we already have files)
7. Click **Create repository**

## Step 2: Connect Remote & Push

After creating the repository, GitHub will show you commands. Run:

```bash
cd e:\ManikantSharma

# Add remote origin
git remote add origin https://github.com/manikantmani2/manikantsharma-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Or if using SSH (if you have SSH key configured):
```bash
git remote add origin git@github.com:manikantmani2/manikantsharma-portfolio.git
git push -u origin main
```

## Step 3: Verify on GitHub

1. Go to your GitHub profile
2. Click **manikantsharma-portfolio** repository
3. Verify all files are there:
   - ✅ README.md (with full documentation)
   - ✅ index.html (portfolio page)
   - ✅ styles/main.css (styling)
   - ✅ scripts/main.js (functionality)
   - ✅ server.js (backend)
   - ✅ package.json (dependencies)
   - ✅ .gitignore (ignore rules)
   - ✅ assets/, docs/, public/ directories

## Step 4: Optional - Enable GitHub Pages (for live hosting)

If you want the portfolio live on GitHub Pages:

1. Go to repository **Settings** → **Pages**
2. Select **Source:** `main` branch
3. Click **Save**
4. Your portfolio will be live at: `https://manikantmani2.github.io/manikantsharma-portfolio/`

## Step 5: Optional - Add Topics/Tags

On the repository page, click **About** (settings icon) and add topics:
- portfolio
- full-stack
- ui-ux
- web-development
- animations
- responsive-design

## Repository Stats

Your repository includes:
- **Files:** 12 core files
- **Lines of Code:** 5,256+
- **Technologies:** HTML5, CSS3, JavaScript, Node.js, Express
- **Features:** Animations, form validation, responsive design, accessibility

## Authentication Notes

If prompted for authentication:
- **HTTPS:** Use your GitHub Personal Access Token (PAT) as password
  - [Create PAT](https://github.com/settings/tokens)
  - Permissions needed: `repo`, `write:packages`
  
- **SSH:** Use SSH key (if configured)
  - [Setup SSH Keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## Future Updates

To update the repository after making changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Support

If you encounter any issues:
1. Check git is installed: `git --version`
2. Verify remote: `git remote -v`
3. Check branch: `git branch`
4. View logs: `git log`

---

**Your portfolio is ready to impress recruiters!** 🚀
