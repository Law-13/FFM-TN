import fs from 'fs';
import { sendAdminRegistrationEmail, sendOrganizerConfirmationEmail } from '../services/emailService.js';

export const registerEvent = async (req, res) => {
  const uploadedFiles = [];
  
  try {
    const data = req.body;
    
    // Log files received for debug
    console.log('Received files:', req.files);
    console.log('Received data:', data);

    // Track files to delete later
    if (req.files) {
      if (req.files.eventPoster) uploadedFiles.push(req.files.eventPoster[0]);
      if (req.files.eventBanner) uploadedFiles.push(req.files.eventBanner[0]);
      if (req.files.rulesPdf) uploadedFiles.push(req.files.rulesPdf[0]);
      if (req.files.prevTournamentPoster) uploadedFiles.push(req.files.prevTournamentPoster[0]);
    }

    // Input Validation
    const requiredFields = [
      'fullName',
      'contactNumber',
      'orgChannelName',
      'emailAddress',
      'whatsAppNumber',
      'youtubeLink',
      'eventName',
      'eventType',
      'tournamentDate',
      'entryFee',
      'prizePool',
      'expectedParticipants'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required text fields: ${missingFields.join(', ')}` 
      });
    }

    // Validate Contact number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // general E.164 phone number validation
    if (!phoneRegex.test(data.contactNumber.replace(/[\s-]/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact number format. Must start with country code (e.g., +91).'
      });
    }

    // File validation: Ensure poster, banner, and rules PDF are uploaded
    if (!req.files || !req.files.eventPoster || !req.files.eventBanner || !req.files.rulesPdf) {
      return res.status(400).json({
        success: false,
        message: 'Missing required files: Event Poster, Event Banner, or Rules PDF.'
      });
    }

    // If previous tournament details are provided, previous tournament poster is also required
    if (data.prevTournamentName && !req.files.prevTournamentPoster) {
      return res.status(400).json({
        success: false,
        message: 'Previous tournament poster is required when previous tournament details are filled.'
      });
    }

    // Prepare files array for Nodemailer
    const allFiles = [...uploadedFiles];

    // Trigger emails
    await sendAdminRegistrationEmail(data, allFiles);
    
    // Send confirmation email to organizer
    try {
      await sendOrganizerConfirmationEmail(data);
    } catch (orgMailErr) {
      console.error('Failed to send confirmation email to organizer:', orgMailErr);
      // Don't fail the whole request if only confirmation email fails
    }

    return res.status(200).json({
      success: true,
      message: 'Event registered successfully! Email notifications dispatched.'
    });

  } catch (error) {
    console.error('Error during event registration:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing registration. Please try again.'
    });
  } finally {
    // Cleanup temporary files
    for (const file of uploadedFiles) {
      try {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
          console.log(`Cleaned up temp file: ${file.path}`);
        }
      } catch (err) {
        console.error(`Error deleting file ${file.path}:`, err);
      }
    }
  }
};
