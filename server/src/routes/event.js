import express from 'express';
import fs from 'fs';
import { upload, validateUploadSizes } from '../middlewares/upload.js';
import { createTransporter, generateEventRegistrationEmail, generateOrganizerConfirmationEmail } from '../config/nodemailer.js';

const router = express.Router();

const uploadFields = upload.fields([
  { name: 'poster', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
  { name: 'rulesPdf', maxCount: 1 },
  { name: 'prevPoster', maxCount: 1 }
]);

router.post('/register', uploadFields, validateUploadSizes, async (req, res) => {
  const files = req.files || {};
  const data = req.body;

  // Real-time backend validation of required fields
  const requiredFields = [
    'fullName', 'contactNumber', 'organizationName', 'email',
    'whatsappNumber', 'youtubeLink', 'eventName', 'eventType',
    'tournamentDate', 'entryFee', 'prizePool', 'expectedParticipants',
    'prevTournamentName', 'prevPrizePool'
  ];

  const missing = [];
  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      missing.push(field);
    }
  });

  // Verify file uploads exist
  if (!files.poster) missing.push('Event Poster');
  if (!files.banner) missing.push('Event Banner');
  if (!files.rulesPdf) missing.push('Rules PDF');
  if (!files.prevPoster) missing.push('Previous Tournament Poster');

  if (missing.length > 0) {
    // Clean up any uploaded files first
    Object.keys(files).forEach(fieldname => {
      files[fieldname].forEach(file => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
    });
    return res.status(400).json({
      success: false,
      message: `Missing required field(s) or uploaded files: ${missing.join(', ')}`
    });
  }

  // Set up attachment details for email
  const attachments = [];
  const filesToDelete = [];

  try {
    Object.keys(files).forEach(fieldname => {
      const file = files[fieldname][0];
      attachments.push({
        filename: file.originalname,
        path: file.path,
        cid: fieldname // optional inline embedding or standard attachment
      });
      filesToDelete.push(file.path);
    });

    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || 'yourmail@gmail.com';

    // 1. Send detailed email to Admin
    const adminMailOptions = {
      from: `"FFM TN Portal" <${process.env.SMTP_EMAIL}>`,
      to: adminEmail,
      subject: `🏆 New Event Registration: ${data.eventName}`,
      html: generateEventRegistrationEmail(data),
      attachments
    };

    await transporter.sendMail(adminMailOptions);

    // 2. Send confirmation email to Organizer
    const userMailOptions = {
      from: `"FFM Community TN" <${process.env.SMTP_EMAIL}>`,
      to: data.email,
      subject: `📩 Registration Received: ${data.eventName}`,
      html: generateOrganizerConfirmationEmail(data)
    };

    // Try sending organizer email, don't crash if it fails
    try {
      await transporter.sendMail(userMailOptions);
    } catch (userMailErr) {
      console.error("⚠️ Failed to send organizer confirmation email:", userMailErr.message);
    }

    // Prepare future MongoDB hooks:
    /*
      const newEvent = new Event({
        ...data,
        posterPath: files.poster[0].path,
        bannerPath: files.banner[0].path,
        rulesPdfPath: files.rulesPdf[0].path,
        prevPosterPath: files.prevPoster[0].path,
        status: 'pending'
      });
      await newEvent.save();
    */

    return res.status(200).json({
      success: true,
      message: 'Event registered successfully! Under review.'
    });

  } catch (error) {
    console.error("❌ Registration transmission failed:", error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process event registration. Please try again later.'
    });
  } finally {
    // Clean up uploaded files after emails are dispatched
    filesToDelete.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkErr) {
          console.error(`⚠️ Failed to clean up file: ${filePath}`, unlinkErr.message);
        }
      }
    });
  }
});

export default router;
