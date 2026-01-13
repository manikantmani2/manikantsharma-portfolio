# Gmail App Password Setup Guide

## CRITICAL: You MUST create a Gmail App Password for email to work!

### Step-by-Step Instructions:

1. **Visit Gmail Security Settings:**
   - Go to: https://myaccount.google.com/security
   - Or search "Google Account Security" in Google

2. **Enable 2-Step Verification (if not already enabled):**
   - Click "2-Step Verification"
   - Follow the prompts to enable it
   - This is REQUIRED for app passwords

3. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Or search "Google App Passwords"
   - Select app: "Mail"
   - Select device: "Windows Computer" or "Other"
   - Click "Generate"

4. **Copy the 16-character password:**
   - Example: "abcd efgh ijkl mnop"
   - Remove spaces: "abcdefghijklmnop"

5. **Update .env file:**
   - Open the .env file in this folder
   - Replace REPLACE_WITH_YOUR_16_CHAR_APP_PASSWORD with your actual password
   - Save the file

   Example:
   ```
   EMAIL_USER=2200030839cser@gmail.com
   EMAIL_PASS=abcdefghijklmnop
   PORT=5173
   ```

6. **Restart the server:**
   - Stop the current terminal (Ctrl+C)
   - Run: npm run dev

### Troubleshooting:

- **Error "Invalid login"**: App password not set or incorrect
- **Error "Less secure app"**: Use app password, not regular Gmail password
- **Can't find App Passwords**: Enable 2-Step Verification first

### Security Note:
- NEVER share your app password
- NEVER commit the .env file to GitHub
- The .env file is in .gitignore for your protection
