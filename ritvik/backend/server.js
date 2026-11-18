const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configure your Gmail credentials here
// Use an App Password — go to: https://myaccount.google.com/apppasswords
const GMAIL_USER = 'mritvikreddy2007@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || 'your_app_password_here';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

app.post('/send', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${GMAIL_USER}>`,
    to: GMAIL_USER,
    replyTo: email,
    subject: `[Portfolio] ${subject} — from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #ddd;border-radius:8px;">
        <h2 style="color:#7c3aed">New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent!' });
  } catch (err) {
    console.error('Mail error:', err.message);
    res.status(500).json({ error: 'Failed to send email. Check server config.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Contact server running on http://localhost:${PORT}`));
