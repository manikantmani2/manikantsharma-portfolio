const nodemailer = require('nodemailer');

// Email transporter configuration
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

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const recipientEmail = process.env.EMAIL_USER || '2200030839cser@gmail.com';

    // Prepare email content
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
            <p style="background: white; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent:', info.messageId);

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });

  } catch (error) {
    console.error('Email error:', error);
    
    res.status(500).json({ 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};
