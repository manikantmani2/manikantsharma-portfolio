# 🔧 Gmail SMTP Setup Guide for Your Portfolio

## ❌ Current Issue
Your Gmail app password is **NOT valid**. The SMTP server is rejecting the credentials with error:
```
535-5.7.8 Username and Password not accepted
```

## ✅ How to Fix

### Step 1: Enable 2-Factor Authentication (if not already enabled)
1. Go to: https://myaccount.google.com/security
2. Look for "2-Step Verification" 
3. Follow the prompts to enable it

### Step 2: Create an App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your device)
3. Google will generate a 16-character password
4. **Copy this password** (looks like: `xxxx xxxx xxxx xxxx`)

### Step 3: Update Your Environment Variables
1. Copy the **16-character password** from Step 2
2. Remove any spaces from the password
3. Update your `.env` file:
```dotenv
EMAIL_USER=2200030839cser@gmail.com
EMAIL_PASS=<paste-16-char-password-here>
PORT=3000
```

4. Also update `.env.local` (for Vercel):
```dotenv
GMAIL_USER=2200030839cser@gmail.com
GMAIL_APP_PASSWORD=<paste-16-char-password-here>
```

### Step 4: Test Locally
Run this command to verify the connection:
```bash
node test-email.js
```

You should see:
```
✅ SMTP connection verified successfully!
✅ Test email sent successfully!
```

### Step 5: Deploy to Vercel
Once testing passes locally:
```bash
git add .
git commit -m "Update: Fix SMTP email credentials"
git push
vercel --prod
```

## ⚠️ Common Issues

### "Invalid login" error
- Password is wrong or has expired
- Get a new app password from https://myaccount.google.com/apppasswords

### 2-Step Verification not enabled
- You MUST enable 2FA on your Google account first
- App passwords only work if 2FA is enabled

### "An error occurred" on the contact form
- Check your `EMAIL_PASS` in `.env`
- Run `node test-email.js` to verify
- Check Vercel logs for detailed error messages

## 🔒 Security Notes
- Never share your app password
- This password only works for Gmail
- It's different from your regular Google password
- You can revoke it anytime from https://myaccount.google.com/apppasswords

## 📝 Reference
- Gmail App Passwords: https://support.google.com/accounts/answer/185833
- Gmail SMTP Settings: https://support.google.com/mail/answer/7126229

