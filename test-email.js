// Test script to verify SMTP configuration
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  console.log('🧪 Testing SMTP Configuration...\n');

  const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
  const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

  console.log('📋 Configuration Check:');
  console.log('  Email User:', emailUser ? `✅ ${emailUser.substring(0, 10)}...` : '❌ Not set');
  console.log('  Email Pass:', emailPass ? `✅ Set (${emailPass.length} chars)` : '❌ Not set');

  if (!emailUser || !emailPass) {
    console.error('\n❌ Email credentials are missing!');
    process.exit(1);
  }

  try {
    console.log('\n🔧 Creating transporter...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass
      },
      connectionTimeout: 10000,
      socketTimeout: 10000
    });

    console.log('🔗 Verifying SMTP connection...');
    const verified = await transporter.verify();
    
    if (verified) {
      console.log('✅ SMTP connection verified successfully!\n');

      // Send a test email
      console.log('📧 Sending test email...');
      const info = await transporter.sendMail({
        from: emailUser,
        to: emailUser,
        subject: '✅ SMTP Configuration Test - Portfolio Contact Form',
        html: `
          <html>
            <body style="font-family: Arial, sans-serif;">
              <h2 style="color: #0f9b8e;">✅ SMTP Configuration Working!</h2>
              <p>Your portfolio contact form SMTP is configured correctly.</p>
              <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              <p>This is a test email sent from your Node.js application.</p>
            </body>
          </html>
        `
      });

      console.log('✅ Test email sent successfully!');
      console.log('   Message ID:', info.messageId);
      console.log('\n✨ All systems operational! Your contact form should work now.');
    } else {
      console.log('❌ SMTP connection verification failed');
    }
  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error('   Message:', error.message);
    console.error('   Code:', error.code);
    if (error.response) {
      console.error('   Response:', error.response);
    }
    process.exit(1);
  }
}

testEmail();
