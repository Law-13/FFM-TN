import express from 'express';
import { createTransporter, generateSupportEmail } from '../config/nodemailer.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
  const { name, email, issueType, description } = req.body;

  if (!name || !email || !issueType || !description) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.'
    });
  }

  try {
    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || 'yourmail@gmail.com';

    const mailOptions = {
      from: `"FFM TN Portal" <${process.env.SMTP_EMAIL}>`,
      to: adminEmail,
      subject: `🚨 Support Ticket: ${issueType} - ${name}`,
      html: generateSupportEmail({ name, email, issueType, description })
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Support ticket submitted successfully! Our moderators will contact you shortly.'
    });
  } catch (error) {
    console.error("❌ Support ticket transmission failed:", error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit support ticket. Please try again later.'
    });
  }
});

export default router;
