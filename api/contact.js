// Use CommonJS for Vercel Node runtime
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('📧 Contact form submission received');
  console.log('Environment check:', {
    hasEmailUser: !!process.env.EMAIL_USER,
    hasEmailPass: !!process.env.EMAIL_PASS,
    hasGmailUser: !!process.env.GMAIL_USER,
    hasGmailPass: !!process.env.GMAIL_APP_PASSWORD
  });

  // Support both EMAIL_USER/EMAIL_PASS and GMAIL_USER/GMAIL_APP_PASSWORD
  const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

  // Handle both parsed and raw JSON bodies
  let payload = req.body || {};
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload || '{}');
    } catch (err) {
      console.error('JSON parse error:', err);
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
  }
  const { name, email, phone, message } = payload;

  console.log('Form data received:', { name, email, phone: phone ? 'present' : 'not provided', messageLength: message ? message.length : 0 });

  // Validate required fields
  if (!name || !email || !message) {
    console.error('Missing required fields:', { name: !!name, email: !!email, message: !!message });
    return res.status(400).json({ error: 'Missing required fields: name, email, and message are required' });
  }

  if (!emailUser || !emailPass) {
    console.error('❌ Email credentials not configured');
    return res.status(500).json({ 
      error: 'Email service not configured',
      message: 'EMAIL_USER/GMAIL_USER and EMAIL_PASS/GMAIL_APP_PASSWORD environment variables are required'
    });
  }

  try {
    console.log('🔧 Creating SMTP transporter...');
    
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: emailUser,
        pass: emailPass
      },
      connectionTimeout: 10000,
      socketTimeout: 10000
    });

    console.log('✅ Transporter created, verifying connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    // Email to send to your inbox
    const mailOptions = {
      from: emailUser,
      to: emailUser,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #0f9b8e;">New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="font-size: 12px; color: #999; margin-top: 20px;">This message was sent from your portfolio contact form.</p>
          </body>
        </html>
      `
    };

    console.log('📤 Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully! I\'ll get back to you soon.',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Email error:', {
      message: error.message,
      code: error.code,
      response: error.response,
      stack: error.stack
    });
    
    return res.status(500).json({ 
      error: 'Failed to send email',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
