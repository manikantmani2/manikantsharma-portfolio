const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// SMTP Configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || '2200030839cser@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password-here'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const recipientEmail = process.env.EMAIL_USER || '2200030839cser@gmail.com';
  
  const mailOptions = {
    from: recipientEmail,
    to: recipientEmail,
    replyTo: email,
    subject: `Portfolio Contact - ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0f9b8e;">New Contact Form Submission</h2>
        <div style="background: #f6f7fb; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
        </div>
      </div>
    `
  };

  try {
    console.log('Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Detailed email error:', error);
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    res.status(500).json({ 
      error: 'Failed to send email. Check server console for details.',
      details: error.message 
    });
  }
});

// Verify SMTP connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.log('❌ SMTP Configuration Error:', error.message);
    console.log('Please check your .env file and Gmail app password');
  } else {
    console.log('✅ SMTP Server is ready to send emails');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email configured for: ${process.env.EMAIL_USER || '2200030839cser@gmail.com'}`);
});
