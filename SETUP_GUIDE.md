# 🚀 Portfolio Setup Guide

## Project Overview
Complete portfolio with animations, case studies, contact form, Speed Insights, and Web Analytics.

## Local Development

### Prerequisites
- Node.js installed
- Git configured

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/manikantmani2/manikantsharma-portfolio.git
   cd manikantsharma-portfolio
   ```

2. Install dependencies (optional):
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```

4. Open in browser:
   ```
   http://localhost:3000
   ```

## Local Server Details
- **Server**: `local-server.js` (pure Node.js HTTP server)
- **Port**: 3000
- **Features**: 
  - Proper SPA routing (unknown routes → index.html)
  - MIME type handling for all assets
  - CORS support

## Production Deployment (Vercel)

### Prerequisites
- Vercel account connected to GitHub
- Project linked to GitHub repository

### Environment Variables (Required in Vercel Settings)
Set these in Vercel → Project Settings → Environment Variables → Production:

```
EMAIL_USER = your-gmail@gmail.com
EMAIL_PASS = your-gmail-app-password
```

### How to Get Gmail App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Go to App passwords
4. Select "Mail" and "Windows Computer"
5. Copy the generated password
6. Paste in Vercel's EMAIL_PASS variable

### Automatic Deployment
- Every push to `main` branch automatically deploys to Vercel
- Build status visible in Vercel dashboard
- No additional configuration needed

## Project Structure
```
.
├── index.html              # Main HTML file
├── local-server.js         # Local development server
├── vercel.json            # Vercel configuration
├── package.json           # Project metadata
├── scripts/
│   └── main.js           # Contact form & interactions
├── styles/
│   └── main.css          # All styling
├── public/               # Images & assets
└── api/
    └── contact.js        # Serverless API handler
```

## Contact Form
- **Endpoint**: `/api/contact` (Vercel) or `http://localhost:3000/api/contact` (local)
- **Method**: POST
- **Required Fields**: name, email, message
- **Optional**: phone (with country code support)
- **Email Sent To**: Your configured EMAIL_USER

## Features
✅ Responsive design with animations
✅ Dark/Light theme toggle
✅ Contact form with email integration
✅ Vercel Web Analytics
✅ Vercel Speed Insights
✅ SPA routing (handles all routes correctly)
✅ CORS enabled
✅ Production-ready code

## Troubleshooting

### Contact Form Not Sending
1. Check Vercel environment variables are set (EMAIL_USER, EMAIL_PASS)
2. Verify Gmail app password is correct
3. Check Vercel logs for errors
4. Ensure 2FA is enabled on Gmail account

### Page Not Loading
1. Check Vercel build logs
2. Ensure all files committed to Git
3. Verify vercel.json configuration

### Local Development Issues
1. Kill any process on port 3000
2. Clear browser cache
3. Restart local server: `npm run dev`

## Links
- 🌐 [Live Portfolio](https://manikantsharma-portfolio.vercel.app)
- 🔗 [GitHub Repository](https://github.com/manikantmani2/manikantsharma-portfolio)
- 📊 [Vercel Dashboard](https://vercel.com/dashboard)

## Support
For issues or questions, check the GitHub repository or contact via the portfolio contact form.
